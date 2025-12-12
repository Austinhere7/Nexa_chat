"use client"

import { useState } from "react"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hello! I'm Nexa Chat AI. How can I help you today?", time: "16:08" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function send() {
    if (!input.trim() || isLoading) return
    
    const userMessage = input
    const userMsgId = Date.now()
    setMessages((m) => [...m, { id: userMsgId, from: "user", text: userMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setInput("")
    setIsLoading(true)

    // Add placeholder for bot message
    const botMsgId = userMsgId + 1
    setMessages((m) => [...m, { id: botMsgId, from: "bot", text: "", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API Error:', response.status, errorData)
        throw new Error(errorData.error || 'Failed to get response')
      }

      // Handle streaming response with delay for slower display
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let accumulatedText = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter(line => line.trim() !== '')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  accumulatedText += parsed.content
                  // Update the bot message with accumulated text
                  setMessages((m) => 
                    m.map(msg => 
                      msg.id === botMsgId 
                        ? { ...msg, text: accumulatedText }
                        : msg
                    )
                  )
                  // Add delay to slow down the display (30ms per chunk)
                  await new Promise(resolve => setTimeout(resolve, 30))
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      if (!accumulatedText) {
        throw new Error('No response received')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((m) => 
        m.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, text: "Sorry, I encountered an error. Please try again." }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="h-20 border-b border-cyan-500/6 bg-gradient-to-b from-black/60 to-black/40 px-6 flex items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <div>
            <p className="text-white font-semibold text-lg">Nexa Chat AI</p>
            <p className="text-xs text-gray-400">Always available · Free to use</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                <div className={`rounded-xl p-4 max-w-3/4 ${m.from === "bot" ? "bg-gray-800/60 border border-gray-700/40 text-gray-200" : "bg-cyan-700/10 border border-cyan-600/20 text-white"}`}>
                  <p className="text-sm">{m.text}</p>
                  <p className="text-xs text-gray-400 mt-2">{m.time}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl p-4 bg-gray-800/60 border border-gray-700/40">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="h-28 border-t border-cyan-500/6 bg-gradient-to-t from-black/60 to-black/40 px-6 flex items-center">
        <div className="max-w-4xl mx-auto w-full flex items-center gap-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && send()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-gray-900/40 border border-cyan-500/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none disabled:opacity-50"
          />
          <button 
            onClick={send} 
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  )
}
