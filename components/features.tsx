"use client"

import { useState } from "react"
import { Zap, Brain, Lock, Gauge, Smartphone, Share2, BarChart3, Layers } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Responses in milliseconds with our optimized AI infrastructure",
  },
  {
    icon: Brain,
    title: "Smart Learning",
    description: "Continuously improves through conversation and user feedback",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level encryption and SOC 2 compliance",
  },
  {
    icon: Gauge,
    title: "Advanced Analytics",
    description: "Detailed insights into conversation patterns and performance",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Seamless experience on web, mobile, and desktop",
  },
  {
    icon: Share2,
    title: "Easy Integration",
    description: "REST API and webhooks for seamless third-party integration",
  },
  {
    icon: BarChart3,
    title: "Real-Time Stats",
    description: "Monitor performance metrics with live dashboards",
  },
  {
    icon: Layers,
    title: "Customizable AI",
    description: "Fine-tune behavior and personality to match your brand",
  },
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Powerful Features</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to create exceptional AI conversations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Glow effect on hover */}
                {hoveredIndex === idx && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-blue-600/0 rounded-xl blur-xl -z-10 transition-all duration-300"></div>
                )}

                <div className="h-full bg-gray-900/40 border border-cyan-500/10 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                  {/* Icon */}
                  <div className="inline-block p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <Icon size={24} className="text-cyan-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
