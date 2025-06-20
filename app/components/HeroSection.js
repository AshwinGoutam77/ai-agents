"use client"

import { useState, useEffect } from "react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: "-10%",
            right: "-10%",
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-teal-100/50 to-blue-100/50 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            bottom: "-10%",
            left: "-10%",
          }}
        ></div>

        {/* Animated Dot Patterns */}
        <div className="absolute left-10 top-20 opacity-20">
          <div className="grid grid-cols-12 gap-3">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="absolute right-10 top-40 opacity-20">
          <div className="grid grid-cols-12 gap-3">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Your AI Partner for
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent animate-gradient bg-300% animate-pulse">
                Scalable Innovation.
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-full transform scale-x-0 animate-scale-x"></div>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Discover and Hire AI Agents for every Task, Anytime, Anywhere
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
              <span className="relative z-10">Explore AI Agents</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white/20 rounded-full group-hover:animate-ping"></div>
            </button>

            <button className="group text-gray-700 hover:text-gray-900 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg">
              <span className="flex items-center space-x-2">
                <span>Watch Demo</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
