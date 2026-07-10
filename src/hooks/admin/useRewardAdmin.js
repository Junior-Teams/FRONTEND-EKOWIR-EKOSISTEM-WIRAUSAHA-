import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useRewardsQuery() {
  return useQuery({
    queryKey: ["admin.rewards"],
    queryFn: async () => {
      const response = await axiosInstance.get("/rewards")
      return response.data?.data ?? []
    },
  })
}

export function useRewardQuery(id) {
  return useQuery({
    queryKey: ["admin.rewards.detail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/rewards/${id}`)
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateReward({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.rewards.create"],
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/secured/rewards", body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useUpdateReward({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.rewards.update"],
    mutationFn: async ({ id, body }) => {
      const response = await axiosInstance.put(`/secured/rewards/${id}`, body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useDeleteReward({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.rewards.delete"],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/secured/rewards/${id}`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
