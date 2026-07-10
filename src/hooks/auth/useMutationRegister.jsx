import { useMutation } from "@tanstack/react-query"

import axiosInstance from "../../utils/axiosInstance"

export const useMutationRegister = ({ onSuccess, onError }) =>
  useMutation({
    mutationKey: ["auth.register"],
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/user/register", body)
      return response.data
    },
    onSuccess,
    onError,
  })
