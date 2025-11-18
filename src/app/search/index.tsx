"use client"

import { useState, useMemo } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import conferenceData from "@/data/conference.json"
import linksData from "@/data/links.json"
import programmeData from "@/data/programme.json"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export const Route = createFileRoute("/search/")({
  component: SearchPage,
})

interface SearchResult {
  type: "speaker" | "sponsor" | "session" | "link" | "day"
  title: string
  description: string
  link: string
  category?: string
  slug?: string
}

// Helper function to create URL-friendly slugs
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const allSearchableData: SearchResult[] = useMemo(() => {
    const results: SearchResult[] = []

    // Add speakers
    if (conferenceData.speakers && Array.isArray(conferenceData.speakers)) {
      conferenceData.speakers.forEach((speaker) => {
        const slug = createSlug(speaker.name)
        results.push({
          type: "speaker",
          title: speaker.name,
          description: speaker.title,
          link: `/speakers/${slug}`,
          category: speaker.topic,
          slug,
        })
      })
    }

    // Add sponsors (if exists)
    if (conferenceData.sponsors && Array.isArray(conferenceData.sponsors)) {
      conferenceData.sponsors.forEach((sponsor) => {
        const slug = createSlug(sponsor.name)
        results.push({
          type: "sponsor",
          title: sponsor.name,
          description: `${sponsor.tier} Sponsor`,
          link: `/sponsors/${slug}`,
          category: sponsor.tier,
          slug,
        })
      })
    }

    // Add programme sessions
    if (programmeData.schedule && Array.isArray(programmeData.schedule)) {
      programmeData.schedule.forEach((day) => {
        if (day.sessions && Array.isArray(day.sessions)) {
          day.sessions.forEach((session) => {
            results.push({
              type: "session",
              title: session.title,
              description: `${session.time} - ${day.day}${session.speaker ? ` by ${session.speaker}` : ""}`,
              link: `/programme?s=${encodeURIComponent(session.title)}`,
              category: session.type || "Session",
            })
          })
        }
      })
    }

    // Add links
    if (linksData.links && Array.isArray(linksData.links)) {
      linksData.links.forEach((link) => {
        results.push({
          type: "link",
          title: link.title,
          description: link.description,
          link: link.url,
          category: link.category,
        })
      })
    }

    // Add days from programme
    if (programmeData.schedule && Array.isArray(programmeData.schedule)) {
      programmeData.schedule.forEach((day) => {
        results.push({
          type: "day",
          title: day.day,
          description: `${programmeData.event}`,
          link: "/programme",
          category: "Programme Day",
        })
      })
    }

    return results
  }, [])

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []

    const searchTerms = query.toLowerCase().split(" ").filter(Boolean)

    return allSearchableData.filter((item) => {
      const searchText = `${item.title} ${item.description} ${item.category || ""}`.toLowerCase()
      return searchTerms.every((term) => searchText.includes(term))
    })
  }, [query, allSearchableData])

  const handleResultClick = (link: string) => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      // External link
      window.open(link, "_blank", "noopener,noreferrer")
    } else if (link.startsWith("/#")) {
      // Navigate home and scroll to section
      navigate({ to: "/" })
      setTimeout(() => {
        const sectionId = link.split("#")[1]
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    } else {
      // Internal route (speakers, sponsors, programme with query params)
      window.location.href = link
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "speaker":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case "sponsor":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case "session":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case "link":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )
      case "day":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )
      default:
        return null
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "speaker":
        return "bg-blue-100 text-blue-800"
      case "sponsor":
        return "bg-purple-100 text-purple-800"
      case "session":
        return "bg-green-100 text-green-800"
      case "link":
        return "bg-orange-100 text-orange-800"
      case "day":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <button
            onClick={() => navigate({ to: "/" })}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-brand-red"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          <h1 className="mb-2 text-4xl font-bold text-brand-black">Search</h1>
          <p className="text-neutral-600">
            Search for speakers, sponsors, sessions, and more
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-6 w-6 text-neutral-400"
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search speakers, sponsors, sessions..."
            className="w-full rounded-xl border border-neutral-300 bg-white py-4 pl-12 pr-4 text-lg text-brand-black shadow-sm transition-all focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/20"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="mt-8">
          {query && (
            <p className="mb-4 text-sm text-neutral-600">
              Found {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""}
            </p>
          )}

          {filteredResults.length > 0 ? (
            <div className="space-y-3">
              {filteredResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.link)}
                  className="w-full rounded-xl border border-neutral-200 bg-white p-4 text-left shadow-sm transition-all hover:border-brand-red hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${getTypeBadgeColor(result.type)}`}>
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-brand-black">{result.title}</h3>
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${getTypeBadgeColor(result.type)}`}>
                          {result.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-neutral-600">{result.description}</p>
                      {result.category && (
                        <span className="mt-2 inline-block rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
                          {result.category}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-neutral-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-bold text-neutral-700">No results found</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-neutral-300"
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
              <h3 className="mt-4 text-lg font-bold text-neutral-700">Start searching</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Enter keywords to search through speakers, sponsors, sessions, and more
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
