import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-black uppercase tracking-widest transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 border-2 border-[#2c2c2c] dark:border-zinc-100 rounded-none focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-zinc-900 text-[#2c2c2c] dark:text-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        primary:
          "bg-[#2c2c2c] dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        outline:
          "bg-white dark:bg-zinc-900 text-[#2c2c2c] dark:text-zinc-100 hover:text-[#2c2c2c] dark:hover:text-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-white dark:hover:bg-zinc-900",
        ghost:
          "bg-transparent border-transparent shadow-none hover:bg-zinc-100 dark:hover:bg-zinc-800",
        link:
          "text-[#2c2c2c] dark:text-zinc-100 underline-offset-4 hover:underline border-transparent shadow-none",
      },
      size: {
        default: "h-12 px-6 py-2 text-xs",
        sm: "h-10 px-4 py-1.5 text-[10px]",
        lg: "h-14 px-10 py-4 text-sm",
        xl: "h-16 px-12 py-5 text-lg",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
