import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export const useMutationLogin = ({ onSuccess, onError }) =>
useMutation({
  mutationKey: ["auth.login"],
  mutationFn: async (body) => {
    const response = await axiosInstance.post("/token", body);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },
  onSuccess,
  onError,
});