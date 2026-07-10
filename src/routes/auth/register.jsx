import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutationRegister } from "@/hooks/auth/useMutationRegister"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"
import { HOST_API } from "@/utils/axiosInstance"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_PATTERN = /^[a-z0-9._-]+$/

export function Component() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  const { mutate, isPending } = useMutationRegister({
    onSuccess: () => {
      toast.success("Akun berhasil dibuat, silakan login")
      navigate("/auth/login")
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal membuat akun")
    },
  })

  function onSubmit(values) {
    mutate({
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    })
  }

  function handleGoogleRegister() {
    window.location.href = `${HOST_API}/auth/google/login`
  }

  return (
    <Card
      className={cn(
        "w-full max-w-lg rounded-lg bg-blue-100 ring-0 dark:bg-blue-950",
        NEO_BORDER,
        NEO_SHADOW
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription className="text-base">
          Daftar akun baru disini
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              type="text"
              placeholder="Muhammad Hafidz"
              aria-invalid={Boolean(errors.name)}
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
              {...register("name", {
                required: "Nama wajib diisi",
                minLength: { value: 3, message: "Nama minimal 3 karakter" },
              })}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="hafidz"
              aria-invalid={Boolean(errors.username)}
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
              {...register("username", {
                required: "Username wajib diisi",
                pattern: {
                  value: USERNAME_PATTERN,
                  message:
                    "Gunakan huruf kecil, angka, titik, underscore, atau minus",
                },
              })}
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
              placeholder="m@example.com"
              aria-invalid={Boolean(errors.email)}
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Format email tidak valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              aria-invalid={Boolean(errors.password)}
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
              {...register("password", {
                required: "Password wajib diisi",
                minLength: { value: 8, message: "Password minimal 8 karakter" },
              })}
            />
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirm-password">Konfirmasi Password</Label>
            <Input
              id="confirm-password"
              type="password"
              aria-invalid={Boolean(errors.confirmPassword)}
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
              {...register("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: (value) =>
                  value === getValues("password") || "Password tidak sama",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-destructive text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              "h-12 rounded-lg bg-blue-500 text-base text-white hover:bg-blue-600 disabled:opacity-60",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            {isPending ? "Mendaftar..." : "Daftar"}
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="text-sm text-muted-foreground">atau</span>
            <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleRegister}
            className={cn(
              "h-12 gap-2 rounded-lg bg-white text-base text-black hover:bg-neutral-50 dark:bg-neutral-900 dark:text-white",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            <img
              src="/assets/icons/google-icon.webp"
              alt=""
              className="size-5"
            />
            Daftar Menggunakan Google
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          Sudah punya akun?{" "}
          <Link to="/auth/login" className="underline underline-offset-4">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
