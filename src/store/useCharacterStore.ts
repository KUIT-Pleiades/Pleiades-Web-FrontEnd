import { create } from "zustand";
import { UserInfo } from "../interfaces/Interfaces";
import { axiosRequest } from "../functions/axiosRequest";

interface CharacterStore {
  userInfo: UserInfo; // 캐릭터 상태
  updateUserInfo: (updates: Partial<UserInfo>) => void; // 캐릭터 업데이트 함수
  resetUserInfo: () => void; // 캐릭터 초기화 함수

  fetchUserInfo: () => Promise<void>; // 서버에서 사용자 정보를 가져옴
  fetchUserStone: () => Promise<void>; // 서버에서 스톤 정보를 가져옴
  chargeStone: () => Promise<void>; // 스톤 추가/차감 (결제 혹은 보상 등)
  fetchIsStoneCharged: () => Promise<void>; // 서버에서 스톤 충전 여부를 가져옴

  // [추가] 이미지 캐싱 방지용 버전 관리
  imgVersion: number;
  updateImgVersion: () => void;
}

// [수정] 새로운 UserInfo 구조에 맞게 초기 상태값 변경
const initialUserInfo: UserInfo = {
  userId: "",
  userName: "",
  birthDate: "",
  starBackground: "bg_star_1.png", // 기본 배경 이미지
  character:
    "https://gateway.pinata.cloud/ipfs/QmWC4899NqLPTqMSVFNZS5qzSUvCH1agcCdRzRrFe1um85",
  profile:
    "https://gateway.pinata.cloud/ipfs/QmURNcGX98UAecKyEELM39117X7RwQZE8B1dtm56B4vxEJ",
  stone: 0, // 초기 스톤 잔액
  isStoneCharged: false,
  face: {
    skinColor: "face_skin_1.png",
    hair: "face_hair_1.png",
    eyes: "face_eyes_1.png", // 기본값 추가
    nose: "face_nose_1.png", // 기본값 추가
    mouth: "face_mouth_1.png", // 기본값 추가
    mole: "", // 점은 기본값 없음
  },
  outfit: {
    top: "fashion_top_1.png",
    bottom: "fashion_bottom_1.png",
    set: "", // 세트는 기본값 없음
    shoes: "fashion_shoes_1.png",
  },
  item: {
    head: "",
    eyes_item: "",
    ears: "",
    neck: "",
    leftWrist: "",
    rightWrist: "",
    leftHand: "",
    rightHand: "",
  },
};

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  // 캐릭터 store 생성
  userInfo: initialUserInfo,

  // [추가] 초기값은 현재 시간
  imgVersion: Date.now(),

  // [추가] 이 함수를 실행하면 시간이 갱신됨 -> 이미지 URL 뒤의 숫자가 바뀜 -> 새 이미지 로드
  updateImgVersion: () => set({ imgVersion: Date.now() }),

  updateUserInfo: (updates) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...updates },
    })),

  resetUserInfo: () => set({ userInfo: initialUserInfo }),

  // 서버에서 사용자 정보 가져오기 (GET)
  fetchUserInfo: async () => {
    try {
      console.log("사용자 정보 동기화 중...");

      const response = await axiosRequest<UserInfo>("/home", "GET", null);
      if (response.status === 200 && response.data) {
        set({ userInfo: response.data });
        console.log("사용자 정보 동기화 완료");
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다.", error);
    }
  },

  // 내 스톤 정보 가져오기 (GET)
  fetchUserStone: async () => {
    try {
      console.log("재화 정보 동기화 중...");

      const response = await axiosRequest<{ stone: number }>(
        "/users/stone",
        "GET",
        null
      );
      if (response.status === 200 && response.data) {
        set((state) => ({
          userInfo: { ...state.userInfo, stone: response.data.stone },
        }));
        console.log("재화 정보 동기화 완료: " + response.data.stone + " Stone");
      }
    } catch (error) {
      console.error("스톤 정보를 가져오는데 실패했습니다.", error);
    }
  },

  // 스톤 충전 (POST)
  chargeStone: async () => {
    try {
      console.log("스톤 충전 요청");

      const response = await axiosRequest<{ message: string }>(
        "/users/stone",
        "POST",
        null
      );
      if (response.status === 200) {
        console.log(response.data.message);
        await get().fetchUserStone();
      }
    } catch (error) {
      console.error("스톤 충전 실패", error);
    }
  },

  // 스톤 충전 여부 가져오기 (GET)
  fetchIsStoneCharged: async () => {
    try {
      console.log("스톤 충전 여부 동기화 중...");

      const response = await axiosRequest<{ isStoneCharged: boolean }>(
        "/users/stone-charge",
        "GET",
        null
      );
      if (response.status === 200 && response.data) {
        set((state) => ({
          userInfo: {
            ...state.userInfo,
            isStoneCharged: response.data.isStoneCharged,
          },
        }));
        console.log(
          "스톤 충전 여부 동기화 완료: " + response.data.isStoneCharged
        );
      }
    } catch (error) {
      console.error("스톤 충전 여부를 가져오는데 실패했습니다.", error);
    }
  },
}));
