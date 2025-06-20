"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function CompaniesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const companies = [
    { name: "Amazon", logo: "https://actionagents.co/assets/images/company-logo-amazon.webp" },
    { name: "Google", logo: "https://actionagents.co/assets/images/company-logo-google.webp" },
    { name: "IBM", logo: "https://actionagents.co/assets/images/company-logo-ibm.webp" },
    { name: "Meta", logo: "https://actionagents.co/assets/images/company-logo-meta.webp" },
    { name: "Microsoft", logo: "https://actionagents.co/assets/images/company-logo-microsoft.webp" },
    { name: "NVIDIA", logo: "https://actionagents.co/assets/images/company-logo-nvidia.webp" },
    { name: "OpenAI", logo: "https://actionagents.co/assets/images/company-logo-open-ai.webp" },
    { name: "Salesforce", logo: "https://actionagents.co/assets/images/company-logo-salesforce.webp" },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [companies.length])

  return (
    <section className="py-20 bg-white/70 backdrop-blur-sm relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4 rounded-full border border-blue-100 shadow-lg">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
              </div>
              <span className="text-gray-800 font-semibold text-lg">Top companies trusting AI</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className={`group transition-all duration-700 transform hover:scale-110 cursor-pointer ${
                  currentIndex === index ? "opacity-100 scale-110 z-10" : "opacity-60 hover:opacity-80"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative p-4 rounded-xl bg-white shadow-sm group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    width={120}
                    height={40}
                    className="filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
