# Links & Social Media System Documentation

This document explains how to use the centralized links and social media system for the ICTAM Conference website.

## 📁 File Structure

```
src/
├── data/
│   └── links.json          # Central source of truth for all links
├── lib/
│   └── links.ts            # TypeScript utilities for working with links
└── components/
    └── shared/
        └── SocialMediaLinks.tsx  # Reusable social media components
```

---

## 🎯 Key Features

✅ **Up-to-date Platform Names**: Uses "X" instead of "Twitter"
✅ **Centralized Management**: All links in one JSON file
✅ **Type-Safe**: Full TypeScript support
✅ **Icon Mappings**: Lucide React icons pre-mapped
✅ **Brand Colors**: Official platform colors included
✅ **Reusable Components**: Ready-to-use React components

---

## 📖 Data Structure

### `src/data/links.json`

Contains four main sections:

1. **socialMediaPlatforms** - Modern social media platforms (X, Facebook, LinkedIn, etc.)
2. **contactTypes** - Contact methods (Email, Phone, Website, Location)
3. **ictamSocialMedia** - ICTAM's official social media links
4. **conferenceLinks** - Conference-specific navigation links

### Example Social Platform Entry:

```json
{
  "x": {
    "name": "X",
    "formerName": "Twitter",
    "baseUrl": "https://x.com/",
    "icon": "X",
    "iconLibrary": "lucide-react",
    "color": "#000000",
    "displayName": "X (Twitter)",
    "usernamePrefix": "@"
  }
}
```

---

## 🛠️ Using the TypeScript Utilities

### Import the utilities:

```typescript
import {
  getSocialPlatform,
  buildSocialUrl,
  getSocialIcon,
  getSocialColor,
  getIctamSocialMedia,
  formatContactLink
} from '@/lib/links'
```

### Get Platform Configuration:

```typescript
const xConfig = getSocialPlatform('x')
// Returns: { name: "X", baseUrl: "https://x.com/", icon: "X", color: "#000000", ... }
```

### Build Social Media URLs:

```typescript
// From username
const url = buildSocialUrl('x', '@ictammalawi')
// Returns: "https://x.com/ictammalawi"

// From existing full URL (passes through)
const url2 = buildSocialUrl('x', 'https://x.com/ictammalawi')
// Returns: "https://x.com/ictammalawi"
```

### Get Icon and Color:

```typescript
const icon = getSocialIcon('linkedin')  // Returns: "Linkedin"
const color = getSocialColor('facebook')  // Returns: "#1877F2"
```

### Format Contact Links:

```typescript
const emailLink = formatContactLink('email', 'info@ictam.org.mw')
// Returns: "mailto:info@ictam.org.mw"

const phoneLink = formatContactLink('phone', '+265 123 456 789')
// Returns: "tel:+265123456789"
```

### Get ICTAM Social Media:

```typescript
const ictamLinks = getIctamSocialMedia()
// Returns: { website: "...", facebook: "...", x: "...", linkedin: "..." }
```

---

## ⚛️ Using React Components

### 1. SocialMediaLinks Component

Display multiple social media icons in a row:

```tsx
import { SocialMediaLinks } from '@/components/shared/SocialMediaLinks'

// Basic usage
<SocialMediaLinks
  links={{
    x: 'https://x.com/ictammalawi',
    facebook: 'https://facebook.com/ictammalawi',
    linkedin: 'https://linkedin.com/company/ictam',
    email: 'info@ictam.org.mw'
  }}
/>

// With brand colors
<SocialMediaLinks
  links={{
    x: 'ictammalawi',  // Can use username or full URL
    facebook: 'ictammalawi',
    linkedin: 'company/ictam'
  }}
  variant="color"
  iconSize={24}
/>

// With labels
<SocialMediaLinks
  links={getIctamSocialMedia()}
  showLabels={true}
  variant="mono"
/>
```

#### Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `Record<string, string>` | - | Object with platform keys and URLs |
| `className` | `string` | `''` | Additional CSS classes |
| `iconSize` | `number` | `20` | Icon size in pixels |
| `showLabels` | `boolean` | `false` | Show platform names next to icons |
| `variant` | `'default' \| 'color' \| 'mono'` | `'default'` | Color scheme |

### 2. SocialButton Component

Individual social media button with brand styling:

```tsx
import { SocialButton } from '@/components/shared/SocialMediaLinks'

// Solid button
<SocialButton
  platform="x"
  url="https://x.com/ictammalawi"
  variant="solid"
  size="md"
/>

// Outline button
<SocialButton
  platform="linkedin"
  url="company/ictam"
  variant="outline"
  size="lg"
/>
```

#### Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `platform` | `SocialPlatform` | - | Platform name (x, facebook, linkedin, etc.) |
| `url` | `string` | - | Full URL or username |
| `className` | `string` | `''` | Additional CSS classes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Button style |

---

## 🎨 Available Platforms

### Social Media Platforms:

- ✅ **X** (formerly Twitter) - Uses X icon and branding
- ✅ **Facebook**
- ✅ **Instagram**
- ✅ **LinkedIn**
- ✅ **YouTube**
- ✅ **TikTok**
- ✅ **WhatsApp**
- ✅ **Telegram**
- ✅ **GitHub**
- ✅ **Threads**

