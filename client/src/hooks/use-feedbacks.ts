import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type FeedbackInput } from "@shared/routes";

export function useFeedbacks() {
  return useQuery({
    queryKey: [api.feedbacks.list.path],
    queryFn: async () => {
      const res = await fetch(api.feedbacks.list.path);
      if (!res.ok) throw new Error("Failed to fetch feedbacks");
      return api.feedbacks.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FeedbackInput) => {
      const res = await fetch(api.feedbacks.create.path, {
        method: api.feedbacks.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.feedbacks.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create feedback");
      }
      
      return api.feedbacks.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.feedbacks.list.path] });
    },
  });
}
