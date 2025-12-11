"use client"

import { Mail, Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-white">NexaChat</span>
            </div>
            <p className="text-gray-400 text-sm">The next generation of AI-powered conversations.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  DPA
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-500/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2025 NexaChat. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
