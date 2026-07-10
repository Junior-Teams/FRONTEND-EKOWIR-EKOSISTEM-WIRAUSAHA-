import { Trophy } from "lucide-react"

import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { useLeaderboardQuery } from "@/hooks/leaderboard/useLeaderboard"
import { NEO_BORDER, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const RANK_BADGE = {
  1: "bg-amber-300",
  2: "bg-slate-300",
  3: "bg-orange-300",
}

export function Component() {
  const { data: user } = useCurrentUser()
  const { data: leaderboard, isLoading } = useLeaderboardQuery({ limit: 50 })

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Leaderboard" }]}
      />

      {isLoading ? (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : leaderboard?.length ? (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          {leaderboard.map((entry) => {
            const isSelf = entry.id === user?.id
            return (
              <Card
                key={entry.id}
                className={cn(
                  "rounded-lg bg-white ring-0 dark:bg-neutral-900",
                  NEO_BORDER,
                  NEO_SHADOW,
                  isSelf && "ring-2 ring-eko-primary"
                )}
              >
                <CardContent className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg font-bold",
                      NEO_BORDER,
                      RANK_BADGE[entry.rank] ?? "bg-blue-100 dark:bg-blue-950"
                    )}
                  >
                    {entry.rank}
                  </div>
                  {entry.picture ? (
                    <img
                      src={entry.picture}
                      alt=""
                      className={cn("size-9 shrink-0 rounded-full object-cover", NEO_BORDER)}
                    />
                  ) : null}
                  <div className="flex-1">
                    <span className="font-medium">
                      {entry.name || entry.username}
                      {isSelf && (
                        <span className="text-muted-foreground font-normal"> (kamu)</span>
                      )}
                    </span>
                    {entry.tier?.name && (
                      <span
                        className={cn(
                          "ml-2 rounded-full bg-eko-secondary px-2 py-0.5 text-[10px] font-bold uppercase",
                          NEO_BORDER
                        )}
                      >
                        {entry.tier.name}
                      </span>
                    )}
                  </div>
                  <span className="font-bold">{entry.xp.toLocaleString("id-ID")} XP</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center gap-2 rounded-lg bg-white p-10 text-center dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <Trophy className="text-muted-foreground size-8" />
          <p className="text-muted-foreground text-sm">Belum ada peringkat untuk ditampilkan.</p>
        </div>
      )}
    </div>
  )
}
