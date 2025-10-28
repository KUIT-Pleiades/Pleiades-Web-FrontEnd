import { axiosRequest } from "../functions/axiosRequest";
import {
  OfficialFaceData,
  OfficialClothData,
  OfficialBackgroundData,
  WishlistResponse,
} from "../interfaces/Interfaces";

/**
 * 공식몰 얼굴 아이템 목록과 찜 목록을 가져오는 API 함수
 * @returns Promise<OfficialFaceData>
 */
export const getOfficialFaceItems = async (): Promise<OfficialFaceData> => {
  const response = await axiosRequest<OfficialFaceData>(
    "/store/official/face",
    "GET",
    null
  );
  return response.data;
};

/**
 * 공식몰 의상 아이템 목록과 찜 목록을 가져오는 API 함수
 * @returns Promise<OfficialClothData>
 */
export const getOfficialClothItems = async (): Promise<OfficialClothData> => {
  const response = await axiosRequest<OfficialClothData>(
    "/store/official/fashion",
    "GET",
    null
  );
  return response.data;
};

/**
 * 공식몰 배경 아이템 목록과 찜 목록을 가져오는 API 함수
 * @returns Promise<OfficialBackgroundData>
 */
export const getOfficialBackgroundItems =
  async (): Promise<OfficialBackgroundData> => {
    const response = await axiosRequest<OfficialBackgroundData>(
      "/store/official/bg",
      "GET",
      null
    );
    return response.data;
  };

/**
 * 공식몰 아이템을 찜 목록에 추가/제거하는 API 함수
 * @param itemId - 아이템 ID
 * @returns Promise<WishlistResponse>
 */
export const postWishlistItem = async (
  itemId: number
): Promise<WishlistResponse> => {
  try {
    const response = await axiosRequest<WishlistResponse>(
      "/store/official/wishlist",
      "POST",
      { id: itemId }
    );
    return response.data;
  } catch (error) {
    console.error("위시리스트 추가/제거 실패:", error);
    throw error;
  }
};

/**
 * 공식몰 아이템을 찜 목록에서 제거하는 API 함수
 * @param itemId - 아이템 ID
 * @returns Promise<any>
 */
export const deleteWishlistItem = async (
  itemId: number
): Promise<WishlistResponse> => {
  const response = await axiosRequest<WishlistResponse>(
    "/store/official/wishlist",
    "DELETE",
    { id: itemId }
  );
  return response.data;
};
