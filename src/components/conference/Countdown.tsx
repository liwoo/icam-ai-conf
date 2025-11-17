import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  mins: number
  secs: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  })

  useEffect(() => {
    const target = new Date("2025-11-19T08:00:00").getTime()

    function updateCountdown() {
      const now = new Date().getTime()
      const diff = Math.max(target - now, 0)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const mins = Math.floor((diff / (1000 * 60)) % 60)
      const secs = Math.floor((diff / 1000) % 60)

      setTimeLeft({ days, hours, mins, secs })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gradient-to-r from-brand-dark-red via-brand-red-dark to-brand-red py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 lg:flex-row">
        {/* Location */}
        <div className="flex items-center gap-3 text-white">
          <div className="rounded-full bg-white/20 p-3">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="text-sm font-medium">
            <div>Sunbird Nkopola Lodge,</div>
            <div>Mangochi, Malawi</div>
          </div>
        </div>

        {/* CTA Text */}
        <div className="text-center lg:text-left">
          <h3 className="text-3xl font-bold text-white lg:text-4xl">
            Hurry Up!
          </h3>
          <p className="text-xl font-semibold text-white">
            Book Your Seat Now
          </p>
        </div>

        {/* Countdown Boxes */}
        <div className="flex gap-3">
          <div className="flex min-w-[80px] flex-col items-center rounded-lg bg-white px-4 py-3 text-brand-black shadow-lg">
            <div className="text-3xl font-bold leading-none">
              {String(timeLeft.days).padStart(3, "0")}
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wider">
              Days
            </div>
          </div>
          <div className="flex min-w-[80px] flex-col items-center rounded-lg bg-white px-4 py-3 text-brand-black shadow-lg">
            <div className="text-3xl font-bold leading-none">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wider">
              Hours
            </div>
          </div>
          <div className="flex min-w-[80px] flex-col items-center rounded-lg bg-white px-4 py-3 text-brand-black shadow-lg">
            <div className="text-3xl font-bold leading-none">
              {String(timeLeft.mins).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wider">
              Mins
            </div>
          </div>
          <div className="flex min-w-[80px] flex-col items-center rounded-lg bg-white px-4 py-3 text-brand-black shadow-lg">
            <div className="text-3xl font-bold leading-none">
              {String(timeLeft.secs).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wider">
              Secs
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
