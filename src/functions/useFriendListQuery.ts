// 이미 FriendsTab에서 tanStack query를 적용해서 사용하고 있으므로 이 코드는 필요없음.
import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../functions/axiosRequest";
import { Social } from "../interfaces/Interfaces";

export const useFriendListQuery = () => {
  return useQuery({
    queryKey: ["friendList"],
    queryFn: async () => {
      const response = await axiosRequest<Social>("/friends", "GET", null);
      if (!response) {
        throw new Error("친구 목록을 불러오는데 실패했어요.");
      }
      return response;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};