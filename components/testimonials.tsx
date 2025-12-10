"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    content:
      "NexaChat has transformed how our team handles customer inquiries. The AI is incredibly accurate and the integration was seamless.",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "Marcus Johnson",
    role: "CEO at StartupXYZ",
    content:
      "The best customer support chatbot we've implemented. Response time is lightning fast and accuracy is unmatched in the industry.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
  {
    name: "Elena Rodriguez",
    role: "CTO at InnovateLabs",
    content:
      "Impressive API documentation and developer experience. Our team was able to integrate it in just a few hours. Highly recommended!",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "David Park",
    role: "Operations Lead at CloudSync",
    content:
      "The analytics dashboard gives us real-time insights into customer conversations. Helped us improve support efficiency by 40%.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Trusted by Industry Leaders</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">See what companies are saying about NexaChat</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group bg-gray-900/40 border border-cyan-500/10 rounded-xl p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-cyan-400 fill-cyan-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-8 leading-relaxed italic">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border border-cyan-500/20"
                />
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
