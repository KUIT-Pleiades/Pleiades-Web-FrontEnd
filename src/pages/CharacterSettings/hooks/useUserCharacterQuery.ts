// src/pages/CharacterSettings/hooks/useUserCharacterQuery.ts
import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../../../functions/axiosRequest";

interface IdCheckResponse {
  available: boolean;
  message: string;
}

export const useIdCheckQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["checkId", id],
    queryFn: async () => {
      const response = await axiosRequest<IdCheckResponse>(
        `/auth/checkId?userId=${id}`,
        "GET",
        null
      );
      if (!response) throw new Error("서버 연결 실패");
      return response.data;
    },
    enabled,
  });
};