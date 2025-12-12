"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/40 border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline">NexaChat</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-cyan-400 transition">
              Features
            </a>
            <a href="#faq" className="text-gray-300 hover:text-cyan-400 transition">
              FAQ
            </a>
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-0 hover:shadow-lg hover:shadow-cyan-500/50"
              onClick={() => router.push('/chat')}
            >
              Start Chat
            </Button>
          </div>

          {/* Mobile Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-cyan-500/10 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-cyan-400">
              Features
            </a>
            <a href="#faq" className="block text-gray-300 hover:text-cyan-400">
              FAQ
            </a>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-0"
                onClick={() => router.push('/chat')}
              >
                Start Chat
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
