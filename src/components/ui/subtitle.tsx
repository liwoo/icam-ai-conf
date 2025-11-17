import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const subtitleVariants = cva("font-sans", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base md:text-lg",
      xl: "text-lg md:text-xl",
    },
    variant: {
      default: "text-neutral-600",
      muted: "text-neutral-500",
      white: "text-white/90",
      "white-muted": "text-white/70",
      dark: "text-brand-black",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    weight: "normal",
    align: "left",
  },
})

export interface SubtitleProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof subtitleVariants> {
  as?: "p" | "span" | "div"
}

export function Subtitle({
  className,
  size,
  variant,
  weight,
  align,
  as: Comp = "p",
  ...props
}: SubtitleProps) {
  return (
    <Comp
      className={cn(subtitleVariants({ size, variant, weight, align }), className)}
      {...props}
    />
  )
}
