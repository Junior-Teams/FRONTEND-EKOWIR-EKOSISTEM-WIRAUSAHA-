import { useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth.me"],
    queryFn: async () => {
      const response = await axiosInstance.get("/secured/me")
      return response.data
    },
    enabled: Boolean(localStorage.getItem("token")),
  })
}
