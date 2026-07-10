import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useQuizzesQuery({ idModule } = {}) {
  return useQuery({
    queryKey: ["admin.quizzes", idModule ?? null],
    queryFn: async () => {
      const response = await axiosInstance.get("/quizzes", {
        params: idModule ? { idModule } : undefined,
      })
      return response.data?.data ?? []
    },
  })
}

export function useQuizQuery(id) {
  return useQuery({
    queryKey: ["admin.quizzes.detail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/quizzes/${id}`)
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateQuiz({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.quizzes.create"],
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/secured/quizzes", body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useUpdateQuiz({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.quizzes.update"],
    mutationFn: async ({ id, body }) => {
      const response = await axiosInstance.put(`/secured/quizzes/${id}`, body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useDeleteQuiz({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.quizzes.delete"],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/secured/quizzes/${id}`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
