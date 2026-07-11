import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  useCreateUser,
  useUpdateUser,
  useUserQuery,
} from "@/hooks/admin/useUserAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const cardClass = cn(
  "rounded-lg bg-white p-6 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ROLE_OPTIONS = [
  { value: "user", label: "user" },
  { value: "admin", label: "admin" },
]

export function Component() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useUserQuery(id)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  // Only sync fetched user into the form once per record - see module-form.jsx
  // for why re-running reset() on every background-refetch reference change
  // would silently wipe out in-progress edits.
  const initializedIdRef = useRef(null)
  useEffect(() => {
    if (isEditing && user && initializedIdRef.current !== user.ID) {
      initializedIdRef.current = user.ID
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        password: "",
      })
    } else if (!isEditing && initializedIdRef.current !== "new") {
      initializedIdRef.current = "new"
      reset({ name: "", username: "", email: "", role: "user", password: "" })
    }
  }, [isEditing, user, reset])

  function goToList() {
    navigate("/dashboard/admin/pengguna")
  }

  const { mutate: createUser, isPending: isCreating } = useCreateUser({
    onSuccess: () => {
      toast.success("Pengguna berhasil ditambahkan")
      queryClient.invalidateQueries({ queryKey: ["admin.users"] })
      goToList()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menambahkan pengguna")
    },
  })

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser({
    onSuccess: () => {
      toast.success("Pengguna berhasil diperbarui")
      queryClient.invalidateQueries({ queryKey: ["admin.users"] })
      queryClient.invalidateQueries({ queryKey: ["admin.users.detail", id] })
      goToList()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal memperbarui pengguna")
    },
  })

  function onSubmit(values) {
    if (isEditing) {
      const body = {
        name: values.name,
        username: values.username,
        email: values.email,
        role: values.role,
      }
      if (values.password) {
        body.password = values.password
      }
      updateUser({ id, body })
      return
    }

    createUser({
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role,
    })
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
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Pengguna", href: "/dashboard/admin/pengguna" },
          { label: isEditing ? "Edit Pengguna" : "Tambah Pengguna" },
        ]}
        backHref="/dashboard/admin/pengguna"
      />

      <div className={cn(cardClass, "flex w-full max-w-2xl flex-col gap-6 mx-auto")}>
        <div>
          <h1 className="font-heading text-xl font-bold">
            {isEditing ? "Edit Pengguna" : "Tambah Pengguna"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isEditing
              ? "Perbarui detail dan peran pengguna."
              : "Lengkapi detail pengguna baru."}
          </p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                aria-invalid={Boolean(errors.name)}
                {...register("name", { required: "Nama wajib diisi" })}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                aria-invalid={Boolean(errors.username)}
                {...register("username", { required: "Username wajib diisi" })}
              />
              {errors.username && (
                <p className="text-destructive text-sm">{errors.username.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: { value: EMAIL_PATTERN, message: "Format email tidak valid" },
                })}
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="role">Role</Label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role wajib dipilih" }}
                render={({ field }) => (
                  <Select
                    inputId="role"
                    options={ROLE_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Pilih role"
                    isInvalid={Boolean(errors.role)}
                  />
                )}
              />
              {errors.role && (
                <p className="text-destructive text-sm">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">
              {isEditing ? "Password Baru (opsional)" : "Password"}
            </Label>
            <Input
              id="password"
              type="password"
              aria-invalid={Boolean(errors.password)}
              {...register("password", {
                required: isEditing ? false : "Password wajib diisi",
                validate: (value) =>
                  !value || value.length >= 8 || "Password minimal 8 karakter",
              })}
            />
            {isEditing && (
              <p className="text-muted-foreground text-xs">
                Kosongkan jika tidak ingin mengubah password.
              </p>
            )}
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              render={<Link to="/dashboard/admin/pengguna" />}
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
