import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Plus, Trash2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { useQuizQuery } from "@/hooks/admin/useQuizAdmin"
import {
  useCreateQuestion,
  useQuestionQuery,
  useUpdateQuestion,
} from "@/hooks/admin/useQuestionAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-6 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

const MIN_OPTIONS = 2

export function Component() {
  const { quizId, id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: quiz } = useQuizQuery(quizId)
  const { data: question, isLoading } = useQuestionQuery(id)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      questionText: "",
      point: "",
      correctIndex: "",
      options: [{ optionText: "" }, { optionText: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: "options" })

  // Only sync fetched question into the form once per record - see
  // module-form.jsx for why re-running reset() on every background-refetch
  // reference change would silently wipe out in-progress edits.
  const initializedIdRef = useRef(null)
  useEffect(() => {
    if (question && initializedIdRef.current !== question.ID) {
      initializedIdRef.current = question.ID
      reset({
        questionText: question.question_text,
        point: question.point,
        correctIndex: String(
          Math.max(
            question.options.findIndex((option) => option.is_correct),
            0
          )
        ),
        options: question.options.map((option) => ({
          optionText: option.option_text,
        })),
      })
    }
  }, [question, reset])

  function goToList() {
    navigate(`/dashboard/admin/quizzes/${quizId}/questions`)
  }

  const { mutate: createQuestion, isPending: isCreating } = useCreateQuestion({
    onSuccess: () => {
      toast.success("Soal berhasil ditambahkan")
      queryClient.invalidateQueries({ queryKey: ["admin.questions"] })
      goToList()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menambahkan soal")
    },
  })

  const { mutate: updateQuestion, isPending: isUpdating } = useUpdateQuestion({
    onSuccess: () => {
      toast.success("Soal berhasil diperbarui")
      queryClient.invalidateQueries({ queryKey: ["admin.questions"] })
      queryClient.invalidateQueries({ queryKey: ["admin.questions.detail", id] })
      goToList()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal memperbarui soal")
    },
  })

  function onSubmit(values) {
    const correctIndex = Number(values.correctIndex)
    const options = values.options.map((option, index) => ({
      option_text: option.optionText,
      is_correct: index === correctIndex,
    }))

    const body = {
      question_text: values.questionText,
      point: Number(values.point),
      id_quiz: Number(quizId),
      options,
    }

    if (isEditing) {
      updateQuestion({ id, body })
      return
    }
    createQuestion(body)
  }

  const isSaving = isCreating || isUpdating
  const listHref = `/dashboard/admin/quizzes/${quizId}/questions`
  const moduleHref = quiz?.id_module ? `/dashboard/admin/modules/${quiz.id_module}` : "/dashboard/admin/modules"

  if (isEditing && isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mx-auto h-96 w-full max-w-2xl" />
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
          { label: quiz?.Module?.name_module ?? "Modul", href: moduleHref },
          { label: quiz?.title ?? "Soal", href: listHref },
          { label: isEditing ? "Edit Soal" : "Tambah Soal" },
        ]}
        backHref={listHref}
      />

      <div className={cn(cardClass, "flex w-full max-w-2xl flex-col gap-6 mx-auto")}>
        <div>
          <h1 className="font-heading text-xl font-bold">
            {isEditing ? "Edit Soal" : "Tambah Soal"}
            {quiz?.title ? ` — ${quiz.title}` : ""}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isEditing
              ? "Perbarui detail soal."
              : "Lengkapi detail soal baru."}
          </p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="questionText">Pertanyaan</Label>
            <Textarea
              id="questionText"
              rows={5}
              className="h-auto min-h-32 py-3"
              aria-invalid={Boolean(errors.questionText)}
              {...register("questionText", {
                required: "Pertanyaan wajib diisi",
              })}
            />
            {errors.questionText && (
              <p className="text-destructive text-sm">
                {errors.questionText.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="point">Poin</Label>
            <Input
              id="point"
              type="number"
              aria-invalid={Boolean(errors.point)}
              {...register("point", {
                required: "Poin wajib diisi",
                valueAsNumber: true,
                min: { value: 1, message: "Poin minimal 1" },
              })}
            />
            {errors.point && (
              <p className="text-destructive text-sm">{errors.point.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Pilihan Jawaban</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={cn(NEO_BORDER, NEO_PRESS)}
                onClick={() => append({ optionText: "" })}
              >
                <Plus className="size-3.5" />
                Tambah Pilihan
              </Button>
            </div>

            <p className="text-muted-foreground text-xs">
              Pilih satu jawaban yang benar dengan tombol radio di sebelah kiri.
            </p>

            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-3">
                  <input
                    type="radio"
                    value={index}
                    className="size-4 accent-eko-primary"
                    aria-label={`Tandai pilihan ${index + 1} sebagai benar`}
                    {...register("correctIndex", {
                      required: "Pilih satu jawaban yang benar",
                    })}
                  />
                  <Input
                    placeholder={`Pilihan ${index + 1}`}
                    aria-invalid={Boolean(errors.options?.[index]?.optionText)}
                    {...register(`options.${index}.optionText`, {
                      required: "Teks pilihan wajib diisi",
                    })}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    title="Hapus pilihan"
                    disabled={fields.length <= MIN_OPTIONS}
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
            {errors.options && (
              <p className="text-destructive text-sm">
                Setiap pilihan wajib diisi.
              </p>
            )}
            {errors.correctIndex && (
              <p className="text-destructive text-sm">
                {errors.correctIndex.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              render={<Link to={listHref} />}
              className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
            >
              {isSaving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
