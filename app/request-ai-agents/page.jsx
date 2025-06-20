"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import RequestHero from "../components/RequestHero"
import RequestForm from "../components/RequestForm"
import RequestProcess from "../components/RequestProcess"
import RequestFAQ from "../components/RequestFAQ"
import RequestTestimonials from "../components/RequestTestimonials"

export default function RequestPage() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-gray-50 to-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
            <Header />
            <RequestHero />
            <RequestForm />
            <RequestProcess />
            <RequestTestimonials />
            <RequestFAQ />
            <Footer />
        </div>
    )
}
