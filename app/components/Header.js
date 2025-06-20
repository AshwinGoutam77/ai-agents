"use client"

import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Hire AI Agents", href: "/ai-agents" },
    { name: "Request AI Agent", href: "/request-ai-agents" },
    { name: "About Us", href: "/about-us" },
  ]

  return (
    <header className="relative z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          {/* <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-bold text-sm">△</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
              AGENTS
            </span>
          </div> */}
          <img src="https://toolapi.devwings.com/assets/chat/chats/2025-06/200625050843200625050608ChatGPTImageJun20_2025_05_05_41PM-removebg-preview.png" alt="logo" width={100} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <Link href='/login'>
            <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2.5 rounded-full hover:from-gray-800 hover:to-gray-600 transition-all duration-300 font-medium mt-2">
              Sign Up
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-64 pb-4" : "max-h-0"}`}
        >
          <nav className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href='/login'>
              <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2.5 rounded-full hover:from-gray-800 hover:to-gray-600 transition-all duration-300 font-medium mt-2">
                Sign Up
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
