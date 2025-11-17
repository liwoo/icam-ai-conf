import { createFileRoute } from "@tanstack/react-router"

import { AgendaSection } from "@/components/conference/AgendaSection"
import { ContactSection } from "@/components/conference/ContactSection"
import { CTASection } from "@/components/conference/CTASection"
import { HeroSection } from "@/components/conference/HeroSection"
import { SpeakersSection } from "@/components/conference/SpeakersSection"
import { SponsorSection } from "@/components/conference/SponsorSection"
import { Seo } from "@/components/layout/seo"

export const Route = createFileRoute("/_base/")({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Seo
        title="ICTAM AGM 2025 – AI For Sustainable Development"
        description="Join us for the ICTAM AGM 2025 conference on AI for Sustainable Development in Lilongwe, Malawi. June 10-12, 2025."
      />

      <HeroSection />
      <SpeakersSection />
      <SponsorSection />
      <CTASection />
      <AgendaSection />
      <ContactSection />
    </>
  )
}
