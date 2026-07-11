import { useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useMyActivityQuery() {
  return useQuery({
    queryKey: ["me.activity"],
    queryFn: async () => {
      const response = await axiosInstance.get("/secured/me/activity")
      return response.data?.data ?? []
    },
  })
}
