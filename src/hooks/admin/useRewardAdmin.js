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

// axiosInstance defaults Content-Type to application/json, which makes axios
// JSON-stringify FormData instead of sending it as multipart. Clearing the
// header lets the browser set the correct multipart/form-data boundary itself.
const multipartConfig = { headers: { "Content-Type": undefined } }

export function useCreateReward({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.rewards.create"],
    mutationFn: async (formData) => {
      const response = await axiosInstance.post(
        "/secured/rewards",
        formData,
        multipartConfig
      )
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useUpdateReward({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.rewards.update"],
    mutationFn: async ({ id, formData }) => {
      const response = await axiosInstance.put(
        `/secured/rewards/${id}`,
        formData,
        multipartConfig
      )
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
