import { useMutation } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useUpdateProfile({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["profile.update"],
    mutationFn: async (body) => {
      const response = await axiosInstance.put("/secured/me", body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useChangePassword({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["profile.password"],
    mutationFn: async (body) => {
      const response = await axiosInstance.put("/secured/me/password", body)
      return response.data
    },
    onSuccess,
    onError,
  })
}
