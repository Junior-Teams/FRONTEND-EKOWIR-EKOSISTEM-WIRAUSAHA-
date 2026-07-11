import { useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useAdminDashboardQuery() {
  return useQuery({
    queryKey: ["admin.dashboard"],
    queryFn: async () => {
      const response = await axiosInstance.get("/secured/dashboard")
      return response.data
    },
  })
}
