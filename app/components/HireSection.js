"use client"
import { useState, useEffect } from "react"
import {
  ShieldCheck,
  Brain,
  MessageCircle,
  BarChart3,
  Image,
  Mic,
  TrendingUp,
  Text,
  HeartPulse,
  MoveUpRight,
  Star,
} from "lucide-react";

export default function HireSection() {
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

    const element = document.getElementById("hire-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const AiservicesData = [
    {
      icon: <Brain />,
      title: "Machine Learning Model Training",
      description:
        "Build and train predictive models using structured and unstructured data.",
    },
    {
      icon: <MessageCircle />,
      title: "Chatbot Development",
      description:
        "Create intelligent conversational agents powered by natural language understanding.",
    },
    {
      icon: <BarChart3 />,
      title: "Data Analysis & Visualization",
      description:
        "Extract insights and create visualizations from complex datasets.",
    },
    {
      icon: <Image />,
      title: "Computer Vision",
      description:
        "Enable machines to recognize and process images and videos for object detection, recognition, and more.",
    },
    {
      icon: <Mic />,
      title: "Speech Recognition",
      description:
        "Transcribe and understand spoken language using automatic speech recognition (ASR) models.",
    },
    {
      icon: <TrendingUp />,
      title: "Predictive Analytics",
      description:
        "Forecast future trends using historical data and machine learning models.",
    },
    {
      icon: <Text />,
      title: "Natural Language Processing (NLP)",
      description:
        "Analyze and understand text data with sentiment analysis, keyword extraction, and language modeling.",
    },
    {
      icon: <ShieldCheck />,
      title: "AI for Cybersecurity",
      description:
        "Detect and prevent threats using anomaly detection and real-time threat intelligence.",
    },
    {
      icon: <HeartPulse />,
      title: "AI in Healthcare",
      description:
        "Support diagnostics, personalized treatment, and patient care with AI models trained on medical data.",
    },
  ];
  return (
    <section id="hire-section" className="ai-services-section py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-teal-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Hire{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Agents
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
            Find the perfect AI agent to handle your tasks effortlessly and boost your productivity
          </p>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-x-5 gap-y-20 mt-32">
            {AiservicesData.map((service, index) => (
              <div
                className="ai-service-card-wrapper relative group duration-300"
                key={index}
              >
                <div className="icon duration-300">{service.icon}</div>
                <div key={index} className="ai-service-card relative">
                  <div>
                    <h3 className="title">{service.title}</h3>
                    <p className="description">{service.description}</p>
                    <div className="ratting-div">
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </div>
                  </div>
                  <button className="mt-4 flex items-center group text-gray-700 hover:text-gray-900 px-6 py-3 w-fit rounded-full text-lg font-medium transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg bg-white">
                    <span className="flex items-center justify-center w-full space-x-2">
                      <span>Hire Now</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
              <span className="relative z-10">Start Hiring Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group text-gray-700 hover:text-gray-900 px-6 py-3 w-fit rounded-full text-lg font-medium transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg bg-white">
              <span className="flex items-center space-x-2">
                <span>Learn More</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
