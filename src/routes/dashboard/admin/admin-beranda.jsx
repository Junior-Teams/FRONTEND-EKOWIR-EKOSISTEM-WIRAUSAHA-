import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useModulesQuery } from "@/hooks/admin/useModuleAdmin"
import { useUsersQuery } from "@/hooks/admin/useUserAdmin"
import { REWARDS } from "@/lib/rewards"
import { NEO_BORDER, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

export function Component() {
  const { data: users, isLoading: isLoadingUsers } = useUsersQuery()
  const { data: modules, isLoading: isLoadingModules } = useModulesQuery()

  const stats = [
    {
      label: "Jumlah Pengguna",
      value: users?.length ?? 0,
      isLoading: isLoadingUsers,
    },
    {
      label: "Jumlah Modul",
      value: modules?.length ?? 0,
      isLoading: isLoadingModules,
    },
    {
      label: "Jumlah Hadiah",
      value: REWARDS.length,
      isLoading: false,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={cn(
            "rounded-lg bg-blue-100 ring-0 dark:bg-blue-950",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            {stat.isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
