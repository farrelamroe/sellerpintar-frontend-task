"use client";

import * as React from "react";
import * as SelectRoot from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const DropdownRoot = SelectRoot.Root;
export const DropdownValue = SelectRoot.Value;
export const DropdownGroup = SelectRoot.Group;

export function DropdownTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectRoot.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectRoot.Trigger
      className={cn(
        "focus:ring-ring inline-flex items-center justify-between rounded-md border px-[12px] py-[8px] text-[14px] whitespace-nowrap shadow-sm transition outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "h-[32px]",
        size === "default" && "h-[36px]",
        "border-gray-300 bg-white text-black data-[placeholder]:text-gray-400",
        className,
      )}
      {...props}
    >
      {children}
      <SelectRoot.Icon asChild>
        <ChevronDownIcon className="ml-[8px] h-[16px] w-[16px] text-gray-400" />
      </SelectRoot.Icon>
    </SelectRoot.Trigger>
  );
}

export function DropdownContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectRoot.Content> & {
  position?: "popper" | "item-aligned";
}) {
  return (
    <SelectRoot.Portal>
      <SelectRoot.Content
        className={cn(
          "animate-in fade-in-0 zoom-in-95 z-50 max-h-[256px] min-w-[128px] overflow-auto rounded-md border border-gray-200 bg-white text-black shadow-md",
          position === "popper" && "translate-y-[4px]",
          className,
        )}
        position={position}
        {...props}
      >
        <ScrollUpButton />
        <SelectRoot.Viewport className="p-[4px]">
          {children}
        </SelectRoot.Viewport>
        <ScrollDownButton />
      </SelectRoot.Content>
    </SelectRoot.Portal>
  );
}

export function DropdownLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectRoot.Label>) {
  return (
    <SelectRoot.Label
      className={cn("px-[8px] py-[6px] text-[12px] text-gray-500", className)}
      {...props}
    />
  );
}

export function DropdownItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectRoot.Item>) {
  return (
    <SelectRoot.Item
      className={cn(
        "relative flex w-full cursor-default items-center rounded-sm py-[6px] pr-[32px] pl-[8px] text-[14px] transition outline-none select-none focus:bg-gray-100 focus:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute right-[8px] flex h-[16px] w-[16px] items-center justify-center">
        <SelectRoot.ItemIndicator>
          <CheckIcon className="h-[16px] w-[16px]" />
        </SelectRoot.ItemIndicator>
      </span>
      <SelectRoot.ItemText>{children}</SelectRoot.ItemText>
    </SelectRoot.Item>
  );
}

export function DropdownSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectRoot.Separator>) {
  return (
    <SelectRoot.Separator
      className={cn("my-[4px] h-[1px] bg-gray-200", className)}
      {...props}
    />
  );
}

export function ScrollUpButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectRoot.ScrollUpButton>) {
  return (
    <SelectRoot.ScrollUpButton
      className={cn("flex items-center justify-center py-[4px]", className)}
      {...props}
    >
      <ChevronUpIcon className="h-[16px] w-[16px]" />
    </SelectRoot.ScrollUpButton>
  );
}

export function ScrollDownButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectRoot.ScrollDownButton>) {
  return (
    <SelectRoot.ScrollDownButton
      className={cn("flex items-center justify-center py-[4px]", className)}
      {...props}
    >
      <ChevronDownIcon className="h-[16px] w-[16px]" />
    </SelectRoot.ScrollDownButton>
  );
}
