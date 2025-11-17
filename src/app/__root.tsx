import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"

import { NotFoundPage } from "@/components/conference/NotFoundPage"

import "unfonts.css"
import "./globals.css"

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function ScrollToTop() {
  const router = useRouterState()

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!router.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [router.location.pathname, router.location.hash])

  return null
}

export default function RootLayout() {
  return (
    <div className="min-h-dvh w-full">
      <ScrollToTop />
      <Outlet />
    </div>
  )
}
