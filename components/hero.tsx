"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm flex items-center gap-2 w-fit">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm text-cyan-300">Introducing NexaChat Pro</span>
          </div>
        </div>

        {/* Main heading */}
        <div
          className={`text-center mb-8 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transform Your Conversations
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto text-balance">
            Experience the next generation of AI-powered chatting. Faster responses, smarter insights, and seamless
            integration with your workflow.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-0 hover:shadow-lg hover:shadow-cyan-500/50 px-8"
          >
            Start Chatting
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 bg-transparent"
          >
            Watch Demo
          </Button>
        </div>

        {/* Chat Interface Mockup */}
        <div
          className={`transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="relative max-w-3xl mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-blue-600/0 rounded-2xl blur-2xl"></div>

            {/* Card */}
            <div className="relative bg-gray-900/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full"></div>
                <div>
                  <p className="text-white font-semibold">NexaChat Assistant</p>
                  <p className="text-xs text-green-400">● Online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 relative z-10">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600/40 border border-blue-500/50 rounded-lg px-4 py-3 max-w-xs backdrop-blur-sm">
                    <p className="text-white text-sm">How can I improve my productivity?</p>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-4 py-3 max-w-xs backdrop-blur-sm">
                    <p className="text-gray-200 text-sm">
                      I recommend breaking tasks into smaller chunks, using the Pomodoro technique...
                    </p>
                  </div>
                </div>

                {/* Another user message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600/40 border border-blue-500/50 rounded-lg px-4 py-3 max-w-xs backdrop-blur-sm">
                    <p className="text-white text-sm">That sounds great!</p>
                  </div>
                </div>
              </div>

              {/* Input field */}
              <div className="mt-6 flex gap-2 relative z-10">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition"
                />
                <button className="px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
