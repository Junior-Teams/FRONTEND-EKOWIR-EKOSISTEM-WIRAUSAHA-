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
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { useDeleteUser, useUsersQuery } from "@/hooks/admin/useUserAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-5 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

const roleBadgeClass = {
  admin: "bg-amber-200 dark:bg-amber-800",
  user: "bg-sky-200 dark:bg-sky-800",
}

export function Component() {
  const queryClient = useQueryClient()
  const { data: currentUser } = useCurrentUser()
  const { data: users, isLoading } = useUsersQuery()

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["admin.users"] })
  }

  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      toast.success("Pengguna berhasil dihapus")
      invalidate()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menghapus pengguna")
    },
  })

  function onDelete(user) {
    if (!window.confirm(`Hapus pengguna "${user.username}"?`)) return
    deleteUser(user.ID)
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Admin", href: "/dashboard/admin" },
          { label: "Pengguna" },
        ]}
      />

      <div className={cn(cardClass, "flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-bold">Kelola Pengguna</h1>

          <Button
            render={<Link to="/dashboard/admin/pengguna/new" />}
            className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            <Plus className="size-4" />
            Tambah Pengguna
          </Button>
        </div>

        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.length ? (
                users.map((user) => {
                  const isSelf = user.ID === currentUser?.id
                  return (
                    <TableRow key={user.ID}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-semibold",
                            roleBadgeClass[user.role] ?? roleBadgeClass.user
                          )}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            title="Edit"
                            render={
                              <Link to={`/dashboard/admin/pengguna/${user.ID}/edit`} />
                            }
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            title={isSelf ? "Tidak bisa menghapus akun sendiri" : "Hapus"}
                            disabled={isSelf}
                            onClick={() => onDelete(user)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground text-center">
                    Belum ada pengguna.
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
