import { NEO_BORDER } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg bg-white px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-neutral-900 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        NEO_BORDER,
        className
      )}
      {...props} />
  );
}

export { Textarea }
