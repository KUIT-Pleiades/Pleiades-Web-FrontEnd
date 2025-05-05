import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../functions/axiosRequest";
import { StationResponse } from "../interfaces/Interfaces"; // ← 인터페이스 보고 필요하면 수정 필요

export const useStationQuery = (stationId: string) => {
  return useQuery({
    queryKey: ["station", stationId],
    queryFn: async () => {
      const response = await axiosRequest<StationResponse>(
        `/stations/${stationId}`,
        "GET",
        null
      );
      if (!response) throw new Error("스테이션 조회 실패");
      return response;
    },
    enabled: !!stationId, // stationId가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });
};