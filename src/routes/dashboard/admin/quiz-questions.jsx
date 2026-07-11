import { useQueryClient } from "@tanstack/react-query"
import { Pencil, Plus, Trash2 } from "lucide-react"
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
import { useQuizQuery } from "@/hooks/admin/useQuizAdmin"
import {
  useDeleteQuestion,
  useQuestionsQuery,
} from "@/hooks/admin/useQuestionAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-5 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

export function Component() {
  const { quizId } = useParams()
  const queryClient = useQueryClient()
  const { data: quiz } = useQuizQuery(quizId)
  const { data: questions, isLoading } = useQuestionsQuery({ idQuiz: quizId })

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["admin.questions", quizId] })
  }

  const { mutate: deleteQuestion } = useDeleteQuestion({
    onSuccess: () => {
      toast.success("Soal berhasil dihapus")
      invalidate()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menghapus soal")
    },
  })

  function onDelete(question) {
    if (!window.confirm("Hapus soal ini?")) return
    deleteQuestion(question.ID)
  }

  const moduleHref = quiz?.id_module ? `/dashboard/admin/modules/${quiz.id_module}` : "/dashboard/admin/modules"

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Modul", href: "/dashboard/admin/modules" },
          { label: quiz?.Module?.name_module ?? "Modul", href: moduleHref },
          { label: quiz?.title ?? "Soal" },
        ]}
        backHref={moduleHref}
      />

      <div className={cn(cardClass, "flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-bold">
            Kelola Soal{quiz?.title ? ` — ${quiz.title}` : ""}
          </h1>

          <Button
            render={<Link to={`/dashboard/admin/quizzes/${quizId}/questions/new`} />}
            className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            <Plus className="size-4" />
            Tambah Soal
          </Button>
        </div>

        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pertanyaan</TableHead>
                <TableHead>Jawaban Benar</TableHead>
                <TableHead>Poin</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions?.length ? (
                questions.map((question) => (
                  <TableRow key={question.ID}>
                    <TableCell className="max-w-sm truncate font-medium">
                      {question.question_text}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {question.options?.find((option) => option.is_correct)
                        ?.option_text ?? "-"}
                    </TableCell>
                    <TableCell>{question.point}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-lg"
                          title="Edit"
                          render={
                            <Link
                              to={`/dashboard/admin/quizzes/${quizId}/questions/${question.ID}/edit`}
                            />
                          }
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-lg"
                          title="Hapus"
                          onClick={() => onDelete(question)}
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
                    Belum ada soal.
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
