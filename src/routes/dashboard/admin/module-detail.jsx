import { useQueryClient } from "@tanstack/react-query"
import { Eye,  Pencil, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router"

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
import { useDeleteMateri, useMaterisQuery } from "@/hooks/admin/useMateriAdmin"
import { useModuleQuery } from "@/hooks/admin/useModuleAdmin"
import { useDeleteQuiz, useQuizzesQuery } from "@/hooks/admin/useQuizAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-5 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

export function Component() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data: module, isLoading: isLoadingModule } = useModuleQuery(id)
  const { data: materis, isLoading: isLoadingMateris } = useMaterisQuery({
    idModule: id,
  })
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuizzesQuery({
    idModule: id,
  })

  const { mutate: deleteMateri } = useDeleteMateri({
    onSuccess: () => {
      toast.success("Materi berhasil dihapus")
      queryClient.invalidateQueries({ queryKey: ["admin.materis"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menghapus materi")
    },
  })

  const { mutate: deleteQuiz } = useDeleteQuiz({
    onSuccess: () => {
      toast.success("Quiz berhasil dihapus")
      queryClient.invalidateQueries({ queryKey: ["admin.quizzes"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menghapus quiz")
    },
  })

  function onDeleteMateri(materi) {
    if (!window.confirm(`Hapus materi "${materi.name}"?`)) return
    deleteMateri(materi.ID)
  }

  function onDeleteQuiz(quiz) {
    if (!window.confirm(`Hapus quiz "${quiz.title}"?`)) return
    deleteQuiz(quiz.ID)
  }

  if (isLoadingModule) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Admin", href: "/dashboard/admin" },
          { label: "Modul", href: "/dashboard/admin/modules" },
          { label: module?.name_module ?? "Modul" },
        ]}
        backHref="/dashboard/admin/modules"
      />

      <div className={cn(cardClass, "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between")}>
        <div>
          <span className="text-muted-foreground text-xs font-bold uppercase">
            {module?.code_module}
          </span>
          <h1 className="font-heading text-xl font-bold">{module?.name_module}</h1>
          <p className="text-muted-foreground mt-1 text-lg">
            {module?.description_module}
          </p>
        </div>
        <Button
          variant="outline"
          render={<Link to={`/dashboard/admin/modules/${id}/edit`} />}
          className={cn("shrink-0", NEO_BORDER, NEO_PRESS)}
        >
          <Pencil className="size-3.5" />
          Edit Modul
        </Button>
      </div>

      <div className={cn(cardClass, "flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold">Materi</h2>
          <Button
            render={<Link to={`/dashboard/admin/modules/${id}/materis/new`} />}
            className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            <Plus className="size-4" />
            Tambah Materi
          </Button>
        </div>

        {isLoadingMateris ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Konten</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materis?.length ? (
                materis.map((materi) => (
                  <TableRow key={materi.ID}>
                    <TableCell className="font-medium">{materi.name}</TableCell>
                    <TableCell className="max-w-md truncate">
                      {materi.array_element}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-lg"
                          title="Edit"
                          render={
                            <Link
                              to={`/dashboard/admin/modules/${id}/materis/${materi.ID}/edit`}
                            />
                          }
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-lg"
                          title="Hapus"
                          onClick={() => onDeleteMateri(materi)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground text-center">
                    Belum ada materi.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className={cn(cardClass, "flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold">Quiz</h2>
          <div className="flex gap-2">
          <Button
            render={<Link to={`/dashboard/admin/modules/${id}/quizzes/new`} />}
            className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            <Plus className="size-4" />
            Tambah Quiz
          </Button>
         
          </div>
        </div>

        {isLoadingQuizzes ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Dibuat Oleh</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes?.length ? (
                quizzes.map((quiz) => (
                  <TableRow key={quiz.ID}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell>{quiz.created_by}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-lg"
                          title="Soal"
                          render={
                            <Link to={`/dashboard/admin/quizzes/${quiz.ID}/questions`} />
                          }
                        >
                          
                           <Eye className="size-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-lg"
                          title="Edit"
                          render={
                            <Link
                              to={`/dashboard/admin/modules/${id}/quizzes/${quiz.ID}/edit`}
                            />
                          }
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-lg"
                          title="Hapus"
                          onClick={() => onDeleteQuiz(quiz)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground text-center">
                    Belum ada quiz.
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
