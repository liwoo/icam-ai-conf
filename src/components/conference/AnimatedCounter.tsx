"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)

            const startTime = Date.now()
            const animate = () => {
              const currentTime = Date.now()
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)

              // Ease-out cubic function for smooth deceleration
              const easeOut = 1 - Math.pow(1 - progress, 3)
              const currentCount = Math.floor(easeOut * end)

              setCount(currentCount)

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(end)
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [end, duration, hasAnimated])

  return (
    <div ref={elementRef} className={className}>
      {count}
      {suffix}
    </div>
  )
}
