"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        `
        group/input-group
        relative
        flex
        h-9
        w-full
        min-w-0
        items-center
        rounded-md
        border
        border-[#D6D6D6]
        bg-white
        shadow-none
        outline-none
        transition-colors
        duration-200

        has-[[data-slot=input-group-control]:focus-visible]:border-[#613DE4]

        has-[[data-slot][aria-invalid=true]]:border-destructive

        has-[>[data-align=block-end]]:h-auto
        has-[>[data-align=block-end]]:flex-col
        has-[>[data-align=block-start]]:h-auto
        has-[>[data-align=block-start]]:flex-col

        has-[>textarea]:h-auto

        has-[>[data-align=block-end]]:[&>input]:pt-3
        has-[>[data-align=block-start]]:[&>input]:pb-3
        has-[>[data-align=inline-end]]:[&>input]:pr-2
        has-[>[data-align=inline-start]]:[&>input]:pl-2
        `,
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  `
  flex
  items-center
  justify-center
  gap-2
  text-sm
  text-muted-foreground
  select-none
  `,
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3",
        "inline-end":
          "order-last pr-3",
        "block-start":
          "order-first w-full justify-start px-3 pt-2",
        "block-end":
          "order-last w-full justify-start px-3 pb-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        inputGroupAddonVariants({
          align,
        }),
        className
      )}
      onClick={(e) => {
        if (
          (e.target as HTMLElement).closest(
            "button"
          )
        ) {
          return
        }

        e.currentTarget.parentElement
          ?.querySelector("input")
          ?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 px-1.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-md p-0",
        "icon-sm":
          "size-8 rounded-md p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<
  React.ComponentProps<typeof Button>,
  "size"
> &
  VariantProps<
    typeof inputGroupButtonVariants
  >) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(
        inputGroupButtonVariants({
          size,
        }),
        "shadow-none",
        className
      )}
      {...props}
    />
  )
}

function InputGroupText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        `
        flex
        items-center
        gap-2
        text-sm
        text-muted-foreground

        [&_svg]:pointer-events-none
        [&_svg]:size-4
        `,
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        `
        flex-1
        border-0
        bg-transparent
        shadow-none
        rounded-none

        outline-none
        ring-0

        focus:outline-none
        focus:ring-0
        focus-visible:outline-none
        focus-visible:ring-0

        aria-invalid:ring-0
        dark:bg-transparent
        `,
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        `
        flex-1
        resize-none
        border-0
        bg-transparent
        py-2
        rounded-none
        shadow-none

        outline-none
        ring-0

        focus:outline-none
        focus:ring-0
        focus-visible:outline-none
        focus-visible:ring-0

        aria-invalid:ring-0
        dark:bg-transparent
        `,
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}