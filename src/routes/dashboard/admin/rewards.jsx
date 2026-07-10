import { useQueryClient } from "@tanstack/react-query"
import { Pencil, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { Link } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeleteReward, useRewardsQuery } from "@/hooks/admin/useRewardAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-5 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

export function Component() {
  const queryClient = useQueryClient()
  const { data: rewards, isLoading } = useRewardsQuery()

  const { mutate: deleteReward } = useDeleteReward({
    onSuccess: () => {
      toast.success("Hadiah berhasil dihapus")
      queryClient.invalidateQueries({ queryKey: ["admin.rewards"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menghapus hadiah")
    },
  })

  function onDelete(reward) {
    if (!window.confirm(`Hapus hadiah "${reward.name}"?`)) return
    deleteReward(reward.ID)
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Admin", href: "/dashboard/admin" },
          { label: "Hadiah" },
        ]}
      />

      <div className={cn(cardClass, "flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-bold">Kelola Hadiah</h1>

          <Button
            render={<Link to="/dashboard/admin/reward/new" />}
            className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            <Plus className="size-4" />
            Tambah Hadiah
          </Button>
        </div>

        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>XP Dibutuhkan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rewards?.length ? (
                rewards.map((reward) => (
                  <TableRow key={reward.ID}>
                    <TableCell className="font-medium">{reward.name}</TableCell>
                    <TableCell className="max-w-sm truncate">
                      {reward.description}
                    </TableCell>
                    <TableCell>{reward.required_xp}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          title="Edit"
                          render={
                            <Link to={`/dashboard/admin/reward/${reward.ID}/edit`} />
                          }
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          title="Hapus"
                          onClick={() => onDelete(reward)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-muted-foreground text-center">
                    Belum ada hadiah.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
