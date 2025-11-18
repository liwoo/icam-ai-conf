"use client"

import { useEffect, useState } from "react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      {/* ICTAM Circle Pattern */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* Main circle */}
        <circle cx="28" cy="28" r="28" fill="#CE1F2F" />
        {/* Inner decorative circles inspired by ICTAM logo */}
        <circle cx="28" cy="20" r="3" fill="white" fillOpacity="0.3" />
        <circle cx="20" cy="28" r="2.5" fill="white" fillOpacity="0.25" />
        <circle cx="36" cy="28" r="2.5" fill="white" fillOpacity="0.25" />
        <circle cx="24" cy="24" r="2" fill="white" fillOpacity="0.2" />
        <circle cx="32" cy="24" r="2" fill="white" fillOpacity="0.2" />
      </svg>

      {/* Arrow icon */}
      <svg
        className="relative z-10 h-6 w-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}
