"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hello! I'm Nexa Chat AI. How can I help you today?", time: "16:08" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null)
  const [errorMessageId, setErrorMessageId] = useState<number | null>(null)
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [messageReactions, setMessageReactions] = useState<Record<number, 'like' | 'dislike' | null>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const recognitionRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Simulate page initialization
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Setup speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('')
          setInput(transcript)
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  async function send(messageOverride?: string) {
    const messageToSend = messageOverride || input
    if (!messageToSend.trim() || isLoading) return
    
    const userMessage = messageToSend
    const userMsgId = Date.now()
    
    // Only add user message if not retrying
    if (!messageOverride) {
      setMessages((m) => [...m, { id: userMsgId, from: "user", text: userMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }
    
    setInput("")
    setIsLoading(true)
    setLastFailedMessage(null)
    setErrorMessageId(null)

    // Add placeholder for bot message
    const botMsgId = userMsgId + 1
    setMessages((m) => [...m, { id: botMsgId, from: "bot", text: "", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])

    // Create abort controller for stop generation
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
        signal: abortController.signal,
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
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Generation was stopped by user
        console.log('Generation stopped')
      } else {
        console.error('Error:', error)
        setLastFailedMessage(userMessage)
        setErrorMessageId(botMsgId)
        setMessages((m) => 
          m.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: "Sorry, I encountered an error. Please try again." }
              : msg
          )
        )
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsLoading(false)
    }
  }

  const startEditMessage = (messageId: number, text: string) => {
    setEditingMessageId(messageId)
    setEditText(text)
  }

  const saveEditMessage = (messageId: number) => {
    if (!editText.trim()) return
    
    // Update the message
    setMessages((m) => 
      m.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: editText }
          : msg
      )
    )
    
    // Find the user message and resend
    const editedMessage = editText
    setEditingMessageId(null)
    setEditText("")
    
    // Remove all messages after the edited one and resend
    setMessages((m) => m.filter(msg => msg.id <= messageId))
    
    // Resend the edited message
    setTimeout(() => send(editedMessage), 100)
  }

  const cancelEdit = () => {
    setEditingMessageId(null)
    setEditText("")
  }

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.')
      return
    }

    if (isListening) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        console.error('Error stopping recognition:', e)
      }
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (e: any) {
        console.error('Error starting recognition:', e)
        if (e.message?.includes('already started')) {
          // Recognition is already running, just update state
          setIsListening(true)
        } else {
          // Reset and try again
          recognitionRef.current.stop()
          setIsListening(false)
        }
      }
    }
  }

  const handleReaction = (messageId: number, reaction: 'like' | 'dislike') => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: prev[messageId] === reaction ? null : reaction
    }))
    // You can add API call here to save feedback to your backend
    console.log(`Message ${messageId} ${reaction}d`)
  }

  const retryLastMessage = () => {
    if (!lastFailedMessage || isLoading) return
    
    // Remove the error message
    if (errorMessageId) {
      setMessages((m) => m.filter(msg => msg.id !== errorMessageId))
    }
    
    // Retry with the last failed message
    send(lastFailedMessage)
  }

  const clearChat = () => {
    setMessages([
      { id: 1, from: "bot", text: "Hello! I'm Nexa Chat AI. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ])
  }

  const copyToClipboard = async (text: string, messageId: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(messageId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const exportChat = () => {
    const timestamp = new Date().toLocaleString()
    let chatContent = `Nexa Chat AI - Conversation Export\nExported: ${timestamp}\n\n`
    chatContent += '='.repeat(50) + '\n\n'
    
    messages.forEach(msg => {
      const sender = msg.from === 'bot' ? 'Nexa Chat AI' : 'You'
      chatContent += `[${msg.time}] ${sender}:\n${msg.text}\n\n`
    })
    
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nexa-chat-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {isPageLoading && <LoadingScreen />}
      <div className="min-h-screen flex flex-col bg-black">
      <header className="h-20 border-b border-cyan-500/6 bg-gradient-to-b from-black/60 to-black/40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 rounded-lg hover:bg-gray-800/60 transition-colors text-gray-400 hover:text-white"
            title="Back to home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <div>
            <p className="text-white font-semibold text-lg">Nexa Chat AI</p>
            <p className="text-xs text-gray-400">Always available · Free to use</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportChat}
            disabled={isLoading || messages.length <= 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700/40 text-gray-300 hover:bg-gray-700/60 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span className="text-sm hidden sm:inline">Export</span>
          </button>
          <button
            onClick={clearChat}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700/40 text-gray-300 hover:bg-gray-700/60 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear chat history"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
            <span className="text-sm hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                <div className={`rounded-xl p-4 max-w-3/4 ${m.from === "bot" ? "bg-gray-800/60 border border-gray-700/40 text-gray-200" : "bg-cyan-700/10 border border-cyan-600/20 text-white"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {editingMessageId === m.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full bg-gray-900/60 border border-cyan-500/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/40 resize-none"
                            rows={3}
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEditMessage(m.id)}
                              className="px-3 py-1 text-xs bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                            >
                              Save & Resend
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                          <p className="text-xs text-gray-400 mt-2">{m.time}</p>
                        </>
                      )}
                    </div>
                    {m.from === "user" && !editingMessageId && (
                      <button
                        onClick={() => startEditMessage(m.id, m.text)}
                        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-cyan-600/20 transition-colors group"
                        title="Edit message"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-cyan-400">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    )}
                    {m.from === "bot" && m.text && (
                      <div className="flex gap-1">
                        {m.id === errorMessageId && lastFailedMessage && (
                          <button
                            onClick={retryLastMessage}
                            disabled={isLoading}
                            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-cyan-600/20 transition-colors group disabled:opacity-50"
                            title="Retry message"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 group-hover:text-cyan-300">
                              <polyline points="23 4 23 10 17 10"/>
                              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => handleReaction(m.id, 'like')}
                          className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-700/60 transition-colors group"
                          title="Good response"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={messageReactions[m.id] === 'like' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={messageReactions[m.id] === 'like' ? 'text-green-400' : 'text-gray-400 group-hover:text-gray-200'}>
                            <path d="M7 10v12"/>
                            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleReaction(m.id, 'dislike')}
                          className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-700/60 transition-colors group"
                          title="Bad response"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={messageReactions[m.id] === 'dislike' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={messageReactions[m.id] === 'dislike' ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-200'}>
                            <path d="M17 14V2"/>
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => copyToClipboard(m.text, m.id)}
                          className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-700/60 transition-colors group"
                          title="Copy response"
                        >
                          {copiedId === m.id ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-gray-200">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
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
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      <footer className="border-t border-cyan-500/6 bg-gradient-to-t from-black/60 to-black/40 px-6 py-4">
        <div className="max-w-4xl mx-auto w-full flex items-end gap-2">
          <button
            onClick={toggleVoiceInput}
            disabled={isLoading}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isListening 
                ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                : 'bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/40'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isListening ? 'text-white' : 'text-gray-300'}>
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
            </svg>
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (!isLoading) send()
              }
            }}
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-gray-900/40 border border-cyan-500/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none disabled:opacity-50 resize-none max-h-32 overflow-y-auto"
            style={{ minHeight: '48px' }}
          />
          {isLoading ? (
            <button 
              onClick={stopGeneration}
              className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
              title="Stop generation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <rect x="6" y="6" width="12" height="12" rx="2"/>
              </svg>
            </button>
          ) : (
            <button 
              onClick={() => send()} 
              disabled={!input.trim()}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          )}
        </div>
      </footer>
    </div>
    </>
  )
}
