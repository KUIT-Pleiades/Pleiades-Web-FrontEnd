import { useQuery } from "@tanstack/react-query";
import { getUsedClothItems } from "../../api/usedMarketApi";

export const useUsedClothItems = () => {
  return useQuery({
    queryKey: ["used", "cloth"],
    queryFn: getUsedClothItems,
  });
};
