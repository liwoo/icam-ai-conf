import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  style?: React.CSSProperties
}

export function TypewriterText({
  text,
  delay = 500,
  speed = 50,
  className = "",
  style = {},
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    // Start after delay
    const startTimer = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, hasStarted, speed, text])

  return (
    <h2 className={className} style={style}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse ml-0.5">|</span>
      )}
    </h2>
  )
}
