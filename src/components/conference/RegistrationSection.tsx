import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ConferenceBadge } from "@/components/ui/conference-badge"
import { GradientBlur } from "@/components/ui/gradient-blur"
import { PageTitle } from "@/components/ui/page-title"
import { SolidCard } from "@/components/ui/solid-card"
import { Subtitle } from "@/components/ui/subtitle"
import { TransparentCard } from "@/components/ui/transparent-card"

interface TicketType {
  name: string
  price: string
  description: string
  variant?: "featured"
}

const ticketTypes: TicketType[] = [
  {
    name: "Standard",
    price: "MK 120,000",
    description: "3 days • In-person",
  },
  {
    name: "Early Bird",
    price: "MK 95,000",
    description: "Until 30 April",
    variant: "featured",
  },
  {
    name: "Virtual",
    price: "MK 40,000",
    description: "Stream + Recordings",
  },
]

export function RegistrationSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organisation: "",
    passType: "Early Bird (In-person)",
    country: "",
    focusAreas: "",
    newsletter: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <section id="register" className="relative bg-white">
      <GradientBlur
        variant="purple-red"
        size="2xl"
        position="center"
        className="-top-24 opacity-70"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <div>
            <ConferenceBadge variant="outline-red" size="xs">
              Registration
            </ConferenceBadge>
            <PageTitle size="md" className="mt-2">
              Pick Your Pass
            </PageTitle>
            <Subtitle size="md" className="mt-2 max-w-sm">
              Register now. Limited capacity.
            </Subtitle>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {ticketTypes.map((ticket, index) => (
                <SolidCard
                  key={ticket.name}
                  variant={ticket.variant === "featured" ? "dark" : "default"}
                  padding="md"
                  className="relative"
                >
                  <GradientBlur
                    variant={ticket.variant === "featured" ? "purple-red-strong" : "purple-subtle"}
                    size={ticket.variant === "featured" ? "xl" : "lg"}
                    position={
                      ticket.variant === "featured"
                        ? "bottom-right-far"
                        : index === 0
                          ? "top-right"
                          : "bottom-left"
                    }
                  />
                  <ConferenceBadge
                    variant={ticket.variant === "featured" ? "outline-red" : "outline"}
                    size="xs"
                    className="relative"
                  >
                    {ticket.name}
                  </ConferenceBadge>
                  <p
                    className={`relative mt-2 text-xl font-semibold tracking-tight ${
                      ticket.variant === "featured"
                        ? "text-white"
                        : "text-brand-black"
                    }`}
                  >
                    {ticket.price}
                  </p>
                  <Subtitle
                    size="sm"
                    variant={ticket.variant === "featured" ? "white-muted" : "muted"}
                    className="relative mt-1"
                  >
                    {ticket.description}
                  </Subtitle>
                </SolidCard>
              ))}
            </div>
          </div>

          {/* Form */}
          <TransparentCard variant="default" padding="lg" className="relative">
            <GradientBlur
              variant="purple-red"
              size="xl"
              className="-right-8 -top-10"
            />
            <p className="relative text-sm font-semibold tracking-tight text-brand-black">
              Reserve Your Seat
            </p>
            <Subtitle size="md" className="relative mt-1">
              Quick form. We&apos;ll email payment details.
            </Subtitle>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-medium tracking-tight text-neutral-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-neutral-200 bg-white/80 px-3 py-2 text-[13px] text-brand-black placeholder:text-slate-400 backdrop-blur focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-medium tracking-tight text-neutral-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-neutral-200 bg-white/80 px-3 py-2 text-[13px] text-brand-black placeholder:text-slate-400 backdrop-blur focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium tracking-tight text-neutral-700">
                    Organisation
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-neutral-200 bg-white/80 px-3 py-2 text-[13px] text-brand-black placeholder:text-slate-400 backdrop-blur focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                    placeholder="Company or institution"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-medium tracking-tight text-neutral-700">
                    Pass Type
                  </label>
                  <select
                    name="passType"
                    value={formData.passType}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-neutral-200 bg-white/80 px-3 py-2 text-[13px] text-brand-black backdrop-blur focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  >
                    <option>Early Bird (In-person)</option>
                    <option>Standard (In-person)</option>
                    <option>Virtual Pass</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium tracking-tight text-neutral-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-neutral-200 bg-white/80 px-3 py-2 text-[13px] text-brand-black placeholder:text-slate-400 backdrop-blur focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                    placeholder="e.g. Malawi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-tight text-neutral-700">
                  Focus Areas
                </label>
                <textarea
                  name="focusAreas"
                  value={formData.focusAreas}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-neutral-200 bg-white/80 px-3 py-2 text-[13px] text-brand-black placeholder:text-slate-400 backdrop-blur focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  placeholder="AgriTech, Health, FinTech, policy, research..."
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border border-neutral-300 text-brand-red focus:ring-1 focus:ring-brand-red"
                />
                <p className="text-[11px] text-neutral-600">
                  Get updates about ICTAM events.
                </p>
              </div>

              <Button
                type="submit"
                variant="conference"
                size="sm"
                className="relative mt-2 w-full"
              >
                Submit Registration
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
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </Button>
            </form>
          </TransparentCard>
        </div>
      </div>
    </section>
  )
}
