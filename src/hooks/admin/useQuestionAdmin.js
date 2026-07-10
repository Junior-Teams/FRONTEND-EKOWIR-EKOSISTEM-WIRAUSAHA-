import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

// These hit the admin-only /secured/questions endpoints (not the public
// /questions ones) because the public endpoints deliberately hide
// AnswerOption.is_correct to stop quiz-takers reading answers from the API.
// The admin UI needs is_correct to display and edit questions.
export function useQuestionsQuery({ idQuiz }) {
  return useQuery({
    queryKey: ["admin.questions", idQuiz ?? null],
    queryFn: async () => {
      const response = await axiosInstance.get("/secured/questions", {
        params: idQuiz ? { idQuiz } : undefined,
      })
      return response.data?.data ?? []
    },
    enabled: Boolean(idQuiz),
  })
}

export function useQuestionQuery(id) {
  return useQuery({
    queryKey: ["admin.questions.detail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/secured/questions/${id}`)
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateQuestion({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.questions.create"],
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/secured/questions", body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useUpdateQuestion({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.questions.update"],
    mutationFn: async ({ id, body }) => {
      const response = await axiosInstance.put(`/secured/questions/${id}`, body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useDeleteQuestion({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["admin.questions.delete"],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/secured/questions/${id}`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
