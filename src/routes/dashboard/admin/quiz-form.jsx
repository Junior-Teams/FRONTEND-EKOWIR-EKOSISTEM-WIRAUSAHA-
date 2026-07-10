import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { useModuleQuery } from "@/hooks/admin/useModuleAdmin"
import {
  useCreateQuiz,
  useQuizQuery,
  useUpdateQuiz,
} from "@/hooks/admin/useQuizAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-6 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

export function Component() {
  const { moduleId, id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const moduleHref = `/dashboard/admin/modules/${moduleId}`

  const { data: currentUser } = useCurrentUser()
  const { data: module } = useModuleQuery(moduleId)
  const { data: quiz, isLoading } = useQuizQuery(id)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      createdBy: "",
      passingScore: "",
      bonusXp: "",
    },
  })

  // Only sync fetched quiz into the form once per record - see module-form.jsx
  // for why re-running reset() on every background-refetch reference change
  // would silently wipe out in-progress edits.
  const initializedIdRef = useRef(null)
  useEffect(() => {
    if (quiz && initializedIdRef.current !== quiz.ID) {
      initializedIdRef.current = quiz.ID
      reset({
        title: quiz.title,
        description: quiz.description,
        createdBy: quiz.created_by,
        passingScore: quiz.passing_score,
        bonusXp: quiz.bonus_xp,
      })
    }
  }, [quiz, reset])

  const createdByDefaultedRef = useRef(false)
  useEffect(() => {
    if (!isEditing && !createdByDefaultedRef.current && currentUser?.username) {
      createdByDefaultedRef.current = true
      setValue("createdBy", currentUser.username)
    }
  }, [isEditing, currentUser, setValue])

  function goToModule() {
    navigate(moduleHref)
  }

  const { mutate: createQuiz, isPending: isCreating } = useCreateQuiz({
    onSuccess: () => {
      toast.success("Quiz berhasil ditambahkan")
      queryClient.invalidateQueries({ queryKey: ["admin.quizzes"] })
      goToModule()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menambahkan quiz")
    },
  })

  const { mutate: updateQuiz, isPending: isUpdating } = useUpdateQuiz({
    onSuccess: () => {
      toast.success("Quiz berhasil diperbarui")
      queryClient.invalidateQueries({ queryKey: ["admin.quizzes"] })
      queryClient.invalidateQueries({ queryKey: ["admin.quizzes.detail", id] })
      goToModule()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal memperbarui quiz")
    },
  })

  function onSubmit(values) {
    const body = {
      title: values.title,
      description: values.description,
      created_by: values.createdBy,
      id_module: Number(moduleId),
      passing_score: Number(values.passingScore),
      bonus_xp: Number(values.bonusXp) || 0,
    }

    if (isEditing) {
      updateQuiz({ id, body })
      return
    }
    createQuiz(body)
  }

  const isSaving = isCreating || isUpdating

  if (isEditing && isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mx-auto h-96 w-full max-w-2xl" />
      </div>
    )
  }

  const title = isEditing ? "Edit Quiz" : "Tambah Quiz"
  const titleWithModule = module?.name_module ? `${title} — ${module.name_module}` : title

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Admin", href: "/dashboard/admin" },
          { label: "Modul", href: "/dashboard/admin/modules" },
          { label: module?.name_module ?? "Modul", href: moduleHref },
          { label: title },
        ]}
        backHref={moduleHref}
      />

      <div className={cn(cardClass, "flex w-full max-w-2xl flex-col gap-6 mx-auto")}>
        <div>
          <h1 className="font-heading text-xl font-bold">{titleWithModule}</h1>
          <p className="text-muted-foreground text-sm">
            {isEditing
              ? "Perbarui detail quiz."
              : "Lengkapi detail quiz baru."}
          </p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Judul Quiz</Label>
            <Input
              id="title"
              aria-invalid={Boolean(errors.title)}
              {...register("title", { required: "Judul wajib diisi" })}
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              rows={5}
              className="h-auto min-h-32 py-3"
              aria-invalid={Boolean(errors.description)}
              {...register("description", {
                required: "Deskripsi wajib diisi",
              })}
            />
            {errors.description && (
              <p className="text-destructive text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="createdBy">Dibuat Oleh</Label>
            <Input
              id="createdBy"
              aria-invalid={Boolean(errors.createdBy)}
              {...register("createdBy", {
                required: "Pembuat wajib diisi",
              })}
            />
            {errors.createdBy && (
              <p className="text-destructive text-sm">
                {errors.createdBy.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="passingScore">Skor Minimum Lulus (%)</Label>
              <Input
                id="passingScore"
                type="number"
                aria-invalid={Boolean(errors.passingScore)}
                {...register("passingScore", {
                  required: "Skor minimum wajib diisi",
                  valueAsNumber: true,
                  min: { value: 1, message: "Skor minimal 1" },
                  max: { value: 100, message: "Skor maksimal 100" },
                })}
              />
              {errors.passingScore && (
                <p className="text-destructive text-sm">
                  {errors.passingScore.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bonusXp">Bonus XP</Label>
              <Input
                id="bonusXp"
                type="number"
                aria-invalid={Boolean(errors.bonusXp)}
                {...register("bonusXp", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Bonus XP tidak boleh negatif" },
                })}
              />
              {errors.bonusXp && (
                <p className="text-destructive text-sm">
                  {errors.bonusXp.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              render={<Link to={moduleHref} />}
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
