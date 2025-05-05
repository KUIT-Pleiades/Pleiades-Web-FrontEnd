// src/functions/useStationListQuery.ts
import { useQuery } from "@tanstack/react-query";
import { Stations } from "../../../interfaces/Interfaces";
import { axiosRequest } from '../../../functions/axiosRequest';

export const useStationListQuery = () => {
  return useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const response = await axiosRequest<Stations>("/stations", "GET", null);
      console.log("정거장 리스트 응답:", response);
      if (!response) {
        throw new Error("정거장 목록을 불러오는데 실패했어요.");
      }
      return response;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });
};