"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
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
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">2M+</p>
              <p className="text-sm text-gray-400">Messages Daily</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-sm text-gray-400">Uptime</p>
            </div>
          </div>
        </div>

        {/* Right column: chat mockup */}
        <div className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div id="chat" className="relative w-full max-w-md mx-auto lg:mx-0 mockchat-outer">
            <div className="mockchat-mask"></div>
            <div className="mockchat-glow"></div>

            <div className="relative z-20 bg-gradient-to-b from-black/60 to-gray-900/60 border border-cyan-500/10 rounded-3xl p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600"></div>
                <div>
                  <p className="text-white font-semibold">NexaChat AI</p>
                  <p className="text-xs text-green-400">Always online</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 justify-start">
                  <div className="bg-gray-800/50 border border-gray-700/40 rounded-lg px-4 py-3 max-w-xs">
                    <p className="text-gray-200 text-sm">Can you help me write a marketing email?</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-start">
                  <div className="bg-cyan-700/10 border border-cyan-600/20 rounded-lg px-4 py-3 max-w-xs">
                    <p className="text-gray-200 text-sm">Of course! I'd be happy to help you craft a compelling marketing email. What's the main goal of your campaign?</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-start">
                  <div className="bg-gray-800/50 border border-gray-700/40 rounded-lg px-4 py-3 max-w-xs">
                    <p className="text-gray-200 text-sm">Product launch for our new AI tool</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/40 border border-cyan-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
                />
                <button className="px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
