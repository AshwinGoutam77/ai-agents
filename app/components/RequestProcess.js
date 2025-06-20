"use client"

import { useState, useEffect } from "react"

export default function RequestProcess() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("request-process")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 5)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  const steps = [
    {
      title: "Submit Request",
      description: "Fill out our detailed form with your requirements",
      icon: "📝",
      color: "from-blue-500 to-blue-600",
      duration: "5 minutes",
    },
    {
      title: "Initial Consultation",
      description: "Our experts review your request and schedule a call",
      icon: "📞",
      color: "from-purple-500 to-purple-600",
      duration: "24 hours",
    },
    {
      title: "Proposal & Quote",
      description: "Receive a detailed proposal with timeline and pricing",
      icon: "📋",
      color: "from-teal-500 to-teal-600",
      duration: "48 hours",
    },
    {
      title: "Development",
      description: "Our team builds your custom AI agent",
      icon: "⚙️",
      color: "from-orange-500 to-orange-600",
      duration: "2-8 weeks",
    },
    {
      title: "Deployment",
      description: "Launch your AI agent and provide ongoing support",
      icon: "🚀",
      color: "from-green-500 to-green-600",
      duration: "1 week",
    },
  ]

  return (
    <section id="request-process" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Development Process
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial request to deployment, here's how we bring your custom AI agent to life.
          </p>
        </div>

        <div className="relative">
          {/* Process Timeline */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${activeStep === index ? "scale-105" : "scale-100"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
                    activeStep === index ? "border-blue-500 shadow-xl" : "border-gray-100"
                  }`}
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold relative`}
                    >
                      {index + 1}
                      {activeStep === index && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-20"></div>
                      )}
                    </div>
                    <div className="text-3xl">{step.icon}</div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{step.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{step.duration}</span>
                    {activeStep >= index && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <div className="w-1 h-8 bg-gray-200">
                      <div
                        className={`w-full bg-gradient-to-b from-blue-500 to-purple-600 transition-all duration-1000 ${
                          activeStep > index ? "h-full" : "h-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "1000ms" }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of companies that have transformed their operations with custom AI agents.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Start Your Request
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
