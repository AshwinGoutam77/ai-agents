"use client"

import { useState, useEffect } from "react"

export default function ValuesSection() {
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

        const element = document.getElementById("values-section")
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    const values = [
        {
            icon: "🚀",
            title: "Innovation First",
            description: "We constantly push the boundaries of what's possible with AI technology.",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: "🤝",
            title: "Human-Centric",
            description: "AI should enhance human capabilities, not replace them. We build with empathy.",
            color: "from-green-500 to-green-600",
        },
        {
            icon: "🔒",
            title: "Trust & Security",
            description: "We prioritize data privacy and security in everything we build.",
            color: "from-purple-500 to-purple-600",
        },
        {
            icon: "🌍",
            title: "Global Impact",
            description: "Our solutions are designed to create positive change worldwide.",
            color: "from-teal-500 to-teal-600",
        },
        {
            icon: "⚡",
            title: "Excellence",
            description: "We strive for perfection in every product and service we deliver.",
            color: "from-orange-500 to-orange-600",
        },
        {
            icon: "🎯",
            title: "Customer Success",
            description: "Your success is our success. We're committed to your growth.",
            color: "from-pink-500 to-pink-600",
        },
    ]

    return (
        <section id="values-section" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-blue-50/20"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Values</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        The principles that guide everything we do and shape our company culture.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className={`group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="text-center">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                            <div
                                className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
