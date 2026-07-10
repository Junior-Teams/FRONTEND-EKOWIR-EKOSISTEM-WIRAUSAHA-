import { Card, CardContent } from "@/components/ui/card"
import { NEO_BORDER, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const LEADERBOARD = [
  { rank: 1, name: "Ayu Lestari", points: 2450 },
  { rank: 2, name: "Budi Santoso", points: 2310 },
  { rank: 3, name: "Citra Dewi", points: 2190 },
  { rank: 4, name: "Dimas Prakoso", points: 1980 },
  { rank: 5, name: "Eka Putri", points: 1875 },
  { rank: 6, name: "Fajar Nugroho", points: 1740 },
]

const RANK_BADGE = {
  1: "bg-amber-300",
  2: "bg-slate-300",
  3: "bg-orange-300",
}

export function Component() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      {LEADERBOARD.map((entry) => (
        <Card
          key={entry.rank}
          className={cn(
            "rounded-lg bg-white ring-0 dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
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
            <span className="flex-1 font-medium">{entry.name}</span>
            <span className="font-bold">{entry.points.toLocaleString("id-ID")} pts</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
