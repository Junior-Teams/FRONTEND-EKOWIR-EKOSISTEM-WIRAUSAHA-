import { useQueryClient } from "@tanstack/react-query"
import { Eye, Pencil, Plus, Trash2 } from "lucide-react"
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
import { useDeleteModule, useModulesQuery } from "@/hooks/admin/useModuleAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-5 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

export function Component() {
  const queryClient = useQueryClient()
  const { data: modules, isLoading } = useModulesQuery()

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["admin.modules"] })
  }

  const { mutate: deleteModule } = useDeleteModule({
    onSuccess: () => {
      toast.success("Modul berhasil dihapus")
      invalidate()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menghapus modul")
    },
  })

  function onDelete(module) {
    if (!window.confirm(`Hapus modul "${module.name_module}"?`)) return
    deleteModule(module.ID)
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Admin", href: "/dashboard/admin" },
          { label: "Modul" },
        ]}
      />

      <div className={cn(cardClass, "flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-bold">Kelola Modul</h1>

          <Button
            render={<Link to="/dashboard/admin/modules/new" />}
            className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            <Plus className="size-4" />
            Tambah Modul
          </Button>
          {/* <Button
          render={<Link to={`/dashboard/admin/modules/${module.ID}`} />}
          className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            Kelola Materi dan Quiz
          </Button> */}
        </div>

        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules?.length ? (
                modules.map((module) => (
                  <TableRow key={module.ID}>
                    <TableCell className="font-medium">
                      {module.code_module}
                    </TableCell>
                    <TableCell>{module.name_module}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {module.description_module}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                   <Button
                          variant="outline"
                          size="icon-lg"
                          title="Kelola Materi dan Quiz"
                          render={
                            <Link to={`/dashboard/admin/modules/${module.ID}`} />
                          }
                        >
                          <Eye className="size-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-lg"
                          title="Edit"
                          render={
                            <Link to={`/dashboard/admin/modules/${module.ID}/edit`} />
                          }
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-lg"
                          title="Hapus"
                          onClick={() => onDelete(module)}
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
                    Belum ada modul.
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
