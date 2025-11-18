export function ConferenceFooter() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-brand-red-dark to-brand-dark-red"
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {/* Left: Logo and Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logos/brand/ictam-logo-horizontal-white.svg"
                alt="ICTAM Logo"
                className="h-24"
              />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/80">
              Global Largest Conference Annual AI Conference
            </p>
          </div>

          {/* Center: Contact Info */}
          <div className="flex flex-col gap-4 text-white">
            <h3 className="text-lg font-bold">Contact Information</h3>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white/10 p-2">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="font-semibold">+265 884 997 346</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white/10 p-2">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-white/80">
                  info@ictam.org.mw
                </div>
              </div>
            </div>
          </div>

          {/* Right: Social and CTA */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="X (Twitter)"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <div className="text-sm text-white/70">
              <div>Filimoni House, City Centre</div>
              <div>P.O. Box 31076, Lilongwe 3</div>
            </div>
            <a
              href="#register"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-tight text-brand-dark-red shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
            >
              Get Ticket Now
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/70">
          © ICTAM 2025 All Rights Reserved
        </div>
      </div>
    </footer>
  )
}
