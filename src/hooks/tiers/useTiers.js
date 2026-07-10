import { useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useTiersQuery() {
  return useQuery({
    queryKey: ["tiers"],
    queryFn: async () => {
      const response = await axiosInstance.get("/tiers")
      return response.data?.data ?? []
    },
    staleTime: 5 * 60 * 1000,
  })
}
