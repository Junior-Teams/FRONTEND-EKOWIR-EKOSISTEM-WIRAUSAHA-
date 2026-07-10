"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-black bg-white transition-colors data-[checked]:bg-eko-primary dark:border-white dark:bg-neutral-800",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-3.5 translate-x-0.5 rounded-full border-2 border-black bg-white transition-transform data-[checked]:translate-x-[22px] dark:border-white"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
