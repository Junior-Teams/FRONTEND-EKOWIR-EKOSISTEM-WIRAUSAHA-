import { ArrowBigUp, MessageCircle } from "lucide-react"
import { Link } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { countComments, getAvatarColor, THREADS } from "@/lib/forum-threads"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

export function Component() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Forum" }]}
      />

      <div>
        <h1 className="font-heading text-2xl font-bold">Forum</h1>
        <p className="text-muted-foreground text-sm">
          Diskusi seputar pengelolaan koperasi bersama sesama anggota.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {THREADS.map((thread) => (
          <Link
            key={thread.id}
            to={`/dashboard/forum/${thread.id}`}
            className={cn(
              "flex flex-col gap-2 rounded-lg bg-white p-4 dark:bg-neutral-900",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    NEO_BORDER,
                    getAvatarColor(thread.author)
                  )}
                >
                  {thread.author.charAt(0).toUpperCase()}
                </div>
                <span className="text-muted-foreground text-xs">
                  {thread.author} &middot; {thread.time}
                </span>
              </div>
              <span
                className={cn(
                  "rounded-full bg-eko-secondary px-2 py-0.5 text-[10px] font-bold uppercase",
                  NEO_BORDER
                )}
              >
                {thread.category}
              </span>
            </div>

            <h3 className="font-heading text-base leading-snug font-bold">
              {thread.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {thread.body}
            </p>

            <div className="mt-1 flex items-center gap-4 border-t-2 border-black pt-3 text-xs font-bold dark:border-white">
              <span className="flex items-center gap-1">
                <ArrowBigUp className="size-4" />
                {thread.votes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="size-4" />
                {countComments(thread.comments)} Komentar
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
