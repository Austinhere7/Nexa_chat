"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-500/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Ready to Transform Your Conversations?</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of companies using NexaChat to deliver exceptional customer experiences with AI-powered
          conversations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-0 hover:shadow-lg hover:shadow-cyan-500/50 px-8"
          >
            Start Free Trial
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 bg-transparent"
          >
            Schedule Demo
          </Button>
        </div>

        <p className="text-gray-400 text-sm mt-8">14-day free trial. No credit card required. Cancel anytime.</p>
      </div>
    </section>
  )
}
