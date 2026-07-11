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
    // Ranks change from other users' activity too, so ignore the global
    // 60s staleTime and refetch every time a page using this mounts -
    // cached data still shows instantly while the refresh runs.
    staleTime: 0,
    refetchOnMount: "always",
  })
}
