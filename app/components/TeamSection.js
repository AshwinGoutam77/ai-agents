"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function TeamSection() {
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

    const element = document.getElementById("team-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former AI researcher at Google with 10+ years in machine learning and product development.",
      image: "/placeholder.svg?height=300&width=300&text=Sarah+Chen",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Tesla engineer specializing in autonomous systems and scalable AI infrastructure.",
      image: "/placeholder.svg?height=300&width=300&text=Marcus+Rodriguez",
      social: { linkedin: "#", github: "#" },
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      bio: "PhD in Computer Science from MIT, published 50+ papers on neural networks and NLP.",
      image: "/placeholder.svg?height=300&width=300&text=Emily+Watson",
      social: { linkedin: "#", scholar: "#" },
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Former lead engineer at Uber, expert in distributed systems and cloud architecture.",
      image: "/placeholder.svg?height=300&width=300&text=David+Kim",
      social: { linkedin: "#", github: "#" },
    },
    {
      name: "Lisa Thompson",
      role: "Head of Design",
      bio: "Award-winning UX designer with experience at Apple and Airbnb, passionate about human-AI interaction.",
      image: "/placeholder.svg?height=300&width=300&text=Lisa+Thompson",
      social: { linkedin: "#", dribbble: "#" },
    },
    {
      name: "Alex Patel",
      role: "VP of Sales",
      bio: "Former Salesforce executive with expertise in enterprise AI solutions and customer success.",
      image: "/placeholder.svg?height=300&width=300&text=Alex+Patel",
      social: { linkedin: "#", twitter: "#" },
    },
  ]

  return (
    <section id="team-section" className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Brilliant minds from top tech companies working together to revolutionize the future of work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-1">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>

                <div className="flex justify-center space-x-4">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 group/social"
                    >
                      <span className="text-sm font-medium capitalize group-hover/social:scale-110 transition-transform duration-300">
                        {platform[0].toUpperCase()}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for AI and innovation. Come help us
              shape the future of work.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              View Open Positions
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
