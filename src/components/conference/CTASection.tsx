interface Stat {
  value: string
  label: string
  icon: React.ReactNode
}

const stats: Stat[] = [
  {
    value: "500+",
    label: "Attendees",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Expert Speakers",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    ),
  },
  {
    value: "30+",
    label: "Sessions",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    value: "3",
    label: "Days of Innovation",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
]

import { Link } from "@tanstack/react-router"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-black via-brand-dark-red to-brand-red-dark py-20">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-brand-red/20 to-brand-red/20 blur-3xl"></div>
        <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tr from-gradient-purple/20 to-brand-red/20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Don&apos;t Miss Out!
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/90 md:text-2xl">
            Join Africa&apos;s premier AI conference and be part of shaping the
            future of sustainable development through artificial intelligence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <div className="mb-3 rounded-full bg-gradient-to-br from-brand-red to-pink-600 p-3 text-white">
                {stat.icon}
              </div>
              <div className="mb-1 text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-center text-sm font-medium text-white/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#register"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-pink-600 px-8 py-4 text-lg font-bold uppercase tracking-tight text-white shadow-2xl transition-all hover:scale-105 hover:shadow-brand-red/50"
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
          <Link
            to="/programme"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold uppercase tracking-tight text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
          >
            View Agenda
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-white/80">
            Early bird pricing ends soon • Limited seats available
          </p>
        </div>
      </div>
    </section>
  )
}
