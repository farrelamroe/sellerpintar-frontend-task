import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
  asChild?: boolean;
}

function getBadgeClassName(variant: BadgeVariant = "default") {
  const base =
    "inline-flex items-center justify-center rounded-[6px] border px-[8px] py-[2px] text-[12px] font-medium w-fit whitespace-nowrap shrink-0 " +
    "[&>svg]:w-[12px] [&>svg]:h-[12px] gap-[4px] [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden";

  let variantClassName = "";

  if (variant === "default") {
    variantClassName =
      "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90";
  } else if (variant === "secondary") {
    variantClassName =
      "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90";
  } else if (variant === "destructive") {
    variantClassName =
      "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 " +
      "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60";
  } else if (variant === "outline") {
    variantClassName =
      "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground";
  }

  return cn(base, variantClassName);
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  const classes = getBadgeClassName(variant);

  return (
    <Comp data-slot="badge" className={cn(classes, className)} {...props} />
  );
}

export { Badge };
