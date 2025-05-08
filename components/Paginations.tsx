import Link from "next/link";
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Fungsi button class pixel-based
function generateButtonStyle(
  isSelected: boolean,
  size: "default" | "sm" | "lg" | "icon" = "icon"
) {
  const baseStyle =
    "inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-[6px] text-[14px] font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

  const variantStyle = isSelected
    ? "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
    : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";

  let sizeStyle = "";
  if (size === "default") {
    sizeStyle =
      "h-[36px] px-[16px] py-[8px] has-[>svg]:px-[12px]";
  } else if (size === "sm") {
    sizeStyle =
      "h-[32px] rounded-[6px] gap-[6px] px-[12px] has-[>svg]:px-[10px]";
  } else if (size === "lg") {
    sizeStyle =
      "h-[40px] rounded-[6px] px-[24px] has-[>svg]:px-[16px]";
  } else if (size === "icon") {
    sizeStyle = "w-[36px] h-[36px]";
  }

  return cn(baseStyle, variantStyle, sizeStyle);
}

// Komponen utama
function PaginationWrapper({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationList({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-[4px]", className)}
      {...props}
    />
  );
}

function PaginationListItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PixelPaginationLinkProps = {
  isSelected?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
} & React.ComponentProps<typeof Link>;

function PageLink({
  className,
  isSelected = false,
  size = "icon",
  ...props
}: PixelPaginationLinkProps) {
  return (
    <Link
      aria-current={isSelected ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isSelected}
      className={cn(generateButtonStyle(isSelected, size), className)}
      {...props}
    />
  );
}

function PreviousPageButton({
  className,
  ...props
}: React.ComponentProps<typeof PageLink>) {
  return (
    <PageLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-[4px] px-[10px] sm:pl-[10px]", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PageLink>
  );
}

function NextPageButton({
  className,
  ...props
}: React.ComponentProps<typeof PageLink>) {
  return (
    <PageLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-[4px] px-[10px] sm:pr-[10px]", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PageLink>
  );
}

function EllipsisIndicator({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex w-[36px] h-[36px] items-center justify-center",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="w-[16px] h-[16px]" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  PaginationWrapper,
  PaginationList,
  PageLink,
  PaginationListItem,
  PreviousPageButton,
  NextPageButton,
  EllipsisIndicator,
};
