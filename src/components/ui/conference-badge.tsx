import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const conferenceBadgeVariants = cva(
  "inline-flex items-center gap-2 font-sans font-medium uppercase tracking-wider transition-all",
  {
    variants: {
      variant: {
        default: "bg-brand-red text-white",
        dark: "bg-brand-black text-white",
        outline: "border border-neutral-200 bg-white/80 text-neutral-700",
        "outline-red": "border border-brand-red text-brand-red",
        "dark-on-light": "bg-neutral-900/5 text-neutral-700",
        "light-on-dark": "bg-white/10 text-white/80",
        gradient:
          "bg-gradient-to-r from-brand-red to-brand-red-dark text-white shadow-md shadow-brand-red/30",
      },
      size: {
        xs: "px-2 py-1 text-[10px] rounded",
        sm: "px-3 py-1.5 text-[11px] rounded-lg",
        md: "px-4 py-2 text-xs rounded-full",
        lg: "px-5 py-2.5 text-sm rounded-full",
      },
      hover: {
        true: "hover:scale-105 cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hover: false,
    },
  },
)

export interface ConferenceBadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof conferenceBadgeVariants> {}

export function ConferenceBadge({
  className,
  variant,
  size,
  hover,
  ...props
}: ConferenceBadgeProps) {
  return (
    <div
      className={cn(conferenceBadgeVariants({ variant, size, hover }), className)}
      {...props}
    />
  )
}
