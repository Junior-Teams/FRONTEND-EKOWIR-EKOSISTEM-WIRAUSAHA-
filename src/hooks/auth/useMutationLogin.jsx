import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export const useMutationLogin = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth.login"],
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/token", body);
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    },
    onSuccess: (...args) => {
      // Drop every cached query so data from a previously logged-in account
      // never flashes on the next account's dashboard.
      queryClient.removeQueries();
      onSuccess?.(...args);
    },
    onError,
  });
};
