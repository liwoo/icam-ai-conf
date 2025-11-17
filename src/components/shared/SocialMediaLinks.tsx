import { Facebook, Linkedin, X, Mail, Globe, Phone, MapPin } from 'lucide-react'
import type { SocialPlatform } from '@/lib/links'
import { buildSocialUrl, getSocialPlatform } from '@/lib/links'

// Map of platform names to Lucide icons
const iconMap = {
  x: X,
  facebook: Facebook,
  instagram: Facebook, // Placeholder - use actual Instagram icon if available
  linkedin: Linkedin,
  youtube: Facebook, // Placeholder
  tiktok: Facebook, // Placeholder
  whatsapp: Mail, // Placeholder
  telegram: Mail, // Placeholder
  github: Globe,
  threads: Facebook, // Placeholder
  email: Mail,
  phone: Phone,
  website: Globe,
  location: MapPin,
}

interface SocialMediaLinksProps {
  links: Partial<Record<SocialPlatform | 'email' | 'website' | 'phone', string>>
  className?: string
  iconSize?: number
  showLabels?: boolean
  variant?: 'default' | 'color' | 'mono'
}

/**
 * Social Media Links Component
 * Displays social media icons with links using up-to-date platform names
 *
 * @example
 * ```tsx
 * <SocialMediaLinks
 *   links={{
 *     x: 'https://x.com/ictammalawi',
 *     facebook: 'https://facebook.com/ictammalawi',
 *     linkedin: 'https://linkedin.com/company/ictam',
 *     email: 'info@ictam.org.mw'
 *   }}
 *   variant="color"
 * />
 * ```
 */
export function SocialMediaLinks({
  links,
  className = '',
  iconSize = 20,
  showLabels = false,
  variant = 'default',
}: SocialMediaLinksProps) {
  const entries = Object.entries(links).filter(([_, url]) => url)

  if (entries.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {entries.map(([platform, url]) => {
        const isPlatform = platform in iconMap
        if (!isPlatform) return null

        // Get platform config if it's a social platform
        const isSocialPlatform = platform !== 'email' && platform !== 'website' && platform !== 'phone'
        const config = isSocialPlatform ? getSocialPlatform(platform as SocialPlatform) : null

        // Get the icon component
        const IconComponent = iconMap[platform as keyof typeof iconMap]
        if (!IconComponent) return null

        // Build full URL
        const fullUrl = isSocialPlatform && config
          ? buildSocialUrl(platform as SocialPlatform, url!)
          : url

        // Determine color based on variant
        const iconColor =
          variant === 'color' && config
            ? config.color
            : variant === 'mono'
              ? 'currentColor'
              : '#6B7280'

        // Display name
        const displayName = config?.displayName || platform

        return (
          <a
            key={platform}
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 transition-opacity hover:opacity-70"
            aria-label={displayName}
            title={displayName}
          >
            <IconComponent
              size={iconSize}
              style={{ color: iconColor }}
              className="transition-transform group-hover:scale-110"
            />
            {showLabels && (
              <span className="text-sm font-medium text-neutral-700">
                {displayName}
              </span>
            )}
          </a>
        )
      })}
    </div>
  )
}

interface SocialButtonProps {
  platform: SocialPlatform
  url: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost'
}

/**
 * Social Button Component
 * A button styled with platform brand colors
 *
 * @example
 * ```tsx
 * <SocialButton
 *   platform="x"
 *   url="https://x.com/ictammalawi"
 *   variant="solid"
 *   size="md"
 * />
 * ```
 */
export function SocialButton({
  platform,
  url,
  className = '',
  size = 'md',
  variant = 'solid',
}: SocialButtonProps) {
  const config = getSocialPlatform(platform)
  const IconComponent = iconMap[platform]

  if (!IconComponent) return null

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }

  const variantClasses = {
    solid: `bg-[${config.color}] text-white hover:opacity-90`,
    outline: `border-2 border-[${config.color}] text-[${config.color}] hover:bg-[${config.color}] hover:text-white`,
    ghost: `text-[${config.color}] hover:bg-[${config.color}]/10`,
  }

  const fullUrl = buildSocialUrl(platform, url)

  return (
    <a
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center rounded-full
        transition-all duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={config.displayName}
      title={config.displayName}
    >
      <IconComponent size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
    </a>
  )
}
