import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useMyRewardsQuery() {
  return useQuery({
    queryKey: ["rewards.mine"],
    queryFn: async () => {
      const response = await axiosInstance.get("/secured/rewards")
      return response.data
    },
  })
}

export function useClaimReward({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["rewards.claim"],
    mutationFn: async (id) => {
      const response = await axiosInstance.post(`/secured/rewards/${id}/claim`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
