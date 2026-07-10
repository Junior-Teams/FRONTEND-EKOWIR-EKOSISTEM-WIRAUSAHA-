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
        <CardTitle className="text-2xl font-bold">
          Login to your account
        </CardTitle>
        <CardDescription className="text-base">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
            Login
          </Button>

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
