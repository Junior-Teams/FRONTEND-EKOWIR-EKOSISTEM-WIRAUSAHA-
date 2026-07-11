import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

import axiosInstance from "@/utils/axiosInstance"

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return function logout() {
    // Revoke the token server-side (blacklists its jti) so the old session
    // is truly dead. The header is pinned explicitly because the request
    // interceptor reads localStorage in a microtask - after the removeItem
    // below has already run. Fire-and-forget: an expired token would 401
    // here and the local cleanup must happen regardless.
    const token = localStorage.getItem("token")
    if (token) {
      axiosInstance
        .post("/secured/logout", null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch(() => {})
    }

    localStorage.removeItem("token")
    // Drop every cached query so the next account never sees a flash of the
    // previous account's data.
    queryClient.clear()
    toast.success("Berhasil logout")
    navigate("/auth/login")
  }
}
