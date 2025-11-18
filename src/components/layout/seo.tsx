import { useLocation } from "@tanstack/react-router"

import { APP_NAME } from "@/lib/consts"

import type { PropsWithChildren } from "react"

interface SeoProps extends PropsWithChildren {
  title?: string
  description?: string
  defaultTitle?: string
  separator?: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  type?: string
}

export function Seo({
  children,
  title,
  description,
  defaultTitle = APP_NAME,
  separator = " | ",
  image = "/images/og-card.jpg",
  imageAlt = "ICTAM AGM 2025 - AI for Sustainable Development",
  type = "website",
}: SeoProps) {
  const location = useLocation()
  const pageTitle = [title, defaultTitle].filter(Boolean).join(separator)
  const canonicalUrl = `${window.location.origin}${location.href}`
  const imageUrl = image.startsWith("http")
    ? image
    : `${window.location.origin}${image}`

  return (
    <head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {children}
    </head>
  )
}
