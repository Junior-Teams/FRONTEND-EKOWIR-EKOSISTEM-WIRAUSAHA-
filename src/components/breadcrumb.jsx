import { ArrowLeft } from "lucide-react"
import { Fragment } from "react"
import { Link } from "react-router"

import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

export function Breadcrumb({ items, backHref }) {
  return (
    <div className="flex items-center gap-3">
      {backHref && (
        <Link
          to={backHref}
          aria-label="Kembali"
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW,
            NEO_PRESS
          )}
        >
          <ArrowLeft className="size-4" />
        </Link>
      )}

      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={item.label}>
              {index > 0 && <span className="text-muted-foreground">/</span>}
              {isLast || !item.href ? (
                <span className="font-bold">{item.label}</span>
              ) : (
                <Link
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </Fragment>
          )
        })}
      </nav>
    </div>
  )
}
