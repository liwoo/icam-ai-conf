import { Link } from "@tanstack/react-router"

import sponsorData from "@/data/logos.json"

interface Sponsor {
  id: string
  name: string
  fullName: string
  logo: string
  tier: "platinum" | "gold" | "silver"
  category: string
  description: string
}

const sponsors = sponsorData.sponsorLogos as Sponsor[]

const tierConfig = {
  platinum: {
    label: "Platinum Sponsors",
    color: "from-slate-600 to-gray-400",
    size: "h-32 md:h-40",
    gridCols: "grid-cols-1 md:grid-cols-2",
    maxWidth: 200,
    maxHeight: 80,
  },
  gold: {
    label: "Gold Sponsors",
    color: "from-amber-700 to-amber-400",
    size: "h-28 md:h-32",
    gridCols: "grid-cols-2 md:grid-cols-2",
    maxWidth: 160,
    maxHeight: 65,
  },
  silver: {
    label: "Silver Sponsors",
    color: "from-gray-300 to-gray-500",
    size: "h-24 md:h-28",
    gridCols: "grid-cols-2 md:grid-cols-3",
    maxWidth: 140,
    maxHeight: 55,
  },
}

export function SponsorSection() {
  const platinumSponsors = sponsors.filter((s) => s.tier === "platinum")
  const goldSponsors = sponsors.filter((s) => s.tier === "gold")
  const silverSponsors = sponsors.filter((s) => s.tier === "silver")

  const renderSponsorGrid = (
    sponsorList: Sponsor[],
    tier: "platinum" | "gold" | "silver",
  ) => {
    const config = tierConfig[tier]

    return (
      <div className="mb-12">
        <h3 className="mb-6 text-center text-lg font-bold uppercase tracking-wide text-neutral-700">
          {config.label}
        </h3>
        <div className={`grid gap-6 ${config.gridCols}`}>
          {sponsorList.map((sponsor) => (
            <Link
              key={sponsor.id}
              to="/sponsors/$sponsorId"
              params={{ sponsorId: sponsor.id }}
              title={sponsor.fullName}
              className={`relative overflow-hidden group rounded-2xl bg-gradient-to-br ${config.color} p-px shadow-sm transition-all hover:scale-105 hover:shadow-md`}
            >
              <div
                className={`flex ${config.size} items-center justify-center rounded-[15px] bg-gradient-to-br from-red-950 to-black p-6`}
              >
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.fullName} logo`}
                  className="h-auto w-auto scale-150 object-contain"
                  style={{
                    maxWidth: `${config.maxWidth}px`,
                    maxHeight: `${config.maxHeight}px`,
                  }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 -translate-x-full transform bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] transition-transform duration-1000 group-hover:translate-x-full"></div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section
      id="sponsors"
      className="bg-gradient-to-b from-slate-50 to-white py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-red">
            Trusted Partners
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-brand-black md:text-5xl">
            Our Sponsors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            We&apos;re grateful to our sponsors who make this conference
            possible and support AI innovation in Africa.
          </p>
        </div>

        {renderSponsorGrid(platinumSponsors, "platinum")}
        {renderSponsorGrid(goldSponsors, "gold")}
        {renderSponsorGrid(silverSponsors, "silver")}

        <div className="mt-12 text-center">
          <p className="mb-4 text-sm font-semibold text-neutral-700">
            Interested in becoming a sponsor?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-300 bg-white px-6 py-3 text-sm font-bold uppercase tracking-tight text-neutral-700 transition-all hover:border-brand-red hover:text-brand-red-dark"
          >
            Contact Us
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
