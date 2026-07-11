import { useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useCourseHistoryQuery() {
  return useQuery({
    queryKey: ["profile.courses"],
    queryFn: async () => {
      const response = await axiosInstance.get("/secured/me/courses")
      return response.data?.data ?? []
    },
    enabled: Boolean(localStorage.getItem("token")),
  })
}
