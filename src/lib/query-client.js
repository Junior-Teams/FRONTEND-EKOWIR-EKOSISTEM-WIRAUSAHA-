import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Avoid refetching data that was just fetched elsewhere in the tree.
      staleTime: 60 * 1000,
      retry: 1,
    },
    mutations: {
      // Mutations have side effects, so don't retry them silently.
      retry: 0,
    },
  },
})
