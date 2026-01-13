import { useQuery } from "@tanstack/react-query";
import { getStarBackgrounds } from "../../../api/characterApi";

export const useStarBackgroundsQuery = () => {
  return useQuery({
    queryKey: ["starBackgrounds"],
    queryFn: getStarBackgrounds,
  });
};
