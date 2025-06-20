"use client"

import { useState, useEffect } from "react"

export default function OurStory() {
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

        const element = document.getElementById("our-story")
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    const timeline = [
        {
            year: "2019",
            title: "The Beginning",
            description:
                "Founded with a vision to make AI accessible to everyone, starting in a small garage in Silicon Valley.",
            color: "from-blue-500 to-blue-600",
        },
        {
            year: "2020",
            title: "First AI Agent",
            description:
                "Launched our first AI agent for customer support, helping 100+ businesses automate their workflows.",
            color: "from-purple-500 to-purple-600",
        },
        {
            year: "2021",
            title: "Series A Funding",
            description: "Raised $10M in Series A funding to expand our team and develop more sophisticated AI agents.",
            color: "from-teal-500 to-teal-600",
        },
        {
            year: "2022",
            title: "Global Expansion",
            description: "Expanded to serve customers worldwide with 24/7 AI agents supporting multiple languages.",
            color: "from-orange-500 to-orange-600",
        },
        {
            year: "2023",
            title: "AI Revolution",
            description: "Launched our revolutionary AI platform, enabling anyone to create custom AI agents without coding.",
            color: "from-pink-500 to-pink-600",
        },
        {
            year: "2024",
            title: "The Future",
            description: "Continuing to innovate and shape the future of work with advanced AI automation solutions.",
            color: "from-indigo-500 to-indigo-600",
        },
    ]

    return (
        <section id="our-story" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/30"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From a small startup to a global AI platform, here's how we've been shaping the future of work.
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-teal-200"></div>

                    <div className="space-y-12">
                        {timeline.map((item, index) => (
                            <div
                                key={item.year}
                                className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div
                                    className={`w-full max-w-md ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"} ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                                        }`}
                                >
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                        <div
                                            className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${item.color} text-white font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            {item.year}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
