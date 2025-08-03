import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.04] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-sm hover:from-red-600 hover:to-pink-600",
        outline:
          "border border-input shadow-sm bg-white/10 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-sm hover:from-gray-800 hover:to-gray-950",
        ghost: "hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
