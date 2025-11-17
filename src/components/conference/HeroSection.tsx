import { AnimatedTitle } from "./AnimatedTitle"
import { Countdown } from "./Countdown"
import { TypewriterText } from "./TypewriterText"
import { ConferenceBadge } from "@/components/ui/conference-badge"

export function HeroSection() {
  return (
    <>
      {/* Hero Image Section - 2x larger */}
      <section
        id="hero"
        className="relative h-[900px] overflow-hidden lg:h-[1000px]"
      >
        <img
          src="/images/hero.png"
          alt="Conference participants using VR headsets"
          className="h-full w-full object-cover"
        />

        {/* Black-to-Red Gradient Overlay - High opacity left (black) to low opacity right (red) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-brand-red/20" />

        {/* Decorative ICTAM Icon Motif - Large branded watermark */}
        <div className="absolute inset-y-0 -left-96 flex items-center lg:-left-[500px]">
          <div className="relative h-[1400px] w-[1400px] animate-subtle-pulse lg:h-[1600px] lg:w-[1600px]">
            <img
              src="/logos/brand/ictam-icon.svg"
              alt=""
              className="h-full w-full opacity-15 mix-blend-overlay"
              style={{
                filter: "brightness(0) saturate(100%) invert(35%) sepia(78%) saturate(2476%) hue-rotate(338deg) brightness(91%) contrast(92%)",
              }}
              aria-hidden="true"
            />
            {/* Secondary icon with gradient effect for depth */}
            <img
              src="/logos/brand/ictam-icon.svg"
              alt=""
              className="absolute inset-0 h-full w-full opacity-10 mix-blend-screen"
              style={{
                filter: "brightness(0) saturate(100%) invert(18%) sepia(89%) saturate(4215%) hue-rotate(348deg) brightness(89%) contrast(102%)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Custom animation styles */}
        <style>{`
          @keyframes subtle-pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          .animate-subtle-pulse {
            animation: subtle-pulse 8s ease-in-out infinite;
          }
        `}</style>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            {/* GLOBAL CONFERENCE Badge */}
            <ConferenceBadge
              variant="gradient"
              size="lg"
              className="mb-8 lg:mb-12"
            >
              <svg
                className="h-6 w-6 lg:h-8 lg:w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Global Conference
            </ConferenceBadge>

            {/* Main Heading with Animation - Single line */}
            <AnimatedTitle
              text={[
                { text: "ICTAM", color: "hsl(0 84% 60%)" },
                { text: " AGM ", color: undefined },
                { text: "2025", color: undefined },
              ]}
              className="block text-5xl font-bold leading-none tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl"
            />
            <TypewriterText
              text="AI for Sustainable Development"
              delay={800}
              speed={60}
              className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-transparent lg:mt-8 lg:text-5xl"
              style={{
                WebkitTextStroke: "1.5px white",
              }}
            />

            {/* Register Now Button */}
            <a
              href="#register"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-pink-600 px-8 py-4 text-lg font-bold uppercase tracking-tight text-white shadow-2xl shadow-brand-red/30 transition-all hover:scale-105 hover:shadow-brand-red/50 lg:mt-10"
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
