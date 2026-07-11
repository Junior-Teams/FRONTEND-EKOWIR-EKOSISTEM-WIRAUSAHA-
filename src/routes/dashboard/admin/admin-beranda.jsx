import {
  Activity,
  ArrowRight,
  BookOpen,
  ChartColumn,
  ClipboardList,
  Gift,
  MessageCircle,
  MessagesSquare,
  Package,
  Trophy,
  Users,
} from "lucide-react"
import { Link } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { ActivityChart, CountBarChart } from "@/components/charts/dashboard-charts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAdminDashboardQuery } from "@/hooks/admin/useAdminDashboard"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const chartCardClass = cn(
  "rounded-lg bg-white ring-0 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

const STAT_CARDS = [
  { key: "users", label: "Pengguna", icon: Users, href: "/dashboard/admin/pengguna" },
  { key: "modules", label: "Modul", icon: Package, href: "/dashboard/admin/modules" },
  { key: "materis", label: "Materi", icon: BookOpen, href: "/dashboard/admin/modules" },
  { key: "quizzes", label: "Kuis", icon: ClipboardList, href: "/dashboard/admin/modules" },
  { key: "forums", label: "Forum", icon: MessagesSquare, href: "/dashboard/forum" },
  { key: "comments", label: "Komentar", icon: MessageCircle, href: "/dashboard/forum" },
  { key: "rewards", label: "Hadiah", icon: Gift, href: "/dashboard/admin/reward" },
  { key: "reward_claims", label: "Klaim Hadiah", icon: Trophy, href: "/dashboard/admin/reward" },
]

const MONTH_SHORT = new Intl.DateTimeFormat("id-ID", { month: "short" })
const MONTH_LONG = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" })

// "2026-07" -> a local Date on the 1st of that month.
function parseMonth(value) {
  const [year, month] = value.split("-").map(Number)
  return new Date(year, month - 1, 1)
}

export function Component() {
  const { data: dashboard, isLoading } = useAdminDashboardQuery()

  const registrations = (dashboard?.registrations_per_month ?? []).map((row) => ({
    ...row,
    label: MONTH_SHORT.format(parseMonth(row.month)),
  }))
  const usersPerTier = (dashboard?.users_per_tier ?? []).map((row) => ({
    ...row,
    label: row.tier,
  }))

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={[{ label: "Dashboard" }]} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((stat) => (
          <Card
            key={stat.key}
            className={cn(
              "gap-3 rounded-lg bg-blue-100 ring-0 dark:bg-blue-950",
              NEO_BORDER,
              NEO_SHADOW
            )}
          >
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <stat.icon className="size-4" />
                {stat.label}
              </CardDescription>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <CardTitle className="text-2xl font-bold">
                  {(dashboard?.counts?.[stat.key] ?? 0).toLocaleString("id-ID")}
                </CardTitle>
              )}
            </CardHeader>
            <CardContent>
              <Link
                to={stat.href}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold dark:bg-neutral-900",
                  NEO_BORDER,
                  NEO_PRESS
                )}
              >
                Lihat semua
                <ArrowRight className="size-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className={chartCardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartColumn className="size-5" />
              Pendaftaran Pengguna
            </CardTitle>
            <CardDescription>
              Pengguna baru per bulan dalam 6 bulan terakhir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <CountBarChart
                data={registrations}
                seriesLabel="Pendaftar"
                labelFormatter={(value, payload) => {
                  const month = payload?.[0]?.payload?.month
                  return month ? MONTH_LONG.format(parseMonth(month)) : value
                }}
              />
            )}
          </CardContent>
        </Card>

        <Card className={chartCardClass}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-5" />
              Pengguna per Tier
            </CardTitle>
            <CardDescription>
              Sebaran pengguna berdasarkan tier yang sudah dicapai.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <CountBarChart data={usersPerTier} seriesLabel="Pengguna" />
            )}
          </CardContent>
        </Card>
      </div>

      <Card className={chartCardClass}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5" />
            Aktivitas Platform
          </CardTitle>
          <CardDescription>
            Materi selesai, kuis lulus, dan komentar forum per hari dalam 7 hari
            terakhir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <ActivityChart data={dashboard?.activity_per_day} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
