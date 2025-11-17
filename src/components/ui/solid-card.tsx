import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const solidCardVariants = cva("rounded-2xl transition-all", {
  variants: {
    variant: {
      default: "border border-neutral-200 bg-white shadow-sm",
      dark: "border border-brand-black bg-brand-black text-white",
      red: "border border-brand-red bg-brand-red text-white",
      "dark-red": "border border-brand-dark-red bg-brand-dark-red text-white",
      gradient:
        "border-0 bg-gradient-to-br from-brand-red to-brand-dark-red text-white shadow-md",
      "gradient-dark":
        "border-0 bg-gradient-to-br from-brand-black via-brand-dark-red to-brand-red-dark text-white",
      neutral: "border border-neutral-100 bg-neutral-50",
    },
    hover: {
      true: "hover:scale-[1.02] hover:shadow-lg",
      lift: "hover:-translate-y-1 hover:shadow-xl",
      false: "",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    hover: false,
    padding: "md",
  },
})

export interface SolidCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof solidCardVariants> {}

export function SolidCard({
  className,
  variant,
  hover,
  padding,
  ...props
}: SolidCardProps) {
  return (
    <div
      className={cn(solidCardVariants({ variant, hover, padding }), className)}
      {...props}
    />
  )
}
