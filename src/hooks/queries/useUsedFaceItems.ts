import { useQuery } from "@tanstack/react-query";
import { getUsedFaceItems } from "../../api/usedMarketApi";

export const useUsedFaceItems = () => {
  return useQuery({
    queryKey: ["used", "face"],
    queryFn: getUsedFaceItems,
  });
};
