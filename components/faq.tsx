"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How does NexaChat's AI learn and improve?",
    answer:
      "NexaChat uses advanced machine learning to improve from every interaction. Our models are trained on millions of conversations and continuously fine-tuned based on user feedback and performance metrics.",
  },
  {
    question: "Is my data secure with NexaChat?",
    answer:
      "Yes, absolutely. We implement bank-level encryption (AES-256), SOC 2 compliance, and regular security audits. Enterprise customers can opt for on-premise deployment for maximum security.",
  },
  {
    question: "What integrations are available?",
    answer:
      "NexaChat supports integrations with popular platforms like Slack, Microsoft Teams, Zendesk, Salesforce, and custom webhooks. Our REST API allows unlimited custom integrations.",
  },
  {
    question: "Can I customize the AI's behavior?",
    answer:
      "Yes, you can customize tone, personality, knowledge base, and response style. We offer customization and dedicated support for advanced needs—reach out if you need help tailoring the assistant to your workflows.",
  },
  {
    question: "What's the implementation time?",
    answer:
      "Basic setup takes 5-10 minutes. Full integration with custom workflows typically takes 1-2 hours. Our team provides guided implementation for larger deployments and organizations that need extra assistance.",
  },
  {
    question: "Do I need to pay or sign up to use NexaChat?",
    answer:
      "No — NexaChat is completely free to use. There are no paid tiers, no free trials, and no credit card required. You can start chatting immediately without creating an account.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about NexaChat</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <button key={idx} onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full text-left">
              <div className="bg-gray-900/40 border border-cyan-500/10 rounded-lg p-6 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-white font-semibold text-lg">{faq.question}</h3>
                  <ChevronDown
                    size={24}
                    className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openIndex === idx && <p className="text-gray-400 mt-4 leading-relaxed">{faq.answer}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
