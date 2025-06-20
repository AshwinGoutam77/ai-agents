"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function LoginHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      title: "AI-Powered Automation",
      description: "Automate repetitive tasks with intelligent AI agents",
      icon: "",
    },
    {
      title: "24/7 Productivity",
      description: "Your AI agents work around the clock for maximum efficiency",
      icon: "",
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption",
      icon: "",
    },
    {
      title: "Seamless Integration",
      description: "Connect with 500+ tools and platforms instantly",
      icon: "",
    },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        ></div>
      ))}

      <div className="relative z-10 flex flex-col justify-center px-12 py-12 text-white">
        <div
          className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 mb-12 group">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">△</span>
            </div>
            <span className="text-2xl font-bold">AI AGENTS</span>
          </Link>

          {/* Main Content */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Welcome Back to the{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Future of Work
              </span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Access your AI agents dashboard and continue automating your business processes with cutting-edge
              artificial intelligence.
            </p>
          </div>

          {/* Rotating Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-2xl backdrop-blur-sm transition-all duration-700 ${
                  currentFeature === index
                    ? "bg-white/20 scale-105 shadow-lg"
                    : "bg-white/5 opacity-60 hover:opacity-80"
                }`}
              >
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">50K+</div>
              <div className="text-blue-200 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">10M+</div>
              <div className="text-blue-200 text-sm">Tasks Automated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-blue-200 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div
        className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  )
}
