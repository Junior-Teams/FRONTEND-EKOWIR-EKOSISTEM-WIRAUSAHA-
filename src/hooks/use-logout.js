import { useNavigate } from "react-router"

export function useLogout() {
  const navigate = useNavigate()

  return function logout() {
    localStorage.removeItem("token")
    navigate("/auth/login")
  }
}
