import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Seo } from "@/components/layout/seo"
import conferenceData from "@/data/conference.json"
import { findSpeakerBySlug } from "@/lib/utils"

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

export const Route = createFileRoute("/_base/speakers/$speakerId")({
  component: SpeakerDetailPage,
  parseParams: (params) =>
    z.object({ speakerId: z.string() }).parse(params),
  beforeLoad: ({ params }) => {
    const speaker = findSpeakerBySlug(speakers, params.speakerId)
    if (!speaker) {
      throw notFound()
    }
    return { speaker }
  },
})

function SpeakerDetailPage() {
  const { speaker } = Route.useRouteContext()

  return (
    <>
      <Seo
        title={`${speaker.name} - ICTAM AGM 2025`}
        description={`Learn more about ${speaker.name}, ${speaker.title}, speaking at ICTAM AGM 2025.`}
      />

      {/* Hero Section with Speaker Image */}
      <section className="relative h-[600px] overflow-hidden lg:h-[700px]">
        <img
          src={speaker.image}
          alt={`${speaker.name} portrait`}
          className="h-full w-full object-cover object-center"
        />

        {/* Red Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/95 via-brand-dark-red/80 to-brand-black/90" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            {/* Back Button */}
            <Link
              to="/"
              hash="speakers"
              className="group mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
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
              Back to Speakers
            </Link>

            {/* Speaker Name */}
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              {speaker.name}
            </h1>

            {/* Speaker Title Badge */}
            <Badge className="mb-8 bg-white/20 px-6 py-3 text-base font-medium text-white backdrop-blur-sm hover:bg-white/30">
              {speaker.title}
            </Badge>

            {/* Topic with Quotation Mark */}
            <div className="relative max-w-4xl">
              <div className="absolute -left-4 -top-8 -z-10 text-9xl font-bold leading-none text-white/20 lg:-left-8 lg:-top-12 lg:text-[12rem]">
                &ldquo;
              </div>
              <p className="relative text-2xl font-semibold leading-relaxed text-white lg:text-3xl">
                {speaker.topic}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Biography */}
          <div className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-brand-black lg:text-4xl">
              About {speaker.name.split(" ")[0]}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-700">
                {speaker.biography}
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          {(speaker.socialMedia.linkedin ||
            speaker.socialMedia.twitter ||
            speaker.socialMedia.facebook) && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="mb-6 text-xl font-bold text-brand-black">
                Connect with {speaker.name.split(" ")[0]}
              </h3>
              <div className="flex items-center gap-4">
                {speaker.socialMedia.linkedin && (
                  <a
                    href={speaker.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} LinkedIn profile`}
                  >
                    <svg
                      className="h-7 w-7 text-brand-red transition-colors hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {speaker.socialMedia.twitter && (
                  <a
                    href={speaker.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} Twitter profile`}
                  >
                    <svg
                      className="h-7 w-7 text-brand-red transition-colors hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {speaker.socialMedia.facebook && (
                  <a
                    href={speaker.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} Facebook profile`}
                  >
                    <svg
                      className="h-7 w-7 text-brand-red transition-colors hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-red to-brand-dark-red p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Join us at ICTAM AGM 2025
            </h3>
            <p className="mb-6 text-lg text-white/90">
              Don&apos;t miss {speaker.name.split(" ")[0]}&apos;s keynote on AI
              for Sustainable Development
            </p>
            <Link
              to="/"
              hash="register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-red shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
