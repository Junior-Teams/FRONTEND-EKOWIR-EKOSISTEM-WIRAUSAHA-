import { useQueryClient } from "@tanstack/react-query"
import { KeyRound, LogOut, Sparkles, User } from "lucide-react"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { useLogout } from "@/hooks/use-logout"
import { useChangePassword, useUpdateProfile } from "@/hooks/profile/useProfile"
import { getInitials } from "@/lib/current-user"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const inputClass = cn(
  "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
  NEO_BORDER
)

const cardClass = cn(
  "flex flex-col gap-4 rounded-lg bg-white p-5 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

function ProfileForm({ user }) {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  const initializedIdRef = useRef(null)
  useEffect(() => {
    if (user && initializedIdRef.current !== user.id) {
      initializedIdRef.current = user.id
      reset({ username: user.username, name: user.name, email: user.email })
    }
  }, [user, reset])

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui")
      queryClient.invalidateQueries({ queryKey: ["auth.me"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal memperbarui profil")
    },
  })

  function onSubmit(values) {
    updateProfile(values)
  }

  return (
    <form className={cardClass} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <h2 className="font-heading text-lg font-bold">Informasi Personal</h2>
        <p className="text-muted-foreground text-sm">
          Informasi ini akan digunakan untuk personalisasi pada layanan Ekobis.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Pilih username kamu"
            aria-invalid={Boolean(errors.username)}
            className={inputClass}
            {...register("username", { required: "Username wajib diisi" })}
          />
          <p className="text-muted-foreground text-xs">
            Gunakan huruf kecil, angka, titik, underscore, atau minus.
          </p>
          {errors.username && (
            <p className="text-destructive text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nama">Nama</Label>
          <Input
            id="nama"
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
            {...register("name", { required: "Nama wajib diisi" })}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
            {...register("email", { required: "Email wajib diisi" })}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-fit gap-2 self-start rounded-lg bg-eko-primary text-white hover:bg-eko-primary/90",
          NEO_BORDER,
          NEO_SHADOW,
          NEO_PRESS
        )}
      >
        {isPending ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  )
}

function PasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  const { mutate: changePassword, isPending } = useChangePassword({
    onSuccess: () => {
      toast.success("Password berhasil diperbarui")
      reset()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal memperbarui password")
    },
  })

  function onSubmit(values) {
    changePassword({
      old_password: values.currentPassword,
      new_password: values.newPassword,
    })
  }

  return (
    <form className={cardClass} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <h2 className="font-heading text-lg font-bold">Ganti Password</h2>
        <p className="text-muted-foreground text-sm">
          Gunakan password yang kuat dan belum pernah dipakai di layanan lain.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="current-password">Password Saat Ini</Label>
          <Input
            id="current-password"
            type="password"
            aria-invalid={Boolean(errors.currentPassword)}
            className={inputClass}
            {...register("currentPassword", { required: "Password saat ini wajib diisi" })}
          />
          {errors.currentPassword && (
            <p className="text-destructive text-sm">{errors.currentPassword.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="new-password">Password Baru</Label>
          <Input
            id="new-password"
            type="password"
            aria-invalid={Boolean(errors.newPassword)}
            className={inputClass}
            {...register("newPassword", {
              required: "Password baru wajib diisi",
              minLength: { value: 8, message: "Password minimal 8 karakter" },
            })}
          />
          {errors.newPassword && (
            <p className="text-destructive text-sm">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
          <Input
            id="confirm-password"
            type="password"
            aria-invalid={Boolean(errors.confirmPassword)}
            className={inputClass}
            {...register("confirmPassword", {
              required: "Konfirmasi password wajib diisi",
              validate: (value) =>
                value === watch("newPassword") || "Konfirmasi password tidak sama",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-fit gap-2 self-start rounded-lg bg-eko-primary text-white hover:bg-eko-primary/90",
          NEO_BORDER,
          NEO_SHADOW,
          NEO_PRESS
        )}
      >
        {isPending ? "Menyimpan..." : "Simpan Password"}
      </Button>
    </form>
  )
}

export function Component() {
  const logout = useLogout()
  const { data: user } = useCurrentUser()

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Profile" }]}
      />

      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:bg-neutral-900",
          NEO_BORDER,
          NEO_SHADOW
        )}
      >
        <div className="flex items-center gap-4">
          {user?.picture ? (
            <img
              src={user.picture}
              alt=""
              className={cn("size-16 shrink-0 rounded-full object-cover", NEO_BORDER)}
            />
          ) : (
            <div
              className={cn(
                "flex size-16 shrink-0 items-center justify-center rounded-full bg-eko-secondary text-xl font-bold",
                NEO_BORDER
              )}
            >
              {getInitials(user?.name)}
            </div>
          )}
          <div>
            <p className="text-muted-foreground text-sm">Halo,</p>
            <h1 className="font-heading text-xl font-bold sm:text-2xl">
              {user?.name ?? "..."}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full bg-eko-tertiary px-2 py-0.5 text-xs font-bold uppercase",
                  NEO_BORDER
                )}
              >
                <Sparkles className="size-3" />
                {(user?.xp ?? 0).toLocaleString("id-ID")} XP
              </span>
              {user?.tier?.name && (
                <span
                  className={cn(
                    "rounded-full bg-eko-secondary px-2 py-0.5 text-xs font-bold uppercase",
                    NEO_BORDER
                  )}
                >
                  {user.tier.name}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={logout}
          className={cn(
            "gap-2 self-start rounded-lg bg-white dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW,
            NEO_PRESS
          )}
        >
          <LogOut className="size-4" />
          Keluar
        </Button>
      </div>

      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil">
            <User className="size-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="password">
            <KeyRound className="size-4" />
            Ganti Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profil">
          <ProfileForm user={user} />
        </TabsContent>

        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
