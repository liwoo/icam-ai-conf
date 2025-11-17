import { Badge } from "@/components/ui/badge"
import { GradientBlur } from "@/components/ui/gradient-blur"
import { PageTitle } from "@/components/ui/page-title"
import conferenceData from "@/data/conference.json"

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

        {/* First row: 3 speakers */}
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {speakers.slice(0, 3).map((speaker) => (
            <div key={speaker.name} className="flex flex-col items-center">
              {/* Speaker Avatar with Thicker Red Gradient Border */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-dark-red p-2">
                  <div className="h-full w-full rounded-full bg-white"></div>
                </div>
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-[6px] border-brand-red shadow-2xl shadow-brand-red/20">
                  <img
                    src={speaker.image}
                    alt={`${speaker.name} portrait`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Speaker Name */}
              <h3 className="mb-3 text-center text-2xl font-bold text-brand-black">
                {speaker.name}
              </h3>

              {/* Speaker Title in Badge */}
              <Badge className="mb-4 bg-gradient-to-r from-brand-red to-brand-red-dark px-4 py-1.5 text-center text-xs font-medium text-white hover:from-brand-red-dark hover:to-brand-dark-red">
                {speaker.title}
              </Badge>

              {/* Topic with Quotation Mark Background */}
              <div className="relative mb-6 w-full px-8">
                <div className="absolute left-0 top-0 -z-10 text-8xl font-bold leading-none text-brand-red/10">
                  &ldquo;
                </div>
                <p className="relative text-center text-sm font-semibold leading-relaxed text-brand-red">
                  {speaker.topic}
                </p>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center justify-center gap-4">
                {speaker.socialMedia.linkedin && (
                  <a
                    href={speaker.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} LinkedIn profile`}
                  >
                    <svg
                      className="h-5 w-5 text-brand-red transition-colors group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {speaker.socialMedia.twitter && (
                  <a
                    href={speaker.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} Twitter profile`}
                  >
                    <svg
                      className="h-5 w-5 text-brand-red transition-colors group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {speaker.socialMedia.facebook && (
                  <a
                    href={speaker.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} Facebook profile`}
                  >
                    <svg
                      className="h-5 w-5 text-brand-red transition-colors group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Second row: 2 speakers centered */}
        <div className="grid gap-12 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {speakers.slice(3, 5).map((speaker) => (
            <div key={speaker.name} className="flex flex-col items-center">
              {/* Speaker Avatar with Thicker Red Gradient Border */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-dark-red p-2">
                  <div className="h-full w-full rounded-full bg-white"></div>
                </div>
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-[6px] border-brand-red shadow-2xl shadow-brand-red/20">
                  <img
                    src={speaker.image}
                    alt={`${speaker.name} portrait`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Speaker Name */}
              <h3 className="mb-3 text-center text-2xl font-bold text-brand-black">
                {speaker.name}
              </h3>

              {/* Speaker Title in Badge */}
              <Badge className="mb-4 bg-gradient-to-r from-brand-red to-brand-red-dark px-4 py-1.5 text-center text-xs font-medium text-white hover:from-brand-red-dark hover:to-brand-dark-red">
                {speaker.title}
              </Badge>

              {/* Topic with Quotation Mark Background */}
              <div className="relative mb-6 w-full px-8">
                <div className="absolute left-0 top-0 -z-10 text-8xl font-bold leading-none text-brand-red/10">
                  &ldquo;
                </div>
                <p className="relative text-center text-sm font-semibold leading-relaxed text-brand-red">
                  {speaker.topic}
                </p>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center justify-center gap-4">
                {speaker.socialMedia.linkedin && (
                  <a
                    href={speaker.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} LinkedIn profile`}
                  >
                    <svg
                      className="h-5 w-5 text-brand-red transition-colors group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {speaker.socialMedia.twitter && (
                  <a
                    href={speaker.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} Twitter profile`}
                  >
                    <svg
                      className="h-5 w-5 text-brand-red transition-colors group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {speaker.socialMedia.facebook && (
                  <a
                    href={speaker.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/10 to-brand-red/5 transition-all hover:from-brand-red hover:to-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30"
                    aria-label={`${speaker.name} Facebook profile`}
                  >
                    <svg
                      className="h-5 w-5 text-brand-red transition-colors group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
