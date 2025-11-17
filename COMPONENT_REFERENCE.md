# Component Quick Reference Guide

## Typography Configuration

### Font Families
- `font-sans` → Inter (body text)
- `font-heading` → Montserrat (headings)
- `font-accent` → Playfair Display (special emphasis)
- `font-mono` → Geist Mono (code)

---

## Component Props Reference

### TransparentCard
```tsx
<TransparentCard
  variant="default" | "glass" | "dark" | "subtle"
  hover={boolean}
  padding="none" | "sm" | "md" | "lg" | "xl"
  className={string}
/>
```

### SolidCard
```tsx
<SolidCard
  variant="default" | "dark" | "red" | "dark-red" | "gradient" | "gradient-dark" | "neutral"
  hover={boolean | "lift"}
  padding="none" | "sm" | "md" | "lg" | "xl"
  className={string}
/>
```

### PageTitle
```tsx
<PageTitle
  as="h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  size="sm" | "md" | "lg" | "xl"
  variant="default" | "white" | "gradient" | "accent"
  align="left" | "center" | "right"
  className={string}
>
  Title Text
</PageTitle>
```

### Subtitle
```tsx
<Subtitle
  as="p" | "span" | "div"
  size="sm" | "md" | "lg" | "xl"
  variant="default" | "muted" | "white" | "white-muted" | "dark"
  weight="normal" | "medium" | "semibold"
  align="left" | "center" | "right"
  className={string}
>
  Subtitle Text
</Subtitle>
```

### IconContainer
```tsx
<IconContainer
  variant="default" | "dark-gradient" | "light" | "white" | "outline" | "red-shadow" | "dark-shadow"
  size="sm" | "md" | "lg" | "xl"
  shape="square" | "circle" | "lg" | "xl"
  className={string}
>
  <Icon />
</IconContainer>
```

### ConferenceBadge
```tsx
<ConferenceBadge
  variant="default" | "dark" | "outline" | "outline-red" | "dark-on-light" | "light-on-dark" | "gradient"
  size="xs" | "sm" | "md" | "lg"
  hover={boolean}
  className={string}
>
  Badge Content
</ConferenceBadge>
```

### GradientBlur
```tsx
<GradientBlur
  variant="purple-red" | "red-subtle" | "purple-subtle" | "dark-red" | "red" | "purple-red-strong"
  size="sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  position="top-right" | "top-left" | "bottom-right" | "bottom-left" |
           "top-right-far" | "top-left-far" | "bottom-right-far" | "bottom-left-far" | "center"
  className={string}
/>
```

### Button (Enhanced)
```tsx
<Button
  variant="default" | "destructive" | "outline" | "secondary" | "ghost" | "link" |
          "conference" | "conference-outline" | "conference-outline-dark" | "conference-gradient"
  size="default" | "sm" | "lg" | "xl" | "icon"
  asChild={boolean}
  className={string}
>
  Button Text
</Button>
```

---

## Common Patterns

### Section Header
```tsx
<div>
  <ConferenceBadge variant="outline-red" size="xs">
    Section Tag
  </ConferenceBadge>
  <PageTitle size="lg" className="mt-2">
    Section Title
  </PageTitle>
  <Subtitle size="md" className="mt-2">
    Section description text
  </Subtitle>
</div>
```

### Feature Card
```tsx
<TransparentCard variant="default" padding="md">
  <div className="flex items-start gap-3">
    <IconContainer variant="red-shadow" size="md" shape="circle">
      <FeatureIcon />
    </IconContainer>
    <div>
      <h3 className="font-semibold">Feature Name</h3>
      <Subtitle size="sm">Feature description</Subtitle>
    </div>
  </div>
</TransparentCard>
```

### Dark Card with Gradient
```tsx
<SolidCard variant="dark" padding="lg" hover="lift" className="relative">
  <GradientBlur variant="red" size="xl" position="top-right" />
  <PageTitle size="md" variant="white" className="relative">
    Card Title
  </PageTitle>
  <Subtitle size="md" variant="white-muted" className="relative mt-4">
    Card content
  </Subtitle>
</SolidCard>
```

### Call-to-Action Section
```tsx
<section className="relative">
  <GradientBlur variant="purple-red" size="3xl" position="center" />
  <div className="relative">
    <PageTitle size="xl" variant="gradient" align="center">
      Don't Miss Out
    </PageTitle>
    <Subtitle size="lg" align="center" className="mt-4">
      Join us for an amazing event
    </Subtitle>
    <div className="mt-8 flex justify-center gap-4">
      <Button variant="conference-gradient" size="xl">
        Register Now
      </Button>
      <Button variant="conference-outline-dark" size="xl">
        Learn More
      </Button>
    </div>
  </div>
</section>
```

---

## Color Variables

### Brand Colors
```css
--brand-red: 0 84% 60%
--brand-red-dark: 0 70% 45%
--brand-dark-red: 0 60% 25%
--brand-black: 0 0% 9%
```

### Gradient Colors
```css
--gradient-purple: 280 65% 55%  /* Use sparingly */
--gradient-red: 0 84% 60%
```

### Usage in Tailwind
```tsx
className="bg-brand-red text-white"
className="border-brand-red-dark"
className="from-gradient-purple to-brand-red"
```

---

## Responsive Design

### Size Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px (custom container)

### Responsive Component Example
```tsx
<PageTitle
  size="lg"  /* Automatically responsive */
  className="text-3xl md:text-5xl lg:text-6xl"  /* Additional control */
>
  Responsive Title
</PageTitle>
```

---

## Best Practices

1. **Use semantic HTML elements**: PageTitle renders h2 by default, use `as` prop to change
2. **Combine components**: Stack GradientBlur behind cards for depth
3. **Maintain consistency**: Use the same variant patterns across similar sections
4. **Respect spacing**: Use Tailwind's spacing scale (mt-4, mb-8, gap-6)
5. **Typography hierarchy**: Use size prop to maintain visual hierarchy
6. **Color contrast**: Ensure text variants match background (white variants on dark backgrounds)
7. **Icons in badges**: Keep icons simple and recognizable at small sizes

---

## Import Shortcuts

```typescript
// Individual imports
import { PageTitle } from "@/components/ui/page-title"

// Barrel import (recommended)
import {
  PageTitle,
  Subtitle,
  SolidCard,
  Button
} from "@/components/ui"
```
