import { axiosRequest } from "../functions/axiosRequest";
import { WearableItemsData } from "../interfaces/Interfaces";

/**
 * 착용 가능한 아이템 목록을 가져오는 API 함수
 * GET /store/wearable
 * @returns Promise<WearableItemsData>
 */
export const getWearableItems = async (): Promise<WearableItemsData> => {
  const response = await axiosRequest<WearableItemsData>(
    "/store/wearable",
    "GET",
    null
  );
  return response.data;
};
