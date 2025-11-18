import { useState, useEffect } from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { PageTitle } from "@/components/ui/page-title"
import { Subtitle } from "@/components/ui/subtitle"
import { ConferenceBadge } from "@/components/ui/conference-badge"
import { SolidCard } from "@/components/ui/solid-card"
import { IconContainer } from "@/components/ui/icon-container"
import { TransparentCard } from "@/components/ui/transparent-card"
import programmeData from "@/data/programme.json"

interface Session {
  time: string
  title: string
  type: string
  speaker?: string
  speakerTitle?: string
  venue?: string
  dressCode?: string
  entertainment?: string
  agenda?: string[]
  activities?: Array<{
    time: string
    activity: string
    categories?: Array<{ category: string; awards: string[] }>
    sponsors?: string[]
  }>
}

interface DaySchedule {
  day: string
  dayNumber?: number
  subtitle?: string
  sessions: Session[]
}

const sessionTypeConfig: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  registration: {
    label: "Registration",
    color: "bg-neutral-500",
    icon: "clipboard",
  },
  training: { label: "Training", color: "bg-blue-500", icon: "academic" },
  administrative: {
    label: "Administrative",
    color: "bg-neutral-600",
    icon: "check",
  },
  ceremony: { label: "Ceremony", color: "bg-brand-dark-red", icon: "star" },
  speech: { label: "Speech", color: "bg-brand-red-dark", icon: "mic" },
  presentation: {
    label: "Presentation",
    color: "bg-brand-red",
    icon: "presentation",
  },
  keynote: { label: "Keynote", color: "bg-brand-red", icon: "keynote" },
  sponsor: { label: "Sponsor", color: "bg-neutral-700", icon: "sponsor" },
  pitching: { label: "Pitching", color: "bg-brand-red-dark", icon: "lightbulb" },
  break: { label: "Break", color: "bg-neutral-400", icon: "coffee" },
  networking: {
    label: "Networking",
    color: "bg-brand-dark-red",
    icon: "users",
  },
  dinner: { label: "Dinner", color: "bg-brand-black", icon: "dinner" },
  panel: { label: "Panel", color: "bg-brand-red", icon: "panel" },
  awards: { label: "Awards", color: "bg-brand-red", icon: "trophy" },
  agm: { label: "AGM", color: "bg-brand-dark-red", icon: "meeting" },
}

