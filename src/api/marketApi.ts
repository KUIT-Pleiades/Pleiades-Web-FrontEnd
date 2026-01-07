import { axiosRequest } from "../functions/axiosRequest";
import {
  OfficialFaceData,
  OfficialClothData,
  OfficialBackgroundData,
  WishlistResponse,
  ThemeData,
  PurchaseHistoryResponse,
  SaleHistoryResponse,
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

/**
 * 스토어 테마 목록을 가져오는 API 함수
 * @returns Promise<ThemeData>
 */
export const getThemes = async (): Promise<ThemeData> => {
  const response = await axiosRequest<ThemeData>(
    "/store/theme",
    "GET",
    null
  );
  return response.data;
};

export interface PurchaseResponse {
  ownershipId?: number;
  message: string;
}

/**
 * 공식몰 아이템 구매 API 함수
 * @param itemId - 구매할 아이템 ID
 * @returns Promise<PurchaseResponse>
 */
export const purchaseOfficialItem = async (itemId: number): Promise<PurchaseResponse> => {
  const response = await axiosRequest<PurchaseResponse>("/store/official/trades", "POST", { itemId });
  return response.data;
};

export interface SearchResponse {
  items: {
    id: number;
    name: string;
    description: string;
    type: string;
    price: number;
    theme: string[];
  }[];
  wishlist: number[];
}

/**
 * 공식몰 아이템 검색 API 함수
 * @param query - 검색어
 * @returns Promise<SearchResponse>
 */
export const searchOfficialItems = async (query: string): Promise<SearchResponse> => {
  const response = await axiosRequest<SearchResponse>(
    `/store/official?query=${encodeURIComponent(query)}`,
    "GET",
    null
  );
  return response.data;
};

/**
 * 구매 내역을 가져오는 API 함수
 * @returns Promise<PurchaseHistoryResponse>
 */
export const getPurchaseHistory = async (): Promise<PurchaseHistoryResponse> => {
  const response = await axiosRequest<PurchaseHistoryResponse>(
    "/store/purchases",
    "GET",
    null
  );
  return response.data;
};

/**
 * 판매 내역을 가져오는 API 함수
 * @returns Promise<SaleHistoryResponse>
 */
export const getSaleHistory = async (): Promise<SaleHistoryResponse> => {
  const response = await axiosRequest<SaleHistoryResponse>(
    "/store/sales",
    "GET",
    null
  );
  return response.data;
};
