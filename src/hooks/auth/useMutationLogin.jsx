import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export const useMutationLogin = ({ onSuccess, onError }) => 
useMutation({
  mutationKey: ["auth.login"],
  mutationFn: async (body) => {
    const response = await axiosInstance.post("/login", body);
    if (response.data?.data) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response.data;
  },
  onSuccess,
  onError,
});