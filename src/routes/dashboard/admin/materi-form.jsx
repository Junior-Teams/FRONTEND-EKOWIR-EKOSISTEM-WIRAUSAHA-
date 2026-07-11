import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { MateriEditor } from "@/components/materi/materi-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  useCreateMateri,
  useMateriQuery,
  useUpdateMateri,
} from "@/hooks/admin/useMateriAdmin"
import { useModuleQuery } from "@/hooks/admin/useModuleAdmin"
import { isMateriContentEmpty } from "@/lib/materi-content"
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

  const { data: module } = useModuleQuery(moduleId)
  const { data: materi, isLoading } = useMateriQuery(id)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { name: "", arrayElement: "" } })

  // Only sync fetched materi into the form once per record - see module-form.jsx
  // for why re-running reset() on every background-refetch reference change
  // would silently wipe out in-progress edits.
  const initializedIdRef = useRef(null)
  useEffect(() => {
    if (materi && initializedIdRef.current !== materi.ID) {
      initializedIdRef.current = materi.ID
      reset({ name: materi.name, arrayElement: materi.array_element })
    }
  }, [materi, reset])

  function goToModule() {
    navigate(moduleHref)
  }

  const { mutate: createMateri, isPending: isCreating } = useCreateMateri({
    onSuccess: () => {
      toast.success("Materi berhasil ditambahkan")
      queryClient.invalidateQueries({ queryKey: ["admin.materis"] })
      goToModule()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menambahkan materi")
    },
  })

  const { mutate: updateMateri, isPending: isUpdating } = useUpdateMateri({
    onSuccess: () => {
      toast.success("Materi berhasil diperbarui")
      queryClient.invalidateQueries({ queryKey: ["admin.materis"] })
      queryClient.invalidateQueries({ queryKey: ["admin.materis.detail", id] })
      goToModule()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal memperbarui materi")
    },
  })

  function onSubmit(values) {
    const body = {
      name: values.name,
      array_element: values.arrayElement,
      id_module: Number(moduleId),
    }

    if (isEditing) {
      updateMateri({ id, body })
      return
    }
    createMateri(body)
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

  const title = isEditing ? "Edit Materi" : "Tambah Materi"
  const titleWithModule = module?.name_module ? `${title} — ${module.name_module}` : title

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
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
              ? "Perbarui detail materi pembelajaran."
              : "Lengkapi detail materi pembelajaran baru."}
          </p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nama Materi</Label>
            <Input
              id="name"
              aria-invalid={Boolean(errors.name)}
              {...register("name", { required: "Nama materi wajib diisi" })}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="arrayElement">Konten</Label>
            <Controller
              name="arrayElement"
              control={control}
              rules={{
                validate: (value) =>
                  !isMateriContentEmpty(value) || "Konten wajib diisi",
              }}
              render={({ field }) => (
                <MateriEditor value={field.value} onChange={field.onChange} />
              )}
            />
            <p className="text-muted-foreground text-xs">
              Gunakan toolbar untuk menambahkan heading, daftar, tabel, hingga
              video YouTube.
            </p>
            {errors.arrayElement && (
              <p className="text-destructive text-sm">
                {errors.arrayElement.message}
              </p>
            )}
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
