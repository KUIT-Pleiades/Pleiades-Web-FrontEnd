import { axiosRequest } from "../functions/axiosRequest";
import { WearableItemsData, BackgroundItem } from "../interfaces/Interfaces";

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

/**
 * 별 배경 아이템 목록을 가져오는 API 함수
 * GET /items/backgrounds?type=star
 * @returns Promise<BackgroundItem[]>
 */
export const getStarBackgrounds = async (): Promise<BackgroundItem[]> => {
  const response = await axiosRequest<BackgroundItem[]>(
    "/items/backgrounds?type=star",
    "GET",
    null
  );
  return response.data;
};

/**
 * 정거장 배경 아이템 목록을 가져오는 API 함수
 * GET /items/backgrounds?type=station
 * @returns Promise<BackgroundItem[]>
 */
export const getStationBackgrounds = async (): Promise<BackgroundItem[]> => {
  const response = await axiosRequest<BackgroundItem[]>(
    "/items/backgrounds?type=station",
    "GET",
    null
  );
  return response.data;
};
