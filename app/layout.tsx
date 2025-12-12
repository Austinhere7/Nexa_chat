import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NexaChat - AI-Powered Conversations",
  description:
    "Experience the next generation of AI chatbot. Lightning-fast responses, smart learning, and seamless integration.",
  generator: "v0.app",
  // Default favicon used in hosted preview/tab. Change to any other file in `public/` if desired.
  icons: {
    icon: [
      {
        url: "/placeholder-logo.png",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_outfit.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
