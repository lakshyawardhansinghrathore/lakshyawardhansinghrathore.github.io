import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui-style button. For links that look like buttons, apply
 * `buttonVariants({...})` as the className of an <a>/<Link>.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground shadow-sm hover:brightness-110 active:brightness-95",
        outline:
          "border border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        soft: "bg-accent-soft text-accent border border-accent-border/50 hover:border-accent",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
