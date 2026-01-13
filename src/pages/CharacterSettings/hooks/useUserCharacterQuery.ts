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
      try {
        const response = await axiosRequest<IdCheckResponse>(
          `/auth/checkId?userId=${id}`,
          "GET",
          null
        );
        if (!response) throw new Error("서버 연결 실패");
        return response.data;
      } catch (error: any) {
        // 서버에서 에러 응답(409 등)과 함께 메시지를 보낸 경우 처리
        if (error.response && error.response.data) {
          return {
            available: false,
            message: error.response.data.message || "확인 실패",
          };
        }
        throw error;
      }
    },
    enabled,
    retry: false, // 에러 발생 시 재시도 하지 않음 (중복 확인은 즉시 결과가 필요함)
  });
};