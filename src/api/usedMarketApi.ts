import { AxiosError } from "axios";
import { axiosRequest } from "../functions/axiosRequest";
import {
  UsedFaceData,
  UsedClothData,
  UsedBackgroundData,
  WishlistResponse,
  SellItemResponse,
  MyListingsData,
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
 * @returns Promise<SellItemResponse>
 * @throws 403: 본인의 아이템이 아닙니다, 404: 아이템을 찾을 수 없습니다, 409: 사용중인 아이템입니다
 */
export const postSellItem = async (
  ownershipId: number,
  price: number
): Promise<SellItemResponse> => {
  try {
    const response = await axiosRequest<SellItemResponse>(
      "/store/resale/listings",
      "POST",
      { ownershipId, price }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new Error("본인의 아이템이 아닙니다.");
      }
      if (error.response?.status === 404) {
        throw new Error("아이템을 찾을 수 없습니다.");
      }
      if (error.response?.status === 409) {
        throw new Error("사용중인 아이템입니다.");
      }
    }
    throw error;
  }
};

/**
 * 내가 판매 중인 아이템 목록을 가져오는 API 함수
 * GET /store/resale/listings
 * @returns Promise<MyListingsData>
 */
export const getMyListings = async (): Promise<MyListingsData> => {
  const response = await axiosRequest<MyListingsData>(
    "/store/resale/listings",
    "GET",
    null
  );
  return response.data;
};

/**
 * 판매 중인 아이템을 삭제하는 API 함수
 * DELETE /store/resale/listings/{listingId}
 * @param listingId - 판매 등록 ID
 */
export const deleteListing = async (listingId: number): Promise<void> => {
  await axiosRequest<void>(
    `/store/resale/listings/${listingId}`,
    "DELETE",
    null
  );
};

/**
 * 판매 중인 아이템의 가격을 변경하는 API 함수
 * PATCH /store/resale/listings
 * @param listingId - 판매 등록 ID
 * @param price - 변경할 가격
 */
export const updateListingPrice = async (
  listingId: number,
  price: number
): Promise<void> => {
  await axiosRequest<void>("/store/resale/listings", "PATCH", {
    listingId,
    price,
  });
};

export interface UsedPurchaseResponse {
  ownershipId?: number;
  message: string;
}

/**
 * 중고몰 아이템 구매 API 함수
 * POST /store/resale/trades
 * @param listingId - 판매 등록 ID
 * @returns Promise<UsedPurchaseResponse>
 * @throws 404: 아이템 없음, 409: 본인 아이템 구매 불가, 422: 스톤 부족
 */
export const purchaseUsedItem = async (
  listingId: number
): Promise<UsedPurchaseResponse> => {
  try {
    const response = await axiosRequest<UsedPurchaseResponse>(
      "/store/resale/trades",
      "POST",
      { listingId }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new Error("존재하지 않는 아이템입니다.");
      }
      if (error.response?.status === 409) {
        throw new Error("본인 아이템은 구매할 수 없습니다.");
      }
      if (error.response?.status === 422) {
        throw new Error("스톤이 부족합니다.");
      }
    }
    throw error;
  }
};
