import { createFileRoute, Outlet } from "@tanstack/react-router"

import { ConferenceFooter } from "@/components/conference/ConferenceFooter"
import { ConferenceHeader } from "@/components/conference/ConferenceHeader"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export const Route = createFileRoute("/_base")({
  component: BaseLayout,
})

function BaseLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <ConferenceHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <ConferenceFooter />
      <ScrollToTop />
    </div>
  )
}
