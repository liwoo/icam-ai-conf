import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const gradientBlurVariants = cva(
  "pointer-events-none absolute rounded-full blur-3xl",
  {
    variants: {
      variant: {
        "purple-red":
          "bg-gradient-to-tr from-gradient-purple/25 via-brand-red/15 to-red-500/25",
        "red-subtle": "bg-gradient-to-tr from-brand-red/20 via-brand-red/10 to-transparent",
        "purple-subtle":
          "bg-gradient-to-tr from-gradient-purple/20 via-brand-red/15 to-red-500/20",
        "dark-red": "bg-gradient-to-tr from-brand-dark-red/30 via-brand-red/20 to-transparent",
        red: "bg-gradient-to-tr from-brand-red/40 via-brand-red-dark/30 to-brand-dark-red/20",
        "purple-red-strong":
          "bg-gradient-to-tr from-gradient-purple/40 via-brand-red/30 to-red-500/40",
      },
      size: {
        sm: "h-32 w-32",
        md: "h-48 w-48",
        lg: "h-64 w-64",
        xl: "h-96 w-96",
        "2xl": "h-[32rem] w-[32rem]",
        "3xl": "h-[48rem] w-[48rem]",
      },
      position: {
        "top-right": "-right-8 -top-8",
        "top-left": "-left-8 -top-8",
        "bottom-right": "-bottom-8 -right-8",
        "bottom-left": "-bottom-8 -left-8",
        "top-right-far": "-right-16 -top-16",
        "top-left-far": "-left-16 -top-16",
        "bottom-right-far": "-bottom-16 -right-16",
        "bottom-left-far": "-bottom-16 -left-16",
        center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      variant: "purple-red",
      size: "md",
      position: "top-right",
    },
  },
)

export interface GradientBlurProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientBlurVariants> {}

export function GradientBlur({
  className,
  variant,
  size,
  position,
  ...props
}: GradientBlurProps) {
  return (
    <div
      className={cn(gradientBlurVariants({ variant, size, position }), className)}
      {...props}
    />
  )
}
