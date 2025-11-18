import { Button } from "@/components/ui/button"
import { ConferenceBadge } from "@/components/ui/conference-badge"
import { IconContainer } from "@/components/ui/icon-container"
import { PageTitle } from "@/components/ui/page-title"
import { Subtitle } from "@/components/ui/subtitle"
import { TransparentCard } from "@/components/ui/transparent-card"

export function VenueSection() {
  return (
    <section id="venue" className="relative overflow-hidden">
      {/* Lake Malawi background image */}
      <div className="absolute inset-0">
        <img
          src="/images/lake-malawi.jpg"
          alt="Lake Malawi"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <ConferenceBadge variant="outline-red" size="xs">
              Venue &amp; Travel
            </ConferenceBadge>
            <PageTitle size="md" className="mt-2 text-white">
              Sunbird Nkopola Lodge
            </PageTitle>
            <Subtitle size="md" className="mt-2 max-w-md text-white/80">
              Lakeside resort. Modern facilities. Mangochi.
            </Subtitle>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <TransparentCard variant="default" padding="sm">
                <div className="flex items-start gap-2">
                  <IconContainer variant="outline" size="sm" shape="square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                    </svg>
                  </IconContainer>
                  <div>
                    <p className="text-[13px] font-semibold tracking-tight text-white">
                      Scenic Location
                    </p>
                    <Subtitle size="sm" weight="normal" className="mt-1 text-white/70">
                      On Lake Malawi shores.
                    </Subtitle>
                  </div>
                </div>
              </TransparentCard>
              <div className="rounded-xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-white/60 backdrop-blur">
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-brand-red"
                  >
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                    <path d="M10 6h4" />
                    <path d="M10 10h4" />
                    <path d="M10 14h4" />
                    <path d="M10 18h4" />
                  </svg>
                  <div>
                    <p className="text-[13px] font-semibold tracking-tight text-brand-black">
                      On-site Accommodation
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Resort rooms available.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-white/60 backdrop-blur">
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-brand-red"
                  >
                    <path d="M12 20h.01" />
                    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
                    <path d="M5 12.859a10 10 0 0 1 14 0" />
                    <path d="M2 8.82a15 15 0 0 1 20 0" />
                  </svg>
                  <div>
                    <p className="text-[13px] font-semibold tracking-tight text-brand-black">
                      High-Speed Wi‑Fi
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Ready for live demos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="conference-outline" size="sm" className="mt-5">
              View on Maps
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl bg-brand-black shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=80"
              alt="Conference venue exterior"
              className="h-64 w-full object-cover sm:h-72 md:h-80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
