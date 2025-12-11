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
  // Use a transparent SVG data URI so the browser tab shows no visible image.
  // This avoids deleting existing files in `public/` while ensuring no picture appears.
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
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
