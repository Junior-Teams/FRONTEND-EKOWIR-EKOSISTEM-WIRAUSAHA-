import { Input as InputPrimitive } from "@base-ui/react/input"

import { NEO_BORDER } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-lg bg-white px-3 py-2 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-neutral-900 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        NEO_BORDER,
        className
      )}
      {...props} />
  );
}

export { Input }
