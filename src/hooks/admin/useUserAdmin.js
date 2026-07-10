import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useUsersQuery() {
  return useQuery({
    queryKey: ["admin.users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/secured/users")
      return response.data ?? []
    },
  })
}

export function useUserQuery(id) {
  return useQuery({
    queryKey: ["admin.users.detail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/secured/users/${id}`)
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateUser({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.users.create"],
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/secured/users", body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useUpdateUser({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.users.update"],
    mutationFn: async ({ id, body }) => {
      const response = await axiosInstance.put(`/secured/users/${id}`, body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useDeleteUser({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.users.delete"],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/secured/users/${id}`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