export function DetailedAgendaSection() {
  const navigate = useNavigate()
  const searchParams = useSearch({ from: "/_base/programme/" })
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedDay, setSelectedDay] = useState<number | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const schedule = programmeData.schedule as DaySchedule[]

  // Helper function to format day labels
  const formatDayLabel = (dayString: string): string => {
    // Input: "Tuesday, 18 November 2025"
    // Output: "Tue, 18 Nov"
    const parts = dayString.split(", ")
    if (parts.length < 2) return dayString

    const dayOfWeek = parts[0]?.substring(0, 3) // "Tue"
    const dateMonth = parts[1]?.split(" ")
    if (!dateMonth || dateMonth.length < 2) return dayString

    const day = dateMonth[0] // "18"
    const month = dateMonth[1]?.substring(0, 3) // "Nov"

    return `${dayOfWeek}, ${day} ${month}`
  }

  // Initialize search from URL parameter
  useEffect(() => {
    const urlSearch = (searchParams as { s?: string })?.s
    if (urlSearch) {
      setSearchQuery(decodeURIComponent(urlSearch))
    }
  }, [searchParams])

  // Update URL when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      navigate({
        to: "/programme",
        search: { s: value.trim() },
        replace: true,
      })
    } else {
      navigate({
        to: "/programme",
        search: {},
        replace: true,
      })
    }
  }

  // Get unique session types for filter
  const sessionTypes = Array.from(
    new Set(
      schedule.flatMap((day) => day.sessions.map((session) => session.type))
    )
  )

  // Toggle filter selection
  const toggleFilter = (type: string) => {
    setSelectedFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters([])
    setSearchQuery("")
    navigate({
      to: "/programme",
      search: {},
      replace: true,
    })
  }

  // Filter schedule by selected day, session types, and search query
  const filteredSchedule = schedule
    .filter((day, index) => {
      // Filter by day
      if (selectedDay === "all") return true
      return index === selectedDay
    })
    .map((day) => ({
      ...day,
      sessions: day.sessions
        .filter((session) => {
          // Filter by session type
          if (selectedFilters.length > 0 && !selectedFilters.includes(session.type)) {
            return false
          }
          // Filter by search query
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            const searchableText = `${session.title} ${session.speaker || ""} ${session.type} ${session.venue || ""}`.toLowerCase()
            return searchableText.includes(query)
          }
          return true
        }),
    }))
    .filter((day) => day.sessions.length > 0) // Remove days with no sessions after filtering

  const getSessionIcon = (type: string) => {
    const config = sessionTypeConfig[type]
    if (!config) return null

    const icons: Record<string, React.ReactElement> = {
      clipboard: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      academic: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      check: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      star: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      mic: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      presentation: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      keynote: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      sponsor: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      lightbulb: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      coffee: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      users: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      dinner: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      panel: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      trophy: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      meeting: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    }

    return icons[config.icon] ?? icons.presentation
  }

  return (
    <section id="detailed-agenda" className="relative bg-white">
      {/* Full-width banner for title */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark-red via-brand-black to-black py-16">
        {/* Decorative background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <ConferenceBadge variant="gradient" size="md" className="mb-4 bg-gradient-to-r from-brand-red to-pink-600">
            Complete Schedule
          </ConferenceBadge>
          <PageTitle size="xl" align="center" className="text-white">
            Detailed Programme
          </PageTitle>
          <Subtitle size="lg" className="mx-auto mt-4 max-w-3xl text-white/90" align="center">
            {programmeData.event}
          </Subtitle>
          <div className="mt-4 flex flex-col items-center gap-2 text-white/90">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-semibold">{programmeData.dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
              <span className="font-semibold">{programmeData.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative mx-auto max-w-7xl px-6 py-12">

        {/* Search Input */}
        <div className="mb-8 mx-auto max-w-2xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search sessions, speakers, venues..."
              className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-12 pr-12 text-brand-black shadow-sm transition-all focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/20"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 hover:text-brand-red transition-colors"
                aria-label="Clear search"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-neutral-600">
              Filtering results for &quot;{searchQuery}&quot;
            </p>
          )}
        </div>

        {/* Day Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedDay("all")}
            className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
              selectedDay === "all"
                ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            All Days
          </button>
          {schedule.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                selectedDay === index
                  ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {formatDayLabel(day.day)}
            </button>
          ))}
        </div>

        {/* Main Content: Sidebar + Schedule */}
        <div className="flex gap-8">
          {/* Sidebar - Filters */}
          <aside className="hidden w-72 flex-shrink-0 lg:block">
            <TransparentCard variant="glass" padding="lg" className="sticky top-24">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-brand-black">
                  Filter by Type
                </h3>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-brand-red hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {sessionTypes.map((type) => {
                  const config = sessionTypeConfig[type]
                  if (!config) return null
                  const isChecked = selectedFilters.includes(type)
                  return (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFilter(type)}
                        className="h-4 w-4 rounded border-neutral-300 text-brand-red focus:ring-2 focus:ring-brand-red focus:ring-offset-0"
                      />
                      <span className="flex-1 text-sm font-medium text-brand-black">
                        {config.label}
                      </span>
                      {isChecked && (
                        <ConferenceBadge variant="gradient" size="xs">
                          ✓
                        </ConferenceBadge>
                      )}
                    </label>
                  )
                })}
              </div>
            </TransparentCard>
          </aside>

          {/* Schedule */}
          <div className="flex-1 space-y-12">
          {filteredSchedule.map((day, dayIndex) => {
            // Skip days with no sessions after filtering
            if (day.sessions.length === 0) return null

            return (
              <div key={dayIndex}>
                {/* Day Header */}
                <SolidCard variant="gradient" padding="lg" className="mb-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {day.day}
                      </h3>
                      {day.subtitle && (
                        <p className="mt-1 text-sm text-white/80">
                          {day.subtitle}
                        </p>
                      )}
                    </div>
                    {day.dayNumber && (
                      <ConferenceBadge variant="light-on-dark" size="lg">
                        Day {day.dayNumber}
                      </ConferenceBadge>
                    )}
                  </div>
                </SolidCard>

                {/* Sessions */}
                <div className="space-y-4">
                  {day.sessions.map((session, sessionIndex) => {
                    const config = sessionTypeConfig[session.type]
                    return (
                      <SolidCard
                        key={sessionIndex}
                        variant="default"
                        padding="lg"
                        hover="lift"
                        className="border-l-4 border-brand-red"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                          {/* Time */}
                          <div className="flex-shrink-0">
                            <div className="flex items-center gap-3">
                              <IconContainer
                                variant="red-shadow"
                                size="lg"
                                shape="lg"
                              >
                                {getSessionIcon(session.type)}
                              </IconContainer>
                              <div>
                                <div className="font-accent text-xl font-bold text-brand-black">
                                  {session.time}
                                </div>
                                {config && (
                                  <ConferenceBadge
                                    variant="dark-on-light"
                                    size="xs"
                                    className="mt-1"
                                  >
                                    {config.label}
                                  </ConferenceBadge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="text-lg font-bold leading-snug text-brand-black">
                              {session.title}
                            </h4>
                            {session.speaker && (
                              <div className="mt-3 rounded-lg bg-neutral-50 p-3">
                                <div className="flex items-start gap-2">
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                  <div>
                                    <p className="font-semibold text-brand-black">
                                      {session.speaker}
                                    </p>
                                    {session.speakerTitle && (
                                      <p className="text-sm text-neutral-600">
                                        {session.speakerTitle}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                            {session.venue && (
                              <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                                <svg
                                  className="h-4 w-4 text-brand-red"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                </svg>
                                <span>Venue: {session.venue}</span>
                              </div>
                            )}
                            {session.dressCode && (
                              <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                                <svg
                                  className="h-4 w-4 text-brand-red"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                  />
                                </svg>
                                <span>Dress Code: {session.dressCode}</span>
                              </div>
                            )}
                            {session.agenda && session.agenda.length > 0 && (
                              <div className="mt-4">
                                <p className="mb-2 text-sm font-semibold text-brand-black">
                                  Agenda Items:
                                </p>
                                <ul className="space-y-1 text-sm text-neutral-700">
                                  {session.agenda.map((item, idx) => (
                                    <li key={idx} className="flex gap-2">
                                      <span className="text-brand-red">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </SolidCard>
                    )
                  })}
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
