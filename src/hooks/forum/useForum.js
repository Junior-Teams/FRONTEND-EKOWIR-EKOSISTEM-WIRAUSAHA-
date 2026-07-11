import { useMutation, useQuery } from "@tanstack/react-query"

import axiosInstance from "@/utils/axiosInstance"

export function useForumsQuery({ idModule } = {}) {
  return useQuery({
    queryKey: ["forum.threads", idModule ?? null],
    queryFn: async () => {
      const response = await axiosInstance.get("/forums", {
        params: idModule ? { idModule } : undefined,
      })
      return response.data?.data ?? []
    },
  })
}

export function useForumQuery(id) {
  return useQuery({
    queryKey: ["forum.threads.detail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/forums/${id}`)
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateForum({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["forum.threads.create"],
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/secured/forums", body)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useDeleteForum({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["forum.threads.delete"],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/secured/forums/${id}`)
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useCreateComment({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["forum.comments.create"],
    mutationFn: async ({ idForum, content }) => {
      const formData = new FormData()
      formData.append("idForum", idForum)
      formData.append("content", content)
     
      const response = await axiosInstance.post("/secured/comments", formData, {
        headers: { "Content-Type": undefined },
      })
      return response.data
    },
    onSuccess,
    onError,
  })
}

export function useDeleteComment({ onSuccess, onError } = {}) {
  return useMutation({
    mutationKey: ["forum.comments.delete"],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/secured/comments/${id}`)
      return response.data
    },
    onSuccess,
    onError,
  })
}
