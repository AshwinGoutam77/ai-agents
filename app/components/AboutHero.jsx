"use client"

import { useState, useEffect } from "react"

export default function AboutHero() {
    const [isVisible, setIsVisible] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setIsVisible(true)
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <section className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                        top: "10%",
                        right: "10%",
                    }}
                ></div>
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
                        bottom: "10%",
                        left: "10%",
                    }}
                ></div>

                {/* Floating Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div
                    className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-100 mb-8">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">About AI Agents</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                        Pioneering the{" "}
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-gradient bg-300%">
                            AI Revolution
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed">
                        We're building the future where AI agents work alongside humans to create unprecedented productivity and
                        innovation. Our mission is to democratize AI and make it accessible to everyone.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <div className="group bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-1">2019</div>
                            <div className="text-sm text-gray-600">Founded</div>
                        </div>
                        <div className="group bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                            <div className="text-3xl font-bold text-purple-600 mb-1">10M+</div>
                            <div className="text-sm text-gray-600">Tasks Automated</div>
                        </div>
                        <div className="group bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl">
                            <div className="text-3xl font-bold text-teal-600 mb-1">50K+</div>
                            <div className="text-sm text-gray-600">Happy Users</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
