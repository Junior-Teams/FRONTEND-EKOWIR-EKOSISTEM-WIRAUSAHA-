import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useMaterisQuery({ idModule } = {}) {
  return useQuery({
    queryKey: ["admin.materis", idModule ?? null],
    queryFn: async () => {
      const response = await axiosInstance.get("/materis", {
        params: idModule ? { idModule } : undefined,
      })
      return response.data?.data ?? []
    },
  })
}

export function useMateriQuery(id) {
  return useQuery({
    queryKey: ["admin.materis.detail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/materis/${id}`)
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateMateri({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.materis.create"],
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/secured/materis", body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useUpdateMateri({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.materis.update"],
    mutationFn: async ({ id, body }) => {
      const response = await axiosInstance.put(`/secured/materis/${id}`, body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useDeleteMateri({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.materis.delete"],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/secured/materis/${id}`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
