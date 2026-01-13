import { useQuery } from "@tanstack/react-query";
import { getStationBackgrounds } from "../../../api/characterApi";
import { IMG_BASE_URL } from "../../../functions/getImage";

export const useStationBackgroundsQuery = () => {
  return useQuery({
    queryKey: ["stationBackgrounds"],
    queryFn: async () => {
      const data = await getStationBackgrounds();
      // API 데이터를 기존 컴포넌트가 기대하는 형식으로 변환
      const backgrounds = data.map(
        (bg) => `${IMG_BASE_URL}background/${bg.name}`
      );
      const backgroundPrevs = data.map(
        (bg) => `${IMG_BASE_URL}background/thumbnails/rec_${bg.name}`
      );
      return { backgrounds, backgroundPrevs, rawData: data };
    },
  });
};
