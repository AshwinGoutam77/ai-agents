"use client"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AboutHero from "../components/AboutHero"
import OurStory from "../components/OurStory"
import TeamSection from "../components/TeamSection"
import ValuesSection from "../components/ValuesSection"
import StatsSection from "../components/StatsSection"
import MissionVision from "../components/MissionVision"

export default function AboutPage() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-gray-50 to-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
            <Header />
            <AboutHero />
            {/* <OurStory /> */}
            <MissionVision />
            <ValuesSection />

            <StatsSection />
            {/* <TeamSection /> */} <div
                className={`text-center my-16 transition-all duration-1000`}
                style={{ transitionDelay: "800ms" }}
            >
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 py-20">
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">Talk to our AI experts</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl text-xl mx-auto">
                        Find out how you can put AI agents to work in every corner of your business.
                    </p>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        Get Started
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
