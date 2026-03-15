"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import { Web3Ad } from "web3ads-react"

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    // Simulate page initialization
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isPageLoading && <LoadingScreen />}
      <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <div className="flex justify-center py-8">
        <Web3Ad
          publisherWallet="0x4dE66947Bd526A782b4544EF6c186Bbe5755AD86"
          type="banner"
        />
      </div>
      <Footer />
    </div>
    </>
  )
}
