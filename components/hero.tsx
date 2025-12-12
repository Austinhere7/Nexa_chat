"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

const DEMO_CONVERSATIONS = [
  {
    question: "Can you explain quantum computing in simple terms?",
    answer: "Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously, unlike classical bits. This allows quantum computers to process vast amounts of data in parallel, making them potentially revolutionary for complex problem-solving."
  },
  {
    question: "Write a Python function to check if a number is prime",
    answer: "Here's a simple prime checker:\n\ndef is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True"
  },
  {
    question: "What are the best practices for React performance?",
    answer: "Key practices include: Use React.memo() for expensive components, implement code splitting with lazy loading, optimize re-renders with useMemo and useCallback, use virtual scrolling for long lists, and avoid inline functions in JSX."
  },
  {
    question: "How do I stay motivated while learning to code?",
    answer: "Build projects you're passionate about, celebrate small wins, join coding communities, set realistic goals, take breaks to avoid burnout, and remember that every expert was once a beginner. Consistency beats intensity!"
  },
  {
    question: "Explain the difference between AI and Machine Learning",
    answer: "AI is the broader concept of machines performing tasks intelligently. Machine Learning is a subset of AI where systems learn from data without explicit programming. Think of AI as the goal, and ML as one of the paths to achieve it."
  },
  {
    question: "What's the future of web development?",
    answer: "The future includes AI-assisted coding, WebAssembly for near-native performance, edge computing, progressive web apps, voice interfaces, and frameworks that blur the line between frontend and backend development."
  },
  {
    question: "How can I improve my problem-solving skills?",
    answer: "Practice coding challenges daily, break complex problems into smaller parts, learn different algorithms and data structures, review others' solutions, explain your thought process out loud, and don't fear failure—it's part of learning!"
  },
  {
    question: "What are the benefits of serverless architecture?",
    answer: "Serverless offers auto-scaling, pay-per-use pricing, reduced operational overhead, faster deployment, and better focus on business logic rather than infrastructure management. Perfect for variable workloads and rapid prototyping."
  },
  {
    question: "Can you suggest a morning routine for productivity?",
    answer: "Start with hydration and light exercise, avoid checking emails immediately, plan your top 3 priorities, use the Pomodoro technique for focused work, take regular breaks, and protect your deep work time from interruptions."
  },
  {
    question: "What's the best way to learn a new programming language?",
    answer: "Build a project from day one, read documentation thoroughly, solve coding challenges, contribute to open source, find a mentor or community, learn by teaching others, and focus on understanding concepts rather than memorizing syntax."
  }
]

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', text: string}>>([])
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationIndex, setConversationIndex] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [activeUsers, setActiveUsers] = useState(0)
  const [messagesDaily, setMessagesDaily] = useState(0)
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    
    // Animate stats counters
    const duration = 3500 // 3.5 seconds
    const steps = 60
    const interval = duration / steps

    // Active Users: 0 to 50
    let userCount = 0
    const userInterval = setInterval(() => {
      userCount += 50 / steps
      setActiveUsers(Math.min(Math.floor(userCount), 50))
      if (userCount >= 50) clearInterval(userInterval)
    }, interval)

    // Messages: 0 to 2
    let msgCount = 0
    const msgInterval = setInterval(() => {
      msgCount += 2 / steps
      setMessagesDaily(Math.min(msgCount, 2))
      if (msgCount >= 2) clearInterval(msgInterval)
    }, interval)

    // Uptime: 0 to 99.9
    let uptimeCount = 0
    const uptimeInterval = setInterval(() => {
      uptimeCount += 99.9 / steps
      setUptime(Math.min(uptimeCount, 99.9))
      if (uptimeCount >= 99.9) clearInterval(uptimeInterval)
    }, interval)

    return () => {
      clearInterval(userInterval)
      clearInterval(msgInterval)
      clearInterval(uptimeInterval)
    }
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, currentText])

  useEffect(() => {
    // Auto-play chat demo
    const runDemo = async () => {
      // Wait 2 seconds before starting
      await new Promise(resolve => setTimeout(resolve, 2000))

      while (true) {
        // Pick a random conversation
        const randomIndex = Math.floor(Math.random() * DEMO_CONVERSATIONS.length)
        const conversation = DEMO_CONVERSATIONS[randomIndex]

        // Clear previous messages
        setMessages([])
        await new Promise(resolve => setTimeout(resolve, 500))

        // Show user question
        setMessages([{ type: 'user', text: conversation.question }])
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Type bot response
        setIsTyping(true)
        const words = conversation.answer.split(' ')
        let text = ''
        
        for (let i = 0; i < words.length; i++) {
          text += (i > 0 ? ' ' : '') + words[i]
          setCurrentText(text)
          await new Promise(resolve => setTimeout(resolve, 50))
        }

        setMessages(prev => [...prev, { type: 'bot', text: conversation.answer }])
        setCurrentText('')
        setIsTyping(false)

        // Wait before next conversation
        await new Promise(resolve => setTimeout(resolve, 4000))
      }
    }

    runDemo()
  }, [])

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-10 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-600/10 via-blue-600/6 to-purple-600/0 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left column: text, CTAs, stats */}
        <div className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="mb-6 inline-flex items-center gap-3 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/3">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm text-cyan-300">Powered by GPT-4 & Claude</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-white mb-6">
            <span>Your AI Assistant</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">Reimagined</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-xl mb-8">
            Experience the next generation of conversational AI. Intelligent, intuitive, and designed to transform how you work and create.
          </p>

          <div className="flex gap-4 flex-col sm:flex-row mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-0 px-8 py-3"
              onClick={() => router.push("/chat")}
            >
              Start Chat
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 items-center flex-wrap">
            <div>
              <p className="text-2xl font-bold text-white transition-all duration-300">
                {activeUsers}K+
              </p>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white transition-all duration-300">
                {messagesDaily.toFixed(1)}M+
              </p>
              <p className="text-sm text-gray-400">Messages Daily</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white transition-all duration-300">
                {uptime.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-400">Uptime</p>
            </div>
          </div>
        </div>

        {/* Right column: chat mockup */}
        <div className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div id="chat" className="relative w-full max-w-md mx-auto lg:mx-0 mockchat-outer">
            <div className="mockchat-mask"></div>
            <div className="mockchat-glow"></div>

            <div className="relative z-20 bg-gradient-to-b from-black/60 to-gray-900/60 border border-cyan-500/10 rounded-3xl p-6 backdrop-blur-2xl h-[500px] flex flex-col">
              <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600"></div>
                <div>
                  <p className="text-white font-semibold">NexaChat AI</p>
                  <p className="text-xs text-green-400">Always online</p>
                </div>
              </div>

              <div 
                ref={chatContainerRef}
                className="space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent pr-2"
                style={{ scrollBehavior: 'smooth' }}
              >
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex gap-3 justify-start">
                    <div className={`${msg.type === 'user' ? 'bg-gray-800/50 border-gray-700/40' : 'bg-cyan-700/10 border-cyan-600/20'} border rounded-lg px-4 py-3 max-w-xs`}>
                      <p className="text-gray-200 text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && currentText && (
                  <div className="flex gap-3 justify-start">
                    <div className="bg-cyan-700/10 border border-cyan-600/20 rounded-lg px-4 py-3 max-w-xs">
                      <p className="text-gray-200 text-sm whitespace-pre-line">{currentText}<span className="animate-pulse">|</span></p>
                    </div>
                  </div>
                )}

                {messages.length === 0 && !isTyping && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/40 border border-cyan-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
                  disabled
                />
                <button className="px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed" disabled>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
