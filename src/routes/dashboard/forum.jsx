import { useQueryClient } from "@tanstack/react-query"
import { MessageCircle, MessagesSquare, Plus } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { MateriEditor } from "@/components/materi/materi-editor"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useModulesQuery } from "@/hooks/admin/useModuleAdmin"
import { useCreateForum, useForumsQuery } from "@/hooks/forum/useForum"
import { getAvatarColor } from "@/lib/avatar"
import { showGamificationToast } from "@/lib/gamification"
import {
  getMateriContentText,
  isMateriContentEmpty,
} from "@/lib/materi-content"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

function NewThreadDialog() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data: modules } = useModulesQuery()
  const moduleOptions =
    modules?.map((module) => ({
      value: String(module.ID),
      label: module.name_module,
    })) ?? []

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  const { mutate: createForum, isPending } = useCreateForum({
    onSuccess: (data) => {
      toast.success("Diskusi berhasil dibuat")
      showGamificationToast(data.gamification)
      queryClient.invalidateQueries({ queryKey: ["forum.threads"] })
      setOpen(false)
      reset({ title: "", description: "", id_module: "" })
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal membuat diskusi")
    },
  })

  function onSubmit(values) {
    createForum({
      title: values.title,
      description: values.description,
      id_module: Number(values.id_module),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}>
            <Plus className="size-4" />
            Buat Diskusi
          </Button>
        }
      />
      <DialogContent
        className={cn(
          "max-h-[90svh] overflow-y-auto sm:max-w-2xl",
          NEO_BORDER,
          NEO_SHADOW
        )}
      >
        <DialogHeader>
          <DialogTitle>Buat Diskusi Baru</DialogTitle>
          <DialogDescription>
            Ajukan pertanyaan atau mulai diskusi dengan anggota lain.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Judul</Label>
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
            <Controller
              name="description"
              control={control}
              rules={{
                validate: (value) =>
                  !isMateriContentEmpty(value) || "Deskripsi wajib diisi",
              }}
              render={({ field }) => (
                <MateriEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.description && (
              <p className="text-destructive text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="id_module">Modul Terkait</Label>
            <Controller
              name="id_module"
              control={control}
              rules={{ required: "Modul wajib dipilih" }}
              render={({ field }) => (
                <Select
                  inputId="id_module"
                  options={moduleOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Pilih modul"
                  isInvalid={Boolean(errors.id_module)}
                />
              )}
            />
            {errors.id_module && (
              <p className="text-destructive text-sm">{errors.id_module.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending} className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}>
              {isPending ? "Membuat..." : "Buat Diskusi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function Component() {
  const { data: threads, isLoading } = useForumsQuery()

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Forum" }]}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Forum</h1>
          <p className="text-muted-foreground text-sm">
            Diskusi seputar pengelolaan koperasi bersama sesama anggota.
          </p>
        </div>
        <NewThreadDialog />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full" />
          ))}
        </div>
      ) : threads?.length ? (
        <div className="flex flex-col gap-3">
          {threads.map((thread) => {
            const authorName = thread.user?.name || thread.created_by
            return (
              <Link
                key={thread.ID}
                to={`/dashboard/forum/${thread.ID}`}
                className={cn(
                  "flex flex-col gap-2 rounded-lg bg-white p-4 dark:bg-neutral-900",
                  NEO_BORDER,
                  NEO_SHADOW,
                  NEO_PRESS
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        NEO_BORDER,
                        getAvatarColor(authorName)
                      )}
                    >
                      {authorName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-muted-foreground text-xs">{authorName}</span>
                    {thread.user?.tier?.name && (
                      <span
                        className={cn(
                          "rounded-full bg-eko-secondary px-1.5 py-0.5 text-[9px] font-bold uppercase",
                          NEO_BORDER
                        )}
                      >
                        {thread.user.tier.name}
                      </span>
                    )}
                  </div>
                  {thread.Module?.name_module && (
                    <span
                      className={cn(
                        "rounded-full bg-eko-secondary px-2 py-0.5 text-[10px] font-bold uppercase",
                        NEO_BORDER
                      )}
                    >
                      {thread.Module.name_module}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-base leading-snug font-bold">
                  {thread.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {getMateriContentText(thread.description)}
                </p>

                <div className="mt-1 flex items-center gap-4 border-t-2 border-black pt-3 text-xs font-bold dark:border-white">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-4" />
                    {thread.comment_count ?? 0} Komentar
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center gap-2 rounded-lg bg-white p-10 text-center dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <MessagesSquare className="text-muted-foreground size-8" />
          <p className="text-muted-foreground text-sm">
            Belum ada diskusi. Jadilah yang pertama memulai!
          </p>
        </div>
      )}
    </div>
  )
}
