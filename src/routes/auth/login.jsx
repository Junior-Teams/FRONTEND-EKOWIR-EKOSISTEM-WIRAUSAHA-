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
import { useMutationLogin } from "@/hooks/auth/useMutationLogin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"
import { HOST_API } from "@/utils/axiosInstance"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Component() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  const { mutate, isPending } = useMutationLogin({
    onSuccess: () => {
      toast.success("Berhasil masuk")
      navigate("/dashboard")
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error ?? "Email atau password salah"
      )
    },
  })

  function onSubmit(values) {
    mutate(values)
  }

  function handleGoogleLogin() {
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
        <CardTitle className="text-2xl font-bold">
          Login to your account
        </CardTitle>
        <CardDescription className="text-base">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/auth/forgot-password"
                className="text-sm underline underline-offset-4"
              >
                Forgot your password?
              </Link>
            </div>
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
              })}
            />
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password.message}</p>
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
            {isPending ? "Masuk..." : "Login"}
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="text-sm text-muted-foreground">atau</span>
            <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
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
            Login with Google
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
