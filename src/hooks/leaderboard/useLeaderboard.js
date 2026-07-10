import { useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useLeaderboardQuery({ limit = 20 } = {}) {
  return useQuery({
    queryKey: ["leaderboard", limit],
    queryFn: async () => {
      const response = await axiosInstance.get("/leaderboard", {
        params: { limit },
      })
      return response.data?.data ?? []
    },
  })
}
