import { useNavigate, useRouterState } from "@tanstack/react-router"

export function ConferenceHeader() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault()
    const sectionId = href.split("#")[1]

    if (pathname === "/" && sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      navigate({ to: href })
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="/#hero"
          onClick={(e) => handleNavClick(e, "/#hero")}
          className="flex items-center gap-3"
        >
          <img
            src="/logos/brand/ictam-logo-horizontal.svg"
            alt="ICTAM Logo"
            className="h-24"
          />
          {/* <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight text-brand-black">
              ICTAM
            </span>
            <span className="text-xs text-neutral-600">
              ICT Association of Malawi
            </span>
          </div> */}
        </a>

        {/* Nav */}
        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-tight text-neutral-700 lg:flex">
          <a
            href="/#hero"
            onClick={(e) => handleNavClick(e, "/#hero")}
            className="transition-colors hover:text-brand-red"
          >
            Home
          </a>
          <a
            href="/#speakers"
            onClick={(e) => handleNavClick(e, "/#speakers")}
            className="transition-colors hover:text-brand-red"
          >
            Speakers
          </a>
          <a
            href="/#sponsors"
            onClick={(e) => handleNavClick(e, "/#sponsors")}
            className="transition-colors hover:text-brand-red"
          >
            Sponsors
          </a>
          <a
            href="/#agenda"
            onClick={(e) => handleNavClick(e, "/#agenda")}
            className="transition-colors hover:text-brand-red"
          >
            Agenda
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            className="transition-colors hover:text-brand-red"
          >
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden rounded-full p-2 transition-colors hover:bg-neutral-100 lg:block"
            aria-label="Search"
          >
            <svg
              className="h-5 w-5 text-neutral-700"
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
          </button>
          <a
            href="/#register"
            onClick={(e) => handleNavClick(e, "/#register")}
            className="rounded-full bg-gradient-to-r from-brand-red to-brand-red-dark px-6 py-2.5 text-sm font-bold uppercase tracking-tight text-white shadow-lg shadow-brand-red/30 transition-all hover:shadow-xl hover:shadow-brand-red/40"
          >
            Register Now
          </a>
        </div>
      </div>
    </header>
  )
}
