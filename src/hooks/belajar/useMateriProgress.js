import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useModuleProgressQuery(idModule) {
  return useQuery({
    queryKey: ["belajar.progress", idModule],
    queryFn: async () => {
      const response = await axiosInstance.get(`/secured/modules/${idModule}/progress`)
      return response.data
    },
    enabled: Boolean(idModule) && Boolean(localStorage.getItem("token")),
  })
}

export function useCompleteMateri({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["belajar.materi.complete"],
    mutationFn: async (idMateri) => {
      const response = await axiosInstance.post(`/secured/materis/${idMateri}/complete`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
