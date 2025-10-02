import { useQuery } from "@tanstack/react-query";
import { getUsedBackgroundItems } from "../../api/usedMarketApi";

export const useUsedBackgroundItems = () => {
  return useQuery({
    queryKey: ["used", "background"],
    queryFn: getUsedBackgroundItems,
  });
};
