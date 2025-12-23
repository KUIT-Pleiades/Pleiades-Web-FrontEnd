import { axiosRequest } from "../functions/axiosRequest";
import {
  UsedFaceData,
  UsedClothData,
  UsedBackgroundData,
  WishlistResponse,
  SellItemResponse,
} from "../interfaces/Interfaces";

/**
 * 중고몰 얼굴 아이템 목록과 찜 목록을 가져오는 API 함수
 * @returns Promise<UsedFaceData>
 */
export const getUsedFaceItems = async (): Promise<UsedFaceData> => {
  const response = await axiosRequest<UsedFaceData>(
    "/store/resale/face",
    "GET",
    null
  );
  return response.data;
};

/**
 * 중고몰 의상 아이템 목록과 찜 목록을 가져오는 API 함수
 * @returns Promise<UsedClothData>
 */
export const getUsedClothItems = async (): Promise<UsedClothData> => {
  const response = await axiosRequest<UsedClothData>(
    "/store/resale/fashion",
    "GET",
    null
  );
  return response.data;
};

/**
 * 중고몰 배경 아이템 목록과 찜 목록을 가져오는 API 함수
 * @returns Promise<UsedBackgroundData>
 */
export const getUsedBackgroundItems = async (): Promise<UsedBackgroundData> => {
  const response = await axiosRequest<UsedBackgroundData>(
    "/store/resale/bg",
    "GET",
    null
  );
  return response.data;
};

/**
 * 중고몰 아이템을 찜 목록에 추가하는 API 함수
 * @param itemId - 아이템 ID
 * @returns Promise<any>
 */
export const postUsedWishlistItem = async (
  itemId: number
): Promise<WishlistResponse> => {
  const response = await axiosRequest<WishlistResponse>(
    "/store/resale/wishlist",
    "POST",
    { id: itemId }
  );
  return response.data;
};

/**
 * 중고몰 아이템을 찜 목록에서 제거하는 API 함수
 * @param itemId - 아이템 ID
 * @returns Promise<any>
 */
export const deleteUsedWishlistItem = async (
  itemId: number
): Promise<WishlistResponse> => {
  const response = await axiosRequest<WishlistResponse>(
    "/store/resale/wishlist",
    "DELETE",
    { id: itemId }
  );
  return response.data;
};

/**
 * 내 아이템을 중고장터에 판매 등록하는 API 함수
 * POST /store/resale/listings
 * @param ownershipId - 소유권 ID
 * @param price - 판매 가격
 * @returns Promise<SellItemResponse | null>
 */
export const postSellItem = async (
  ownershipId: number,
  price: number
): Promise<SellItemResponse | null> => {
  try {
    const response = await axiosRequest<SellItemResponse>(
      "/store/resale/listings",
      "POST",
      { ownershipId, price }
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("아이템 판매 등록 실패:", error);
    throw error;
  }
};