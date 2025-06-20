"use client"

import { useState, useEffect } from "react"

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    users: 0,
    tasks: 0,
    countries: 0,
    satisfaction: 0,
  })

  const finalStats = {
    users: 50000,
    tasks: 10000000,
    countries: 120,
    satisfaction: 98,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounters({
        users: Math.floor(finalStats.users * progress),
        tasks: Math.floor(finalStats.tasks * progress),
        countries: Math.floor(finalStats.countries * progress),
        satisfaction: Math.floor(finalStats.satisfaction * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setCounters(finalStats)
      }
    }, stepDuration)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K"
    }
    return num.toString()
  }

  const stats = [
    {
      value: formatNumber(counters.users) + "+",
      label: "Happy Users",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
    },
    {
      value: formatNumber(counters.tasks) + "+",
      label: "Tasks Automated",
      icon: "⚡",
      color: "from-purple-500 to-purple-600",
    },
    {
      value: counters.countries + "+",
      label: "Countries Served",
      icon: "🌍",
      color: "from-teal-500 to-teal-600",
    },
    {
      value: counters.satisfaction + "%",
      label: "Satisfaction Rate",
      icon: "⭐",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <section id="stats-section" className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Numbers that showcase our commitment to transforming the way the world works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
