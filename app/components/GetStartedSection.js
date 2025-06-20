"use client"

import { useState, useEffect } from "react"

export default function GetStartedSection() {
    const [activeStep, setActiveStep] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    const steps = [
        {
            number: 1,
            title: "Select Your AI Agent",
            description:
                "You can choose from our extensive library of AI-powered agents or customize one to suit your needs.",
            image: "agent-selection",
        },
        {
            number: 2,
            title: "Connect Your Tools",
            description: "Effortlessly integrate with your favorite platforms using our one-click setup.",
            image: "tool-integration",
        },
        {
            number: 3,
            title: "Automate & Scale",
            description: "Let AI take over repetitive tasks while you focus on growing your business.",
            image: "automation",
        },
    ]

    useEffect(() => {
        setIsVisible(true)

        // Auto-cycle through steps
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [steps.length])

    const renderStepImage = (stepImage) => {
        switch (stepImage) {
            case "agent-selection":
                return (
                    <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 flex items-center justify-center">
                        <div className="space-y-4 w-full max-w-sm">
                            <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-100 transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">🤖</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">AI Assistant</h4>
                                        <p className="text-sm text-gray-600">General Purpose</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-lg border border-purple-100 transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">📊</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Data Analyst</h4>
                                        <p className="text-sm text-gray-600">Analytics & Reports</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-lg border border-teal-100 transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">💬</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Customer Support</h4>
                                        <p className="text-sm text-gray-600">24/7 Support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "tool-integration":
                return (
                    <div className="relative w-full h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                            {[
                                { name: "Slack", color: "from-purple-500 to-purple-600", icon: "💬" },
                                { name: "Gmail", color: "from-red-500 to-red-600", icon: "📧" },
                                { name: "Notion", color: "from-gray-700 to-gray-800", icon: "📝" },
                                { name: "Zoom", color: "from-blue-500 to-blue-600", icon: "📹" },
                                { name: "Trello", color: "from-blue-400 to-blue-500", icon: "📋" },
                                { name: "Drive", color: "from-yellow-500 to-orange-500", icon: "📁" },
                            ].map((tool, index) => (
                                <div
                                    key={tool.name}
                                    className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex flex-col items-center space-y-2 transform hover:scale-110 transition-all duration-300"
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div
                                        className={`w-10 h-10 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center`}
                                    >
                                        <span className="text-white text-sm">{tool.icon}</span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-32 h-32 border-4 border-green-400 rounded-full animate-pulse opacity-30"></div>
                        </div>
                    </div>
                )
            case "automation":
                return (
                    <div className="relative w-full h-80 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 flex items-center justify-center">
                        <div className="space-y-6 w-full max-w-sm">
                            <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-900">Task Automation</h4>
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Email Processing</span>
                                        <span className="text-xs text-green-600 ml-auto">✓ Active</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Data Analysis</span>
                                        <span className="text-xs text-green-600 ml-auto">✓ Active</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Report Generation</span>
                                        <span className="text-xs text-green-600 ml-auto">✓ Active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-1">247%</div>
                                    <div className="text-sm text-gray-600">Productivity Increase</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get Started in{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            3 Simple Steps
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Deploy AI automation in minutes—no hassle, no complex setup.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Steps Section */}
                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className={`relative transition-all duration-700 transform ${activeStep === index ? "opacity-100 scale-101" : "opacity-60 scale-100"
                                    } ${isVisible ? "translate-x-0" : "-translate-x-10"}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                {/* Connecting Line */}
                                {index < steps.length - 1 && (
                                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-200">
                                        <div
                                            className={`w-full bg-gradient-to-b from-blue-500 to-purple-600 transition-all duration-1000 ${activeStep > index ? "h-full" : "h-0"
                                                }`}
                                        ></div>
                                    </div>
                                )}

                                <div className="flex items-start space-x-4">
                                    {/* Step Number */}
                                    <div
                                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-500 ${activeStep === index
                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-110"
                                                : activeStep > index
                                                    ? "bg-gradient-to-r from-green-500 to-green-600"
                                                    : "bg-gray-300"
                                            }`}
                                    >
                                        {activeStep > index ? (
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            step.number
                                        )}

                                        {/* Pulse Animation for Active Step */}
                                        {activeStep === index && (
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-20"></div>
                                        )}
                                    </div>

                                    {/* Step Content */}
                                    <div className="flex-1 pb-8">
                                        <h3
                                            className={`text-xl font-semibold mb-2 transition-colors duration-300 ${activeStep === index ? "text-gray-900" : "text-gray-600"
                                                }`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className={`transition-colors duration-300 leading-relaxed ${activeStep === index ? "text-gray-700" : "text-gray-500"
                                                }`}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Section */}
                    <div className="relative">
                        <div
                            className={`transition-all duration-700 transform ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                                }`}
                        >
                            {renderStepImage(steps[activeStep].image)}
                        </div>

                        {/* Progress Indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {steps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStep === index
                                            ? "bg-gradient-to-r from-blue-500 to-purple-600 w-8"
                                            : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
