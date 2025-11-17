import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const iconContainerVariants = cva(
  "flex items-center justify-center rounded transition-all",
  {
    variants: {
      variant: {
        default: "bg-brand-red text-white",
        "dark-gradient": "bg-brand-dark-red text-white",
        light: "bg-neutral-100 text-brand-black",
        white: "bg-white text-brand-red",
        outline: "border-2 border-brand-red text-brand-red",
        "red-shadow": "bg-brand-red text-white shadow-sm shadow-brand-red/20",
        "dark-shadow":
          "bg-brand-dark-red text-white shadow-sm shadow-brand-dark-red/20",
      },
      size: {
        sm: "h-6 w-6 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
        xl: "h-12 w-12 text-lg",
      },
      shape: {
        square: "rounded",
        circle: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "square",
    },
  },
)

export interface IconContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {}

export function IconContainer({
  className,
  variant,
  size,
  shape,
  ...props
}: IconContainerProps) {
  return (
    <div
      className={cn(iconContainerVariants({ variant, size, shape }), className)}
      {...props}
    />
  )
}
