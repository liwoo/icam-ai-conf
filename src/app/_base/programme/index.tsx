import { createFileRoute } from "@tanstack/react-router"

import { DetailedAgendaSection } from "@/components/conference/DetailedAgendaSection"
import { Seo } from "@/components/layout/seo"

export const Route = createFileRoute("/_base/programme/")({
  component: ProgrammePage,
})

function ProgrammePage() {
  return (
    <>
      <Seo
        title="Programme – ICTAM AGM 2025"
        description="Detailed programme for the ICTAM AGM 2025 and Innovation Awards. View the complete schedule, speakers, and session information."
      />

      <DetailedAgendaSection />
    </>
  )
}
