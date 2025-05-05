import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../../../functions/axiosRequest";
import { StationResponse } from "../../../interfaces/Interfaces";

export const useStationInsideQuery = (stationId: string) => {
  return useQuery<StationResponse>({
    queryKey: ["station", stationId],
    queryFn: async () => {
      const response = await axiosRequest<StationResponse>(
        `/stations/${stationId}`,
        "GET",
        null
      );
      if (!response || !response.data) {
        throw new Error("정거장 정보를 불러오지 못했습니다.");
      }
      return response.data;
    },
    enabled: !!stationId,
    staleTime: 1000 * 60 * 5,
  });
};