import { useRef, useState, useEffect, useMemo, useCallback } from "react"

interface TextSegment {
  text: string
  color?: string
}

interface AnimatedTitleProps {
  text: string | TextSegment[]
  className?: string
}

export function AnimatedTitle({ text, className = "" }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [letterPositions, setLetterPositions] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([])
  const [isHovering, setIsHovering] = useState(false)

  // Handle both string and array of segments
  const segments: TextSegment[] = useMemo(() =>
    typeof text === "string"
      ? [{ text, color: undefined }]
      : text
  , [text])

  // Split text into characters while preserving spaces and their colors
  const characters: Array<{ char: string; color?: string }> = useMemo(() => {
    const chars: Array<{ char: string; color?: string }> = []
    segments.forEach(segment => {
      segment.text.split("").forEach(char => {
        chars.push({ char, color: segment.color })
      })
    })
    return chars
  }, [segments])

  useEffect(() => {
    // Measure each letter's position after render
    if (containerRef.current) {
      const container = containerRef.current
      const letters = container.querySelectorAll(".letter")
      const containerRect = container.getBoundingClientRect()
      const positions = Array.from(letters).map((letter) => {
        const rect = letter.getBoundingClientRect()
        return {
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top,
          width: rect.width,
          height: rect.height,
        }
      })
      setLetterPositions(positions)
    }
  }, [characters])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - containerRect.left
    const mouseY = e.clientY - containerRect.top

    // Update 3D cursor position with requestAnimationFrame for smooth animation
    if (cursorRef.current) {
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.left = `${mouseX}px`
          cursorRef.current.style.top = `${mouseY}px`
        }
      })
    }

    const letters = containerRef.current.querySelectorAll<HTMLSpanElement>(".letter")

    requestAnimationFrame(() => {
      letters.forEach((letter, index) => {
        const pos = letterPositions[index]
        if (!pos) return

        // Calculate distance from mouse to letter center
        const letterCenterX = pos.x + pos.width / 2
        const letterCenterY = pos.y + pos.height / 2
        const distanceX = mouseX - letterCenterX
        const distanceY = mouseY - letterCenterY
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

        // Apply transformations based on proximity
        const maxDistance = 200 // pixels
        const proximity = Math.max(0, 1 - distance / maxDistance)

        if (proximity > 0.3) {
          // Switch to stroke-only on hover
          letter.style.webkitTextStroke = "2px white"
          letter.style.color = "transparent"
          letter.style.textShadow = `
            0 0 ${proximity * 30}px rgba(236, 72, 153, ${proximity * 0.8}),
            0 0 ${proximity * 50}px rgba(236, 72, 153, ${proximity * 0.4})
          `
        } else {
          // Reset to original color
          const originalColor = letter.getAttribute("data-color")
          letter.style.webkitTextStroke = ""
          letter.style.color = originalColor || ""
          letter.style.textShadow = ""
        }
      })
    })
  }, [letterPositions])

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (!containerRef.current) return

    const letters = containerRef.current.querySelectorAll<HTMLSpanElement>(".letter")
    letters.forEach((letter) => {
      const originalColor = letter.getAttribute("data-color")
      letter.style.webkitTextStroke = ""
      letter.style.color = originalColor || ""
      letter.style.textShadow = ""
    })
  }

  return (
    <div
      ref={containerRef}
      className={`${className} relative select-none`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        cursor: "none"
      }}
    >
      {characters.map((item, index) => (
        <span
          key={index}
          className="letter inline-block transition-all duration-200 ease-out"
          data-color={item.color}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center",
            color: item.color,
            willChange: "transform, color, text-shadow",
          }}
        >
          {item.char === " " ? "\u00A0" : item.char}
        </span>
      ))}

      {/* 3D Sphere Cursor - Bigger and Spinning */}
      {isHovering && (
        <div
          ref={cursorRef}
          className="pointer-events-none absolute z-50"
          style={{
            width: "120px",
            height: "120px",
            transform: "translate(-50%, -50%)",
            transition: "all 0.1s ease-out",
          }}
        >
          {/* Sphere with 3D effect and spin animation */}
          <div className="relative h-full w-full animate-spin" style={{ animationDuration: "3s" }}>
            {/* Main sphere */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.95), rgba(219, 39, 119, 0.8) 40%, rgba(190, 24, 93, 0.6) 70%)",
                boxShadow: `
                  0 0 30px rgba(236, 72, 153, 0.7),
                  0 0 60px rgba(236, 72, 153, 0.4),
                  0 0 90px rgba(236, 72, 153, 0.2),
                  inset -15px -15px 30px rgba(0, 0, 0, 0.4),
                  inset 15px 15px 30px rgba(255, 255, 255, 0.3)
                `,
              }}
            />
            {/* Animated highlight */}
            <div
              className="absolute left-[25%] top-[25%] h-8 w-8 rounded-full animate-pulse"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent 70%)",
                filter: "blur(3px)",
                animationDuration: "2s",
              }}
            />
            {/* Multiple ring effects for depth */}
            <div
              className="absolute inset-0 rounded-full border-2 border-pink-300/40"
              style={{
                transform: "scale(1.15)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full border border-pink-200/20"
              style={{
                transform: "scale(1.25)",
              }}
            />
            {/* Orbiting accent */}
            <div
              className="absolute inset-0"
              style={{
                animation: "orbit 2s linear infinite",
              }}
            >
              <div
                className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-pink-300/60"
                style={{
                  filter: "blur(1px)",
                }}
              />
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