### Contact Types:

- ✅ **Email**
- ✅ **Phone**
- ✅ **Website**
- ✅ **Location**

---

## 📝 Common Use Cases

### Footer Social Links

```tsx
import { SocialMediaLinks } from '@/components/shared/SocialMediaLinks'
import { getIctamSocialMedia } from '@/lib/links'

export function Footer() {
  const socialLinks = getIctamSocialMedia()

  return (
    <footer>
      <div>
        <h3>Follow ICTAM</h3>
        <SocialMediaLinks
          links={socialLinks}
          variant="color"
          iconSize={24}
        />
      </div>
    </footer>
  )
}
```

### Speaker Profile Card

```tsx
import { SocialMediaLinks } from '@/components/shared/SocialMediaLinks'

interface Speaker {
  name: string
  socialMedia: {
    linkedin?: string
    x?: string
  }
}

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="speaker-card">
      <h3>{speaker.name}</h3>
      <SocialMediaLinks
        links={speaker.socialMedia}
        variant="color"
        iconSize={20}
      />
    </div>
  )
}
```

### Sponsor Card with Links

```tsx
import { buildSocialUrl, getSocialColor } from '@/lib/links'
import { X, Linkedin } from 'lucide-react'

export function SponsorCard({ sponsor }) {
  return (
    <div>
      <h3>{sponsor.name}</h3>
      <div className="flex gap-2">
        {sponsor.socialMedia.linkedin && (
          <a
            href={buildSocialUrl('linkedin', sponsor.socialMedia.linkedin)}
            style={{ color: getSocialColor('linkedin') }}
          >
            <Linkedin size={20} />
          </a>
        )}
        {sponsor.socialMedia.x && (
          <a
            href={buildSocialUrl('x', sponsor.socialMedia.x)}
            style={{ color: getSocialColor('x') }}
          >
            <X size={20} />
          </a>
        )}
      </div>
    </div>
  )
}
```

### Contact Information

```tsx
import { formatContactLink } from '@/lib/links'
import { Mail, Phone, MapPin } from 'lucide-react'

export function ContactInfo() {
  return (
    <div>
      <a href={formatContactLink('email', 'info@ictam.org.mw')}>
        <Mail /> Email Us
      </a>
      <a href={formatContactLink('phone', '+265 123 456 789')}>
        <Phone /> Call Us
      </a>
      <a href={formatContactLink('location', 'ICTAM Office Lilongwe')}>
        <MapPin /> Visit Us
      </a>
    </div>
  )
}
```

---

## 🔄 Updating Links

### To Add a New Social Platform:

1. Edit `src/data/links.json`:

```json
{
  "socialMediaPlatforms": {
    "newplatform": {
      "name": "NewPlatform",
      "baseUrl": "https://newplatform.com/",
      "icon": "Globe",
      "iconLibrary": "lucide-react",
      "color": "#FF0000",
      "displayName": "NewPlatform",
      "usernamePrefix": "@"
    }
  }
}
```

2. Update icon mapping in `SocialMediaLinks.tsx`:

```typescript
const iconMap = {
  // ... existing icons
  newplatform: Globe, // or appropriate icon
}
```

### To Update ICTAM Social Links:

Edit the `ictamSocialMedia` section in `src/data/links.json`:

```json
{
  "ictamSocialMedia": {
    "website": "https://www.ictam.org.mw",
    "email": "info@ictam.org.mw",
    "x": "https://x.com/ictammalawi",
    "facebook": "https://facebook.com/ictammalawi",
    "linkedin": "https://linkedin.com/company/ictam"
  }
}
```

---

## 🎯 Best Practices

1. **Always use X, not Twitter**: The platform rebranded in 2023
2. **Import from data file**: Don't hardcode links in components
3. **Use utility functions**: They handle URL formatting automatically
4. **Type safety**: Use TypeScript types from `@/lib/links`
5. **Consistent icons**: Use Lucide React icons throughout
6. **Brand colors**: Use official colors from `links.json`

---

## 🔍 Type Definitions

```typescript
type SocialPlatform = 'x' | 'facebook' | 'instagram' | 'linkedin' | 'youtube'
  | 'tiktok' | 'whatsapp' | 'telegram' | 'github' | 'threads'

type ContactType = 'email' | 'phone' | 'website' | 'location'
```

---

## 📚 Related Files

- `src/data/links.json` - Data source
- `src/lib/links.ts` - Utility functions
- `src/components/shared/SocialMediaLinks.tsx` - React components
- `src/data/conference.json` - Speaker data (uses social links)
- `src/data/logos.json` - Sponsor data (uses social links)

---

## 🆘 Troubleshooting

### Icons not showing?

Make sure `lucide-react` is installed:
```bash
npm install lucide-react
```

### TypeScript errors?

Ensure imports use the correct path alias:
```typescript
import { getSocialPlatform } from '@/lib/links'  // ✅ Correct
import { getSocialPlatform } from '../lib/links' // ❌ Avoid
```

### Colors not applying?

Use inline styles for dynamic colors:
```tsx
<div style={{ color: getSocialColor('x') }}>
  <X />
</div>
```

---

**Last Updated**: November 2025
**Maintained By**: ICTAM Development Team

For questions or updates, please update `src/data/links.json` and this documentation accordingly.
