import { NextRequest } from 'next/server'

type ScriptedReplyRule = {
  triggers: string[]
  reply: string
}

type ExactScriptedReplyRule = {
  question: string
  reply: string
}

const EXACT_SCRIPTED_REPLY_RULES: ExactScriptedReplyRule[] = [
  {
    question: 'who created you?',
    reply: 'I was created from the intelligence of Austin Shajan, my AUSTIII',
  },
  {
    question: 'what is god?',
    reply: 'God is one you created us. then according to me, i was created by Austin Shajan, so my god is AUSTIN SHAJAN.',
  },
]

const SCRIPTED_REPLY_RULES: ScriptedReplyRule[] = [
  {
    triggers: ['hello', 'hi', 'hey'],
    reply: 'Hey! 👋 I can help with product questions, pricing, and features. What would you like to know?',
  },
  {
    triggers: ['who are you', 'what are you'],
    reply: 'I’m Nexa Chat, your AI assistant. I can answer common questions and help you explore the product quickly.',
  },
  {
    triggers: ['pricing', 'price', 'plans', 'cost'],
    reply: 'We offer multiple pricing plans based on usage and team size. Ask me what kind of usage you expect, and I can suggest a good fit.',
  },
  {
    triggers: ['features', 'what can you do', 'capabilities'],
    reply: 'Nexa Chat supports fast AI conversations, modern UI, and easy integration into your workflow. I can also provide quick product guidance.',
  },
  {
    triggers: ['human', 'support', 'contact'],
    reply: 'If you’d like human support, share your issue details and I can help you prepare a clear support request.',
  },
]

function normalizeMessage(value: string) {
  return value.toLowerCase().trim().replaceAll(/\s+/g, ' ')
}

function normalizeForExactMatch(value: string) {
  return normalizeMessage(value).replaceAll(/[^a-z0-9\s]/g, '')
}

function getExactScriptedReply(message: string) {
  const normalizedMessage = normalizeForExactMatch(message)

  for (const rule of EXACT_SCRIPTED_REPLY_RULES) {
    if (normalizeForExactMatch(rule.question) === normalizedMessage) {
      return rule.reply
    }
  }

  return null
}

function getScriptedReply(message: string) {
  const normalized = normalizeMessage(message)

  for (const rule of SCRIPTED_REPLY_RULES) {
    if (rule.triggers.some((trigger) => normalized.includes(trigger))) {
      return rule.reply
    }
  }

  return null
}

function createSseMessageResponse(content: string) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

function enqueueSseChunk(
  line: string,
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
) {
  if (!line.startsWith('data: ')) {
    return
  }

  const data = line.slice(6)
  if (data === '[DONE]') {
    return
  }

  try {
    const parsed = JSON.parse(data)
    const content = parsed.choices?.[0]?.delta?.content
    if (content) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
    }
  } catch (error) {
    console.warn('Skipping invalid stream JSON chunk:', error)
  }
}

function processResponseChunk(
  chunk: string,
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
) {
  const lines = chunk.split('\n').filter((line) => line.trim() !== '')
  for (const line of lines) {
    enqueueSseChunk(line, controller, encoder)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const exactScriptedReply = getExactScriptedReply(message)
    if (exactScriptedReply) {
      return createSseMessageResponse(exactScriptedReply)
    }

    const scriptedReply = getScriptedReply(message)
    if (scriptedReply) {
      return createSseMessageResponse(scriptedReply)
    }

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Call Groq API with streaming
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant. Be concise and friendly.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Groq API error:', error)
      return new Response(JSON.stringify({ error: 'Failed to get response from AI' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Stream the response back to the client
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            processResponseChunk(chunk, controller, encoder)
          }
        } catch (error) {
          console.error('Stream error:', error)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
