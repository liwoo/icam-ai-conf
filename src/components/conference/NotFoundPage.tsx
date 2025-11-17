import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { GradientBlur } from "@/components/ui/gradient-blur"

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-200px)] w-full items-center justify-center overflow-hidden bg-white px-6 py-24">
      {/* Gradient Background Blurs */}
      <GradientBlur
        variant="purple-red"
        size="3xl"
        position="top-left-far"
        className="opacity-30"
      />
      <GradientBlur
        variant="purple-subtle"
        size="2xl"
        position="bottom-right-far"
        className="opacity-40"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 404 Number - Large and Bold */}
        <div className="mb-8 flex items-center justify-center">
          <h1
            className="font-accent text-[140px] font-black leading-none tracking-tighter text-brand-red sm:text-[180px] md:text-[220px] lg:text-[280px]"
            style={{
              textShadow: "0 4px 24px hsla(0, 84%, 60%, 0.2)",
            }}
          >
            404
          </h1>
        </div>

        {/* Page Not Found Heading */}
        <h2 className="mb-4 text-center font-heading text-3xl font-bold tracking-tight text-brand-black sm:text-4xl md:text-5xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-10 max-w-md text-center font-sans text-base text-neutral-600 sm:text-lg md:max-w-lg">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s get
          you back to exploring the ICTAM AGM 2025 conference.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="conference" size="xl">
            <Link to="/">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </Link>
          </Button>

          <Button asChild variant="conference-outline" size="xl">
            <Link to="/programme">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              View Programme
            </Link>
          </Button>
        </div>

        {/* Decorative Elements - Floating Dots */}
        <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[600px] w-[600px] opacity-20">
            <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-brand-red" />
            <div className="absolute left-[80%] top-[15%] h-3 w-3 rounded-full bg-brand-red-dark" />
            <div className="absolute left-[15%] top-[70%] h-2 w-2 rounded-full bg-brand-dark-red" />
            <div className="absolute left-[85%] top-[75%] h-3 w-3 rounded-full bg-brand-red" />
            <div className="absolute left-[45%] top-[10%] h-2 w-2 rounded-full bg-brand-red-dark" />
            <div className="absolute left-[50%] top-[85%] h-2 w-2 rounded-full bg-brand-dark-red" />
          </div>
        </div>
      </div>

      {/* Conference Info Footer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-center font-sans text-sm text-neutral-500">
          ICTAM AGM 2025 · AI for Sustainable Development
        </p>
      </div>
    </div>
  )
}
