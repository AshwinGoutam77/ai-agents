"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Banner() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-medium">Hire your first AI Agent for free</span>
          </div>
          <span className="text-yellow-300">→</span>
          <Link
            href="/signup"
            className="group relative text-yellow-300 hover:text-yellow-200 font-semibold transition-all duration-300"
          >
            <span className="relative z-10">Sign Up Now</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-1 left-10 w-2 h-2 bg-white/20 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-2 right-20 w-1 h-1 bg-white/30 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-1 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
    </div>
  )
}
