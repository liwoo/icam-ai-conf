import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const pageTitleVariants = cva("font-heading font-bold tracking-tight", {
  variants: {
    size: {
      sm: "text-2xl sm:text-3xl",
      md: "text-3xl sm:text-4xl md:text-5xl",
      lg: "text-4xl sm:text-5xl md:text-6xl",
      xl: "text-5xl sm:text-6xl md:text-7xl",
    },
    variant: {
      default: "text-brand-black",
      white: "text-white",
      gradient:
        "bg-gradient-to-r from-brand-red via-brand-red-dark to-brand-dark-red bg-clip-text text-transparent",
      accent: "text-brand-red",
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
    align: "left",
  },
})

export interface PageTitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof pageTitleVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function PageTitle({
  className,
  size,
  variant,
  align,
  as: Comp = "h2",
  ...props
}: PageTitleProps) {
  return (
    <Comp
      className={cn(pageTitleVariants({ size, variant, align }), className)}
      {...props}
    />
  )
}
