"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for individuals",
    features: ["Up to 10,000 conversations", "Basic AI models", "Email support", "API access", "Dashboard analytics"],
  },
  {
    name: "Pro",
    price: "$99",
    description: "For growing teams",
    features: [
      "Unlimited conversations",
      "Advanced AI models",
      "Priority support",
      "Advanced API",
      "Custom integrations",
      "Team collaboration",
      "SSO & advanced security",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Dedicated infrastructure",
      "Custom AI models",
      "24/7 phone support",
      "SLA guarantee",
      "Advanced compliance",
      "On-premise deployment",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Choose the perfect plan for your needs</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`relative group`}>
              {/* Highlighted border glow */}
              {tier.highlighted && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-blue-600/0 rounded-2xl blur-xl -z-10"></div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                </>
              )}

              <div
                className={`h-full backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-gradient-to-b from-cyan-500/20 via-gray-900/60 to-gray-900/40 border border-cyan-500/50"
                    : "bg-gray-900/40 border border-cyan-500/10 hover:border-cyan-500/30"
                }`}
              >
                {/* Header */}
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className={`text-5xl font-bold ${tier.highlighted ? "text-cyan-400" : "text-white"}`}>
                    {tier.price}
                  </span>
                  {tier.price !== "Custom" && <span className="text-gray-400">/month</span>}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-0 hover:shadow-lg hover:shadow-cyan-500/50"
                      : "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                  }`}
                  variant={tier.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  Get Started
                </Button>

                {/* Features */}
                <div className="space-y-4">
                  {tier.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <Check size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
