import { Activity, BookOpen, Gift, MessagesSquare, Sparkles, Trophy } from "lucide-react"
import { Link, Navigate } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { ActivityChart } from "@/components/charts/dashboard-charts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { useMyActivityQuery } from "@/hooks/dashboard/useMyActivity"
import { useLeaderboardQuery } from "@/hooks/leaderboard/useLeaderboard"
import { useTiersQuery } from "@/hooks/tiers/useTiers"
import { getTierProgress } from "@/lib/gamification"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white ring-0 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

const QUICK_LINKS = [
  {
    title: "Belajar",
    description: "Lanjutkan modul dan kumpulkan XP dari kuis.",
    href: "/dashboard/belajar",
    icon: BookOpen,
  },
  {
    title: "Forum",
    description: "Diskusi dan berbagi pengalaman dengan anggota lain.",
    href: "/dashboard/forum",
    icon: MessagesSquare,
  },
  {
    title: "Redeem Hadiah",
    description: "Tukarkan XP kamu dengan hadiah menarik.",
    href: "/dashboard/redeem",
    icon: Gift,
  },
]

export function Component() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const { data: leaderboard, isLoading: isLeaderboardLoading } = useLeaderboardQuery({
    limit: 100,
  })
  const { data: tiers, isLoading: isTiersLoading } = useTiersQuery()
  const { data: activity, isLoading: isActivityLoading } = useMyActivityQuery()

  const rankEntry = leaderboard?.find((entry) => entry.id === user?.id)
  const isLoading = isUserLoading || isLeaderboardLoading

  const { current, next, percent } = getTierProgress(user?.xp ?? 0, tiers)

  // Admin lands on their own dashboard - /dashboard is the shared post-login
  // destination (email login and the Google OAuth callback both point here).
  if (user?.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />
  }

  const stats = [
    { label: "Total XP", value: user?.xp?.toLocaleString("id-ID") ?? "0" },
    { label: "Tier Saat Ini", value: user?.tier?.name ?? current?.name ?? "Belum ada tier" },
    { label: "Peringkat", value: rankEntry ? `#${rankEntry.rank}` : "-" },
  ]

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={[{ label: "Beranda" }]} />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={cn("rounded-lg bg-blue-100 ring-0 dark:bg-blue-950", NEO_BORDER, NEO_SHADOW)}
          >
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5" />
            Progres Tier
          </CardTitle>
          <CardDescription>
            {isTiersLoading
              ? "Memuat progres tier..."
              : next
                ? `${next.point - (user?.xp ?? 0)} XP lagi menuju tier ${next.name}`
                : tiers?.length
                  ? "Kamu sudah mencapai tier tertinggi!"
                  : "Belum ada tier yang dikonfigurasi."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={cn("h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800", NEO_BORDER)}>
            <div
              className="h-full bg-eko-primary transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5" />
            Aktivitas 7 Hari Terakhir
          </CardTitle>
          <CardDescription>
            Materi yang kamu selesaikan, kuis yang lulus, dan komentar forum per
            hari.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isActivityLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <ActivityChart data={activity} />
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "flex flex-col gap-2 rounded-lg bg-white p-4 dark:bg-neutral-900",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg bg-eko-tertiary",
                NEO_BORDER
              )}
            >
              <link.icon className="size-4" />
            </div>
            <h3 className="font-heading text-base font-bold">{link.title}</h3>
            <p className="text-muted-foreground text-sm">{link.description}</p>
          </Link>
        ))}
      </div>

      {!isLoading && !rankEntry && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg bg-white p-4 text-sm dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <Sparkles className="text-muted-foreground size-4 shrink-0" />
          <p className="text-muted-foreground">
            Kumpulkan lebih banyak XP dari kuis dan forum untuk masuk ke papan peringkat.
          </p>
        </div>
      )}
    </div>
  )
}
