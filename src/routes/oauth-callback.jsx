import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import toast from "react-hot-toast"

import { getRoleFromToken } from "@/lib/current-user"

export function Component() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    const error = searchParams.get("error")

    if (token) {
      localStorage.setItem("token", token)
      const isAdmin = getRoleFromToken(token) === "admin"
      navigate(isAdmin ? "/dashboard/admin" : "/dashboard", { replace: true })
      return
    }

    toast.error(
      error ? `Login Google gagal: ${error}` : "Login Google gagal"
    )
    navigate("/auth/login", { replace: true })
  }, [navigate, searchParams])

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-muted-foreground text-sm">Menyelesaikan login…</p>
    </div>
  )
}
