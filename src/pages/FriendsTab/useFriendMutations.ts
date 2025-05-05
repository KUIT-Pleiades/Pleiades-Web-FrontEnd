import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRequest } from "../../functions/axiosRequest";


// 친구 요청 수락
export const useAcceptFriendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) =>
      axiosRequest<{ message: string }>(
        `/friends/requests/${friendId}`,
        "PATCH",
        { status: "ACCEPTED" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
};

// 친구 요청 거절
export const useRejectFriendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) =>
      axiosRequest<{ message: string }>(
        `/friends/requests/${friendId}`,
        "PATCH",
        { status: "REJECTED" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
};

// 친구 삭제 또는 요청 삭제
export const useDeleteFriendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) =>
      axiosRequest<{ message: string }>(
        `/friends/requests/${friendId}`,
        "DELETE",
        null
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
};