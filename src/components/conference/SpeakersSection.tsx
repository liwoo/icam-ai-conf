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
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-swipe carousel every 4 seconds on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % speakers.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Scroll carousel to current slide
  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: slideWidth * currentSlide,
        behavior: "smooth",
      })
    }
  }, [currentSlide])

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

        {/* Mobile: Carousel with auto-swipe */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden scroll-smooth"
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
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-brand-red"
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
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
