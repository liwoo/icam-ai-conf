import { useEffect, useRef, useState } from "react"

import { GradientBlur } from "@/components/ui/gradient-blur"
import { PageTitle } from "@/components/ui/page-title"
import conferenceData from "@/data/conference.json"

import { SpeakerCard } from "./SpeakerCard"

interface Speaker {
  name: string
  title: string
  topic: string
  biography: string
  image: string
  socialMedia: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
}

const speakers: Speaker[] = conferenceData.speakers

export function SpeakersSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-swipe carousel every 5 seconds on mobile (pauses on interaction)
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % speakers.length)
      }, 5000)
    }

    startAutoPlay()
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [])

  // Scroll carousel to current slide
  useEffect(() => {
    if (carouselRef.current && !isDragging) {
      const slideWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: slideWidth * currentSlide,
        behavior: "smooth",
      })
    }
  }, [currentSlide, isDragging])

  // Touch/Mouse event handlers
  const handleDragStart = (clientX: number) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(clientX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
    // Pause auto-play on interaction
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !carouselRef.current) return
    const x = clientX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2 // Multiply by 2 for faster drag
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleDragEnd = () => {
    if (!carouselRef.current) return
    setIsDragging(false)

    // Snap to nearest slide
    const slideWidth = carouselRef.current.offsetWidth
    const newSlide = Math.round(carouselRef.current.scrollLeft / slideWidth)
    setCurrentSlide(Math.max(0, Math.min(newSlide, speakers.length - 1)))

    // Resume auto-play after 2 seconds
    setTimeout(() => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % speakers.length)
      }, 5000)
    }, 2000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    // Pause and resume auto-play
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    setTimeout(() => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % speakers.length)
      }, 5000)
    }, 2000)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % speakers.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + speakers.length) % speakers.length)
  }

  return (
    <section id="speakers" className="relative bg-white py-16">
      {/* Subtle Purple-to-Red Gradient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GradientBlur
          variant="purple-subtle"
          size="3xl"
          className="-right-96 top-0"
        />
        <GradientBlur
          variant="red-subtle"
          size="3xl"
          className="-left-96 bottom-0"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <PageTitle size="lg" align="center">
            Keynote Speakers
          </PageTitle>
        </div>

        {/* Mobile: Carousel with auto-swipe and touch gestures */}
        <div className="relative md:hidden">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95"
            aria-label="Previous speaker"
          >
            <svg
              className="h-6 w-6 text-brand-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95"
            aria-label="Next speaker"
          >
            <svg
              className="h-6 w-6 text-brand-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            ref={carouselRef}
            className="flex cursor-grab overflow-x-hidden scroll-smooth active:cursor-grabbing"
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className="w-full flex-shrink-0 px-4"
              >
                <SpeakerCard speaker={speaker} isMobile />
              </div>
            ))}
          </div>

          {/* Carousel indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {speakers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-brand-red"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4 px-4">
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-brand-red to-pink-600 transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / speakers.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:block">
          {/* First row: 3 speakers */}
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {speakers.slice(0, 3).map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>

          {/* Second row: 2 speakers centered */}
          <div className="grid gap-12 md:grid-cols-2 lg:mx-auto lg:max-w-4xl">
            {speakers.slice(3, 5).map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
