import linksData from '@/data/links.json'

export type SocialPlatform = keyof typeof linksData.socialMediaPlatforms
export type ContactType = keyof typeof linksData.contactTypes

/**
 * Get social media platform configuration
 * @param platform - The social media platform name
 * @returns Platform configuration including icon, color, and base URL
 */
export function getSocialPlatform(platform: SocialPlatform) {
  return linksData.socialMediaPlatforms[platform]
}

/**
 * Get all social media platforms
 * @returns Object containing all social media platform configurations
 */
export function getAllSocialPlatforms() {
  return linksData.socialMediaPlatforms
}

/**
 * Get contact type configuration
 * @param type - The contact type (email, phone, website, location)
 * @returns Contact type configuration including icon and protocol
 */
export function getContactType(type: ContactType) {
  return linksData.contactTypes[type]
}

/**
 * Build a full social media URL from a username or profile path
 * @param platform - The social media platform
 * @param usernameOrPath - Username or full profile path
 * @returns Complete URL to the social media profile
 */
export function buildSocialUrl(
  platform: SocialPlatform,
  usernameOrPath: string,
): string {
  const config = getSocialPlatform(platform)

  // If it's already a full URL, return it
  if (
    usernameOrPath.startsWith('http://') ||
    usernameOrPath.startsWith('https://')
  ) {
    return usernameOrPath
  }

  // Remove @ prefix if present for platforms that don't need it in URL
  const cleanUsername = usernameOrPath.replace(/^@/, '')

  return `${config.baseUrl}${cleanUsername}`
}

/**
 * Format a contact link with proper protocol
 * @param type - Contact type (email, phone, etc.)
 * @param value - Contact value
 * @returns Formatted contact link
 */
export function formatContactLink(type: ContactType, value: string): string {
  const config = getContactType(type)

  // If it's already a full URL, return it
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  // Special handling for phone numbers - remove spaces and formatting
  if (type === 'phone') {
    const cleanPhone = value.replace(/\s+/g, '')
    return `${config.protocol}${cleanPhone}`
  }

  return `${config.protocol}${value}`
}

/**
 * Get ICTAM social media links
 * @returns Object containing all ICTAM social media URLs
 */
export function getIctamSocialMedia() {
  return linksData.ictamSocialMedia
}

/**
 * Get conference-related links
 * @returns Object containing conference navigation and external links
 */
export function getConferenceLinks() {
  return linksData.conferenceLinks
}

/**
 * Get external resource links
 * @returns Object containing external partner/resource links
 */
export function getExternalResources() {
  return linksData.externalResources
}

/**
 * Extract username from a full social media URL
 * @param url - Full social media URL
 * @returns Username or null if not found
 */
export function extractUsername(url: string): string | null {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const parts = pathname.split('/').filter((part) => part.length > 0)

    // Return the first path segment as username
    return parts[0] || null
  } catch {
    return null
  }
}

/**
 * Get icon name for a social platform
 * @param platform - Social media platform
 * @returns Icon name from lucide-react
 */
export function getSocialIcon(platform: SocialPlatform): string {
  return getSocialPlatform(platform).icon
}

/**
 * Get brand color for a social platform
 * @param platform - Social media platform
 * @returns Hex color code
 */
export function getSocialColor(platform: SocialPlatform): string {
  return getSocialPlatform(platform).color
}

/**
 * Check if a URL is external
 * @param url - URL to check
 * @returns True if external, false if internal
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://')
}

/**
 * Get all available social platforms as array
 * @returns Array of social platform keys
 */
export function getSocialPlatformKeys(): SocialPlatform[] {
  return Object.keys(
    linksData.socialMediaPlatforms,
  ) as SocialPlatform[]
}

/**
 * Format display name for social media
 * @param platform - Social media platform
 * @param includeFormerName - Whether to include former name (e.g., "X (Twitter)")
 * @returns Display name
 */
export function getSocialDisplayName(
  platform: SocialPlatform,
  includeFormerName = false,
): string {
  const config = getSocialPlatform(platform)
  return includeFormerName ? config.displayName : config.name
}
