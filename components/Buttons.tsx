import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

function getButtonClassName(
  variant: ButtonVariant = "default",
  size: ButtonSize = "default",
) {
  const base =
    "inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-[6px] text-[14px] font-medium transition-all " +
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:w-[16px] [&_svg:not([class*='size-'])]:h-[16px] " +
    "shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

  let variantClassName = "";
  let sizeClassName = "";

  // Variant logic
  if (variant === "default") {
    variantClassName =
      "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90";
  } else if (variant === "destructive") {
    variantClassName =
      "bg-destructive text-white shadow-xs hover:bg-destructive/90 " +
      "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60";
  } else if (variant === "outline") {
    variantClassName =
      "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground " +
      "dark:bg-input/30 dark:border-input dark:hover:bg-input/50";
  } else if (variant === "secondary") {
    variantClassName =
      "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80";
  } else if (variant === "ghost") {
    variantClassName =
      "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
  } else if (variant === "link") {
    variantClassName = "text-primary underline-offset-[4px] hover:underline";
  }

  // Size logic
  if (size === "default") {
    sizeClassName = "h-[36px] px-[16px] py-[8px] has-[>svg]:px-[12px]";
  } else if (size === "sm") {
    sizeClassName =
      "h-[32px] rounded-[6px] gap-[6px] px-[12px] has-[>svg]:px-[10px]";
  } else if (size === "lg") {
    sizeClassName = "h-[40px] rounded-[6px] px-[24px] has-[>svg]:px-[16px]";
  } else if (size === "icon") {
    sizeClassName = "w-[36px] h-[36px]";
  }

  return cn(base, variantClassName, sizeClassName);
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const classes = getButtonClassName(variant, size);

  return (
    <Comp data-slot="button" className={cn(classes, className)} {...props} />
  );
}

export { Button };
