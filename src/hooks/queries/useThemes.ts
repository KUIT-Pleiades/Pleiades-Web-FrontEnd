import { useQuery } from "@tanstack/react-query";
import { getThemes } from "../../api/marketApi";

export const useThemes = () => {
  return useQuery({
    queryKey: ["store", "themes"],
    queryFn: getThemes,
  });
};
