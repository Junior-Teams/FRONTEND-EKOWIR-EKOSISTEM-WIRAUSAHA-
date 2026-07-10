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
  useCreateReward,
  useRewardQuery,
  useUpdateReward,
} from "@/hooks/admin/useRewardAdmin"
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

  const { data: reward, isLoading } = useRewardQuery(id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { name: "", description: "", requiredXp: "" },
  })

  // Only sync fetched reward into the form once per record - a background
  // refetch (e.g. on window focus) returns a new object reference for the
  // same row, and re-running reset() on every reference change would
  // silently wipe out whatever the admin is mid-typing.
  const initializedIdRef = useRef(null)
  useEffect(() => {
    if (reward && initializedIdRef.current !== reward.ID) {
      initializedIdRef.current = reward.ID
      reset({
        name: reward.name,
        description: reward.description,
        requiredXp: reward.required_xp,
      })
    }
  }, [reward, reset])

  function goToList() {
    navigate("/dashboard/admin/reward")
  }

  const { mutate: createReward, isPending: isCreating } = useCreateReward({
    onSuccess: () => {
      toast.success("Hadiah berhasil ditambahkan")
      queryClient.invalidateQueries({ queryKey: ["admin.rewards"] })
      goToList()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menambahkan hadiah")
    },
  })

  const { mutate: updateReward, isPending: isUpdating } = useUpdateReward({
    onSuccess: () => {
      toast.success("Hadiah berhasil diperbarui")
      queryClient.invalidateQueries({ queryKey: ["admin.rewards"] })
      queryClient.invalidateQueries({ queryKey: ["admin.rewards.detail", id] })
      goToList()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal memperbarui hadiah")
    },
  })

  function onSubmit(values) {
    const body = {
      name: values.name,
      description: values.description,
      required_xp: Number(values.requiredXp),
    }

    if (isEditing) {
      updateReward({ id, body })
      return
    }
    createReward(body)
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

  const title = isEditing ? "Edit Hadiah" : "Tambah Hadiah"

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Admin", href: "/dashboard/admin" },
          { label: "Hadiah", href: "/dashboard/admin/reward" },
          { label: title },
        ]}
        backHref="/dashboard/admin/reward"
      />

      <div className={cn(cardClass, "flex w-full max-w-2xl flex-col gap-6 mx-auto")}>
        <div>
          <h1 className="font-heading text-xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm">
            {isEditing
              ? "Perbarui detail hadiah dan syarat XP-nya."
              : "Lengkapi detail hadiah baru dan syarat XP untuk menukarnya."}
          </p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nama Hadiah</Label>
            <Input
              id="name"
              placeholder="Voucher Rp50.000"
              aria-invalid={Boolean(errors.name)}
              {...register("name", { required: "Nama hadiah wajib diisi" })}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              rows={4}
              className="h-auto min-h-24 py-3"
              aria-invalid={Boolean(errors.description)}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-destructive text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="requiredXp">XP Dibutuhkan</Label>
            <Input
              id="requiredXp"
              type="number"
              aria-invalid={Boolean(errors.requiredXp)}
              {...register("requiredXp", {
                required: "XP yang dibutuhkan wajib diisi",
                valueAsNumber: true,
                min: { value: 1, message: "XP minimal 1" },
              })}
            />
            <p className="text-muted-foreground text-xs">
              Pengguna baru bisa menukar hadiah ini setelah XP mereka mencapai
              jumlah ini.
            </p>
            {errors.requiredXp && (
              <p className="text-destructive text-sm">
                {errors.requiredXp.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              render={<Link to="/dashboard/admin/reward" />}
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
