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
import {
  useCreateModule,
  useModuleQuery,
  useUpdateModule,
} from "@/hooks/admin/useModuleAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-6 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

export function Component() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: module, isLoading } = useModuleQuery(id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  // Only sync the fetched module into the form once per record - a background
  // refetch (e.g. on window focus) returns a new object reference for the same
  // row, and re-running reset() on every reference change would silently wipe
  // out whatever the admin is mid-typing.
  const initializedIdRef = useRef(null)
  useEffect(() => {
    if (module && initializedIdRef.current !== module.ID) {
      initializedIdRef.current = module.ID
      reset({
        codeModule: module.code_module,
        nameModule: module.name_module,
        descriptionModule: module.description_module,
      })
    }
  }, [module, reset])

  function goToList() {
    navigate("/dashboard/admin/modules")
  }

  const { mutate: createModule, isPending: isCreating } = useCreateModule({
    onSuccess: () => {
      toast.success("Modul berhasil ditambahkan")
      queryClient.invalidateQueries({ queryKey: ["admin.modules"] })
      goToList()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menambahkan modul")
    },
  })

  const { mutate: updateModule, isPending: isUpdating } = useUpdateModule({
    onSuccess: () => {
      toast.success("Modul berhasil diperbarui")
      queryClient.invalidateQueries({ queryKey: ["admin.modules"] })
      queryClient.invalidateQueries({ queryKey: ["admin.modules.detail", id] })
      goToList()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal memperbarui modul")
    },
  })

  function onSubmit(values) {
    if (isEditing) {
      updateModule({
        id,
        body: {
          code_module: values.codeModule,
          name_module: values.nameModule,
          description_module: values.descriptionModule,
        },
      })
      return
    }

    const imageFile = values.image?.[0]
    if (!imageFile) {
      toast.error("Gambar wajib diunggah")
      return
    }

    const formData = new FormData()
    formData.append("codeModule", values.codeModule)
    formData.append("nameModule", values.nameModule)
    formData.append("descriptionModule", values.descriptionModule)
    formData.append("image", imageFile)
    createModule(formData)
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

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Admin", href: "/dashboard/admin" },
          { label: "Modul", href: "/dashboard/admin/modules" },
          { label: isEditing ? "Edit Modul" : "Tambah Modul" },
        ]}
        backHref="/dashboard/admin/modules"
      />

      <div className={cn(cardClass, "flex w-full max-w-2xl flex-col gap-6 mx-auto")}>
        <div>
          <h1 className="font-heading text-xl font-bold">
            {isEditing ? "Edit Modul" : "Tambah Modul"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isEditing
              ? "Perbarui detail modul pembelajaran."
              : "Lengkapi detail modul pembelajaran baru."}
          </p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="codeModule">Kode Modul</Label>
            <Input
              id="codeModule"
              aria-invalid={Boolean(errors.codeModule)}
              {...register("codeModule", {
                required: "Kode modul wajib diisi",
              })}
            />
            {errors.codeModule && (
              <p className="text-destructive text-sm">
                {errors.codeModule.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="nameModule">Nama Modul</Label>
            <Input
              id="nameModule"
              aria-invalid={Boolean(errors.nameModule)}
              {...register("nameModule", {
                required: "Nama modul wajib diisi",
              })}
            />
            {errors.nameModule && (
              <p className="text-destructive text-sm">
                {errors.nameModule.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="descriptionModule">Deskripsi</Label>
            <Textarea
              id="descriptionModule"
              rows={6}
              className="h-auto min-h-36 py-3"
              aria-invalid={Boolean(errors.descriptionModule)}
              {...register("descriptionModule", {
                required: "Deskripsi wajib diisi",
              })}
            />
            {errors.descriptionModule && (
              <p className="text-destructive text-sm">
                {errors.descriptionModule.message}
              </p>
            )}
          </div>

          {!isEditing && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Gambar</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              render={<Link to="/dashboard/admin/modules" />}
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
