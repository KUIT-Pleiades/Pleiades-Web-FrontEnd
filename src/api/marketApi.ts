import { axiosRequest } from "../functions/axiosRequest";
import { OfficialFaceData } from "../interfaces/Interfaces";

/**
 * 공식몰 얼굴 아이템 목록과 찜 목록을 가져오는 API 함수
 * @returns Promise<OfficialFaceData>
 */
export const getOfficialFaceItems = async (): Promise<OfficialFaceData> => {
  // axiosRequest<응답데이터타입>(요청경로, HTTP메서드, 보낼데이터);
  const response = await axiosRequest<OfficialFaceData>(
    "/store/official/face",
    "GET",
    null
  );

  // axiosRequest는 { data, status, message } 객체를 반환하므로
  // 실제 서버 데이터가 들어있는 response.data를 반환합니다.
  return response.data;
};
