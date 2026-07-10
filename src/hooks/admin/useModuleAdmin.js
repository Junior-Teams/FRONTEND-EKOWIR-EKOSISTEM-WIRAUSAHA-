import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useModulesQuery() {
  return useQuery({
    queryKey: ["admin.modules"],
    queryFn: async () => {
      const response = await axiosInstance.get("/modules")
      return response.data?.data ?? []
    },
  })
}

export function useModuleQuery(id) {
  return useQuery({
    queryKey: ["admin.modules.detail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/modules/${id}`)
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateModule({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.modules.create"],
    mutationFn: async (formData) => {
      // axiosInstance defaults Content-Type to application/json, which makes axios
      // JSON-stringify FormData instead of sending it as multipart. Clearing the header
      // here lets the browser set the correct multipart/form-data boundary itself.
      const response = await axiosInstance.post("/secured/modules", formData, {
        headers: { "Content-Type": undefined },
      })
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useUpdateModule({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.modules.update"],
    mutationFn: async ({ id, body }) => {
      const response = await axiosInstance.put(`/secured/modules/${id}`, body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useDeleteModule({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.modules.delete"],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/secured/modules/${id}`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
