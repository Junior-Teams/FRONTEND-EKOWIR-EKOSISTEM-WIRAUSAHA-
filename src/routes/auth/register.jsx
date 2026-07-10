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
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

export function Component() {
  const navigate = useNavigate()

  // No auth backend wired up yet — submitting just goes straight to the
  // dashboard. Replace with the real mutation + redirect once it's ready.
  function handleSubmit(event) {
    event.preventDefault()
    navigate("/dashboard")
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
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Hafidz"
              required
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirm-password">Konfirmasi Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              className={cn(
                "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
                NEO_BORDER
              )}
            />
          </div>

          <Button
            type="submit"
            className={cn(
              "h-12 rounded-lg bg-blue-500 text-base text-white hover:bg-blue-600",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            Daftar
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="text-sm text-muted-foreground">atau</span>
            <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
          </div>

          <Button
            type="button"
            variant="outline"
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
