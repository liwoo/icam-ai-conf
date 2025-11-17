import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { ConferenceBadge } from "@/components/ui/conference-badge"
import { GradientBlur } from "@/components/ui/gradient-blur"
import { PageTitle } from "@/components/ui/page-title"
import { SolidCard } from "@/components/ui/solid-card"
import { Subtitle } from "@/components/ui/subtitle"

interface AgendaDay {
  day: string
  tag: string
  topics: string[]
  variant?: "dark"
}

const agendaDays: AgendaDay[] = [
  {
    day: "Day 01",
    tag: "21 Nov",
    topics: [
      "Opening Ceremonies",
      "AI & Digital Innovation Keynotes",
      "Innovation Pitching Sessions",
      "Opening Dinner",
    ],
  },
  {
    day: "Day 02",
    tag: "22 Nov",
    topics: [
      "Panel Discussions",
      "Award Presentations",
      "Annual General Meeting",
      "Awards Gala Dinner",
    ],
  },
  {
    day: "Pre-Event",
    tag: "19-20 Nov",
    topics: [
      "Trainings",
      "Participant Registration",
      "Material Collection",
    ],
  },
  {
    day: "Activities",
    tag: "Networking",
    topics: [
      "Cultural Performances",
      "Beach Events",
      "Networking Sessions",
    ],
    variant: "dark",
  },
]

export function AgendaSection() {
  return (
    <section id="agenda" className="relative bg-white">
      {/* Subtle purple-to-red gradient background */}
      <GradientBlur
        variant="purple-subtle"
        size="2xl"
        position="center"
        className="-top-32 opacity-70"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <ConferenceBadge variant="outline-red" size="xs">
              19-22 November 2025
            </ConferenceBadge>
            <PageTitle size="md" className="mt-2">
              Event Program
            </PageTitle>
            <Subtitle size="md" className="mt-2 max-w-sm">
              AGM. Innovation Awards. Networking.
            </Subtitle>
          </div>
          <Link to="/programme">
            <Button variant="conference-outline" size="sm">
              View Full Programme
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {agendaDays.map((agenda, index) => (
            <SolidCard
              key={agenda.day}
              variant={agenda.variant === "dark" ? "dark" : "default"}
              padding="xl"
              className="relative"
            >
              <GradientBlur
                variant={agenda.variant === "dark" ? "dark-red" : "purple-subtle"}
                size="lg"
                className={
                  index % 3 === 0
                    ? "-right-10 -top-8"
                    : index % 3 === 1
                      ? "-bottom-10 -left-10"
                      : "-left-10 -top-10"
                }
              />
              <div className="relative flex items-center justify-between pb-2">
                <ConferenceBadge
                  variant={agenda.variant === "dark" ? "outline-red" : "outline-red"}
                  size="xs"
                >
                  {agenda.day}
                </ConferenceBadge>
                <ConferenceBadge
                  variant={
                    agenda.variant === "dark" ? "light-on-dark" : "dark-on-light"
                  }
                  size="xs"
                >
                  {agenda.tag}
                </ConferenceBadge>
              </div>
              <ul
                className={`relative mt-8 space-y-4 text-base ${
                  agenda.variant === "dark" ? "text-white" : "text-brand-black"
                }`}
              >
                {agenda.topics.map((topic) => (
                  <li key={topic} className="font-medium leading-loose">
                    {topic}
                  </li>
                ))}
              </ul>
            </SolidCard>
          ))}
        </div>
      </div>
    </section>
  )
}
