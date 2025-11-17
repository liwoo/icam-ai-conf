import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const transparentCardVariants = cva(
  "rounded-2xl border backdrop-blur transition-all",
  {
    variants: {
      variant: {
        default: "border-neutral-100/70 bg-white/80",
        glass: "border-white/20 bg-white/10",
        dark: "border-white/10 bg-black/20",
        subtle: "border-neutral-50/50 bg-white/60",
      },
      hover: {
        true: "hover:scale-[1.02] hover:shadow-md",
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
  },
)

export interface TransparentCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof transparentCardVariants> {
  asChild?: boolean
}

export function TransparentCard({
  className,
  variant,
  hover,
  padding,
  ...props
}: TransparentCardProps) {
  return (
    <div
      className={cn(transparentCardVariants({ variant, hover, padding }), className)}
      {...props}
    />
  )
}
