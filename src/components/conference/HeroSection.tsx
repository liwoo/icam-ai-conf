import { AnimatedTitle } from "./AnimatedTitle"
import { Countdown } from "./Countdown"
import { TypewriterText } from "./TypewriterText"
import { ConferenceBadge } from "@/components/ui/conference-badge"

export function HeroSection() {
  return (
    <>
      {/* Hero Image Section - Shorter on mobile */}
      <section
        id="hero"
        className="relative h-[500px] overflow-hidden lg:h-[1000px]"
      >
        <img
          src="/images/hero.png"
          alt="Conference participants using VR headsets"
          className="h-full w-full object-cover"
        />

        {/* Black-to-Red Gradient Overlay - High opacity left (black) to low opacity right (red) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-brand-red/10" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            {/* Conference Date Badge - Hidden on mobile */}
            <div className="mb-8 hidden lg:mb-12 lg:inline-flex lg:items-center lg:gap-2 lg:rounded-full lg:bg-gradient-to-r lg:from-brand-red/60 lg:to-brand-red-dark/60 lg:px-4 lg:py-1.5 lg:text-xs lg:font-semibold lg:uppercase lg:tracking-wide lg:text-white lg:shadow-md lg:shadow-brand-red/20">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              19-23 November 2025
            </div>

            {/* Main Heading - Simple text on mobile, animated on desktop */}
            <h1 className="block text-5xl font-bold leading-none tracking-tight text-white lg:hidden">
              <span style={{ color: "hsl(0 84% 60%)" }}>ICTAM</span> AGM 2025
            </h1>
            <AnimatedTitle
              text={[
                { text: "ICTAM", color: "hsl(0 84% 60%)" },
                { text: " AGM ", color: undefined },
                { text: "2025", color: undefined },
              ]}
              className="hidden text-5xl font-bold leading-none tracking-tight text-white md:text-7xl lg:block lg:text-8xl xl:text-9xl"
            />

            {/* Subtitle - Simple on mobile, typewriter on desktop */}
            <h2 className="mt-4 max-w-4xl text-2xl font-bold text-white lg:hidden">
              AI for Sustainable Development
            </h2>
            <TypewriterText
              text="AI for Sustainable Development"
              delay={800}
              speed={60}
              className="mt-6 hidden max-w-4xl text-4xl font-bold tracking-tight text-transparent lg:mt-8 lg:block lg:text-5xl"
              style={{
                WebkitTextStroke: "1.5px white",
              }}
            />

            {/* Register Now Button - Visible on both mobile and desktop */}
            <a
              href="#register"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-pink-600 px-6 py-3 text-base font-bold uppercase tracking-tight text-white shadow-2xl shadow-brand-red/30 transition-all hover:scale-105 hover:shadow-brand-red/50 lg:mt-10 lg:px-8 lg:py-4 lg:text-lg"
            >
              Register Now
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <Countdown />
    </>
  )
}
