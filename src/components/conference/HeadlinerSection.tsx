export function HeadlinerSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f1e35] to-[#0a1628]">
      {/* Full-width top bar */}
      <div className="relative z-10 w-full bg-brand-red py-4 lg:py-6">
        <h2 className="text-center font-heading text-2xl font-black uppercase tracking-wide text-white md:text-3xl lg:text-4xl">
          GUEST OF HONOR
        </h2>
      </div>

      {/* Main content container */}
      <div className="relative min-h-[650px] w-full lg:h-[850px]">
        {/* MOBILE/TABLET: Dr. Ansah as background image */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center lg:hidden">
          {/* Subtle purple gradient behind her */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="mb-20 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-pink-500/20 blur-[80px]" />
          </div>

          <img
            src="/images/speakers/ansah.png"
            alt=""
            aria-hidden="true"
            className="h-auto w-full max-w-[400px] object-contain object-bottom drop-shadow-2xl md:max-w-[500px]"
          />
        </div>

        {/* ICTAM Circle Pattern Background - Only the huge circles - DESKTOP ONLY */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {/* Huge ICTAM circle - left side */}
          <div className="absolute -left-[500px] top-1/2 h-[1400px] w-[1400px] -translate-y-1/2 opacity-[0.08]">
            <img
              src="/logos/brand/ictam-icon.svg"
              alt=""
              aria-hidden="true"
              className="h-full w-full"
              style={{
                filter: "brightness(0) saturate(100%) invert(27%) sepia(94%) saturate(3456%) hue-rotate(338deg) brightness(91%) contrast(92%)"
              }}
            />
          </div>

          {/* Huge ICTAM circle - right side */}
          <div className="absolute -right-[500px] top-1/2 h-[1400px] w-[1400px] -translate-y-1/2 opacity-[0.06]">
            <img
              src="/logos/brand/ictam-icon.svg"
              alt=""
              aria-hidden="true"
              className="h-full w-full"
              style={{
                filter: "brightness(0) saturate(100%) invert(35%) sepia(78%) saturate(2476%) hue-rotate(338deg) brightness(91%) contrast(92%)"
              }}
            />
          </div>
        </div>

        {/* Content container with max-width */}
        <div className="relative mx-auto h-full max-w-[1600px] px-6 lg:px-8">
          {/* Mobile: Stacked layout | Desktop: Three column grid */}
          <div className="relative flex h-full flex-col lg:grid lg:grid-cols-12 lg:gap-4">

            {/* MOBILE ONLY: Name and title header above image */}
            <div className="flex flex-col gap-4 pb-6 pt-8 lg:hidden">
              {/* Name - compact mobile version */}
              <div className="text-center">
                <h3 className="font-heading uppercase leading-tight tracking-tight">
                  <span className="block text-sm font-bold text-white">
                    THE RIGHT HONORABLE
                  </span>
                  <span className="block text-2xl font-black text-brand-red">
                    DR. JANE MAYEMU
                    <br />
                    ANSAH SC.
                  </span>
                  <span className="block text-lg font-black text-brand-red">(RETIRED)</span>
                </h3>
              </div>

              {/* Title - compact mobile version */}
              <div className="text-center">
                <h3 className="font-heading text-xl font-black uppercase leading-tight tracking-tight text-white">
                  VICE PRESIDENT
                  <br />
                  <span className="text-cyan-400">OF THE REPUBLIC OF MALAWI</span>
                </h3>
              </div>

              {/* Malawi flag stripes - centered on mobile */}
              <div className="flex justify-center gap-2">
                <div className="h-2 w-12 bg-black" />
                <div className="h-2 w-12 bg-red-600" />
                <div className="h-2 w-12 bg-green-600" />
              </div>
            </div>

            {/* DESKTOP ONLY: Left side text content - takes 3 columns */}
            <div className="col-span-3 hidden space-y-4 self-end pb-16 lg:block">
              {/* Full credentials - LARGER text */}
              <div>
                <h3 className="font-heading uppercase leading-[0.9] tracking-tight">
                  <span className="block text-3xl font-bold text-white">
                    THE RIGHT
                    <br />
                    HONORABLE
                  </span>
                  <span className="block text-5xl font-black text-brand-red xl:text-6xl">
                    DR. JANE
                    <br />
                    MAYEMU
                    <br />
                    ANSAH SC.
                  </span>
                  <span className="block text-4xl font-black text-brand-red">(RETIRED)</span>
                </h3>
              </div>

              {/* Malawi flag stripes */}
              <div className="mt-4 flex gap-2">
                <div className="h-3 w-16 bg-black" />
                <div className="h-3 w-16 bg-red-600" />
                <div className="h-3 w-16 bg-green-600" />
              </div>
            </div>

            {/* DESKTOP ONLY: Center - Dr. Ansah's image - 6 columns */}
            <div className="relative col-span-6 hidden flex-1 items-end justify-center self-end lg:flex">
              {/* Subtle purple gradient behind her */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[700px] w-[700px] rounded-full bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-pink-500/20 blur-[150px]" />
              </div>

              <img
                src="/images/speakers/ansah.png"
                alt="Dr. Jane Ansah - Vice President of the Republic of Malawi"
                className="relative z-10 h-auto w-full max-w-[1000px] object-contain object-bottom drop-shadow-2xl"
                style={{ maxHeight: '100%' }}
              />

              {/* Event logo badge at bottom-right of image */}
              <div className="absolute bottom-12 right-12 rounded-2xl border-4 border-[#0a1628] bg-white p-4 shadow-2xl shadow-brand-red/40">
                <img
                  src="/logos/brand/ictam-icon.svg"
                  alt="ICTAM"
                  className="h-16 w-16"
                />
              </div>
            </div>

            {/* DESKTOP ONLY: Right side title - takes 3 columns */}
            <div className="col-span-3 hidden space-y-6 self-end pb-16 text-right lg:block">
              {/* Title */}
              <div>
                <h3 className="font-heading text-4xl font-black uppercase leading-[0.9] tracking-tight text-white xl:text-5xl">
                  VICE
                  <br />
                  PRESIDENT
                  <br />
                  <span className="text-cyan-400">OF THE</span>
                  <br />
                  <span className="text-cyan-400">REPUBLIC</span>
                  <br />
                  <span className="text-cyan-400">OF MALAWI</span>
                </h3>
              </div>

              {/* Conference logo/badge */}
              <div className="pt-6">
                <div className="ml-auto w-fit rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <p className="font-heading text-xl font-black uppercase tracking-tight text-white">
                    ICTAM
                  </p>
                  <p className="font-accent text-xs font-bold uppercase tracking-wide text-brand-red">
                    AGM 2025
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
