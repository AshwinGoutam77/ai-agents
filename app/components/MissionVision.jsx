"use client"

import { useState, useEffect } from "react"

export default function MissionVision() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        const element = document.getElementById("mission-vision")
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <section id="mission-vision" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Mission */}
                    <div
                        className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                To democratize artificial intelligence and empower every individual and organization to harness the
                                power of AI agents for unprecedented productivity and innovation.
                            </p>
                            <div className="space-y-3">
                                {[
                                    "Make AI accessible to everyone",
                                    "Eliminate repetitive tasks",
                                    "Boost human creativity and productivity",
                                    "Create a more efficient world",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                        <span className="text-gray-600">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Vision */}
                    <div
                        className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                        style={{ transitionDelay: "200ms" }}
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                A world where humans and AI agents collaborate seamlessly, creating a future where technology amplifies
                                human potential and drives meaningful progress across all industries.
                            </p>
                            <div className="space-y-3">
                                {[
                                    "AI-human collaboration as the norm",
                                    "Automated mundane tasks globally",
                                    "Enhanced human decision-making",
                                    "Sustainable technological progress",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                        <span className="text-gray-600">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
