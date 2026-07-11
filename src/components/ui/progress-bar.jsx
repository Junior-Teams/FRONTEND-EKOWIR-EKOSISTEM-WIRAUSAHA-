import { NEO_BORDER } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

// Neobrutalist progress bar, same look as the one in belajar-quiz.jsx.
export function ProgressBar({ value, className }) {
  const percent = Math.min(100, Math.max(0, value ?? 0))
  return (
    <div
      className={cn(
        "h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800",
        NEO_BORDER,
        className
      )}
    >
      <div
        className="h-full bg-eko-primary transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
