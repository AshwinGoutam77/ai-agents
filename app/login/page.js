"use client"

import { useState, useEffect } from "react"
import LoginForm from "../components/LoginForm"
import LoginHero from "../components/LoginHero"
import Header from "../components/Header"

export default function LoginPage() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
            <Header />
            <div className="min-h-screen flex">
                {/* <LoginHero /> */}
                <LoginForm />
            </div>
        </div>
    )
}
