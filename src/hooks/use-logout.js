import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export function useLogout() {
  const navigate = useNavigate()

  return function logout() {
    localStorage.removeItem("token")
    toast.success("Berhasil logout")
    navigate("/auth/login")
  }
}
