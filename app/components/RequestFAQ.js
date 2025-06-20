"use client"

import { useState, useEffect } from "react"

export default function RequestFAQ() {
  const [isVisible, setIsVisible] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(0)

  const faqs = [
    {
      question: "How long does it take to build a custom AI agent?",
      answer:
        "Development time varies based on complexity, but most custom AI agents are completed within 2-8 weeks. Simple agents can be ready in 2-3 weeks, while complex enterprise solutions may take 6-8 weeks. We'll provide a detailed timeline in your proposal.",
    },
    {
      question: "What information do you need to get started?",
      answer:
        "We need to understand your business requirements, the tasks you want automated, your current tools and integrations, budget range, and timeline. The more details you provide in the request form, the better we can tailor the solution to your needs.",
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer:
        "Yes! We offer comprehensive support packages including 24/7 monitoring, regular updates, performance optimization, and feature enhancements. Support plans start at $500/month and scale based on your needs.",
    },
    {
      question: "Can you integrate with our existing systems?",
      answer:
        "Our AI agents are designed to integrate seamlessly with popular platforms like Salesforce, HubSpot, Slack, Microsoft Teams, and hundreds of other tools via APIs. We can also build custom integrations for proprietary systems.",
    },
    {
      question: "What's the typical cost for a custom AI agent?",
      answer:
        "Costs vary based on complexity and requirements. Simple agents start around $10,000, while enterprise-level solutions can range from $50,000-$200,000+. We provide detailed pricing in our proposal after understanding your specific needs.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied with your custom AI agent, we'll work to make it right or provide a full refund. Your success is our priority.",
    },
    {
      question: "Can the AI agent be modified after deployment?",
      answer:
        "Definitely! AI agents can be continuously improved and modified. We offer ongoing development services to add new features, improve performance, and adapt to changing business needs. Many clients start with a basic version and expand over time.",
    },
    {
      question: "What makes your custom AI agents different?",
      answer:
        "Our agents are built with enterprise-grade security, scalability, and reliability. We use the latest AI technologies, provide comprehensive documentation, offer ongoing support, and ensure seamless integration with your existing workflows.",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("request-faq")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="request-faq" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our custom AI agent development process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <div
                  className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help! Schedule a free consultation to discuss your custom AI agent needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Schedule Consultation
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
