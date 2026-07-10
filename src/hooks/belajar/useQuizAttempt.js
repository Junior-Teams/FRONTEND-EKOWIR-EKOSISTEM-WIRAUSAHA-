import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

// Hits the public /questions endpoint, which hides AnswerOption.is_correct
// (see useQuestionAdmin.js) — correctness is only ever checked server-side
// when the quiz is submitted.
export function useQuestionsQuery({ idQuiz } = {}) {
  return useQuery({
    queryKey: ["belajar.questions", idQuiz ?? null],
    queryFn: async () => {
      const response = await axiosInstance.get("/questions", {
        params: idQuiz ? { idQuiz } : undefined,
      })
      return response.data?.data ?? []
    },
    enabled: Boolean(idQuiz),
  })
}

export function useSubmitQuiz({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["belajar.quizzes.submit"],
    mutationFn: async ({ id, answers }) => {
      const response = await axiosInstance.post(
        `/secured/quizzes/${id}/submit`,
        { answers }
      )
      return response.data
    },
    onSuccess,
    onError,
  })
}
