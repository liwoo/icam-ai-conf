import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { z } from "zod"

import { Seo } from "@/components/layout/seo"
import { Badge } from "@/components/ui/badge"
import sponsorData from "@/data/logos.json"

interface Sponsor {
  id: string
  name: string
  fullName: string
  logo: string
  tier: "platinum" | "gold" | "silver"
  category: string
  description: string
  website?: string
  about?: string
  services?: string[]
  socialMedia?: {
    linkedin?: string
    facebook?: string
    twitter?: string
  }
}

const sponsors: Sponsor[] = sponsorData.sponsorLogos as Sponsor[]

const tierConfig = {
  platinum: {
    label: "Platinum Sponsor",
    color: "from-slate-600 to-gray-400",
    textColor: "text-slate-700",
  },
  gold: {
    label: "Gold Sponsor",
    color: "from-amber-700 to-amber-400",
    textColor: "text-amber-700",
  },
  silver: {
    label: "Silver Sponsor",
    color: "from-gray-300 to-gray-500",
    textColor: "text-gray-700",
  },
}

export const Route = createFileRoute("/_base/sponsors/$sponsorId")({
  component: SponsorDetailPage,
  parseParams: (params) => z.object({ sponsorId: z.string() }).parse(params),
  beforeLoad: ({ params }) => {
    const sponsor = sponsors.find((s) => s.id === params.sponsorId)
    if (!sponsor) {
      throw notFound()
    }
    return { sponsor }
  },
})

function SponsorDetailPage() {
  const { sponsor } = Route.useRouteContext()
  const tierInfo = tierConfig[sponsor.tier]

  return (
    <>
      <Seo
        title={`${sponsor.fullName} - ICTAM AGM 2025 Sponsor`}
        description={`Learn more about ${sponsor.fullName}, a ${tierInfo.label} of ICTAM AGM 2025. ${sponsor.description}`}
      />

      {/* Hero Section with Sponsor Logo */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-black py-24 lg:py-32">
        {/* Gradient Overlay based on tier */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${tierInfo.color} opacity-10`}
        />

        {/* Content */}
        <div className="relative mx-auto w-full max-w-7xl px-6">
          {/* Back Button */}
          <Link
            to="/"
            hash="sponsors"
            className="group mb-12 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
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
            Back to Sponsors
          </Link>

          <div className="flex flex-col items-center text-center">
            {/* Sponsor Logo Card */}
            <div
              className={`mb-8 rounded-3xl bg-gradient-to-br ${tierInfo.color} p-1 shadow-2xl`}
            >
              <div className="flex h-64 w-full items-center justify-center rounded-[22px] bg-gradient-to-br from-red-950 to-black px-12 md:h-80 md:w-[500px]">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.fullName} logo`}
                  className="h-auto max-h-48 w-auto max-w-full object-contain md:max-h-56"
                  loading="eager"
                />
              </div>
            </div>

            {/* Sponsor Name */}
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              {sponsor.fullName}
            </h1>

            {/* Tier Badge */}
            <Badge
              className={`mb-6 bg-gradient-to-r ${tierInfo.color} px-8 py-3 text-base font-bold text-white shadow-lg`}
            >
              {tierInfo.label}
            </Badge>

            {/* Description */}
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/90 lg:text-2xl">
              {sponsor.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* About Section */}
          {sponsor.about && (
            <div className="mb-16">
              <h2 className="mb-8 text-4xl font-bold text-brand-black lg:text-5xl">
                About {sponsor.name}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-line text-xl leading-relaxed text-gray-700">
                  {sponsor.about}
                </p>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="align-item-center mb-12 flex flex-wrap">
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-wide text-brand-red">
                Category
              </span>
              <div className="align-items-center flex flex-row gap-4">
                <div className="w-auto min-w-fit rounded-full bg-gradient-to-r from-brand-red/10 to-brand-red/5 px-6 py-3">
                  <p className="mt-1 text-lg font-bold capitalize text-brand-black">
                    {sponsor.category}
                  </p>
                </div>
                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-brand-red/20 bg-white px-6 py-3 text-sm font-bold text-brand-red transition-all hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-lg"
                  >
                    Visit Website
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Services Section */}
          {sponsor.services && sponsor.services.length > 0 && (
            <div className="mb-16">
              <h3 className="mb-8 text-3xl font-bold text-brand-black lg:text-4xl">
                Services & Solutions
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {sponsor.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md"
                  >
                    <svg
                      className="mt-1 h-6 w-6 shrink-0 text-brand-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg font-medium text-gray-800">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Links */}
          {sponsor.socialMedia &&
            (sponsor.socialMedia.linkedin ||
              sponsor.socialMedia.facebook ||
              sponsor.socialMedia.twitter) && (
              <div className="mb-16 border-t border-gray-200 pt-12">
                <h3 className="mb-8 text-2xl font-bold text-brand-black">
                  Connect with {sponsor.name}
                </h3>
                <div className="flex items-center gap-4">
                  {sponsor.socialMedia.linkedin && (
                    <a
                      href={sponsor.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                      aria-label={`${sponsor.fullName} LinkedIn profile`}
                    >
                      <svg
                        className="h-8 w-8 text-brand-red transition-colors hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {sponsor.socialMedia.facebook && (
                    <a
                      href={sponsor.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                      aria-label={`${sponsor.fullName} Facebook profile`}
                    >
                      <svg
                        className="h-8 w-8 text-brand-red transition-colors hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  )}
                  {sponsor.socialMedia.twitter && (
                    <a
                      href={sponsor.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                      aria-label={`${sponsor.fullName} Twitter profile`}
                    >
                      <svg
                        className="h-8 w-8 text-brand-red transition-colors hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}

          {/* Call to Action */}
          <div className="rounded-3xl bg-gradient-to-r from-brand-red to-brand-dark-red p-12 text-center shadow-2xl">
            <h3 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
              Become a Sponsor
            </h3>
            <p className="mb-8 text-lg text-white/90 lg:text-xl">
              Join {sponsor.name} and other industry leaders in supporting AI
              innovation in Africa
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-red shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
              >
                Contact Us
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
              </Link>
              <Link
                to="/"
                hash="register"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-brand-red"
              >
                Register for Event
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
