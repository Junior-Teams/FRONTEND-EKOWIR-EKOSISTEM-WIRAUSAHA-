import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import toast from "react-hot-toast"

import { getRoleFromToken } from "@/lib/current-user"

export function Component() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = searchParams.get("token")
    const error = searchParams.get("error")

    if (token) {
      localStorage.setItem("token", token)
      // Drop every cached query so data from a previously logged-in account
      // never flashes on the next account's dashboard.
      queryClient.removeQueries()
      const isAdmin = getRoleFromToken(token) === "admin"
      navigate(isAdmin ? "/dashboard/admin" : "/dashboard", { replace: true })
      return
    }

    toast.error(
      error ? `Login Google gagal: ${error}` : "Login Google gagal"
    )
    navigate("/auth/login", { replace: true })
  }, [navigate, searchParams, queryClient])

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-muted-foreground text-sm">Menyelesaikan login…</p>
    </div>
  )
}
