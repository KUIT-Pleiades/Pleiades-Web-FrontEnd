import { create } from "zustand";
import { UserInfo } from "../interfaces/Interfaces";
// import { axiosRequest } from "../api/axiosInstance"; // <- 이거 나중에 재화 API 통신할 때 사용

interface CharacterStore {
  userInfo: UserInfo; // 캐릭터 상태
  updateUserInfo: (updates: Partial<UserInfo>) => void; // 캐릭터 업데이트 함수
  resetUserInfo: () => void; // 캐릭터 초기화 함수

  fetchUserStone: () => Promise<void>; // 서버에서 스톤 정보를 가져옴
  chargeStone: (addAmount: number) => Promise<void>; // 스톤 추가/차감 (결제 혹은 보상 등)
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

  updateUserInfo: (updates) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...updates },
    })),
  
  resetUserInfo: () => set({ userInfo: initialUserInfo }),

  // 내 스톤 정보 가져오기 (GET)
  fetchUserStone: async () => {
    try {
      console.log("재화 정보 동기화 중...");
      
      // --- [서버 통신 예시 코드] ---
      // const response = await axiosRequest('/api/user/stone', 'GET', null);
      // if (response.status === 200) {
      //    const serverStone = response.data.stone;
      //    set((state) => ({
      //      userInfo: { ...state.userInfo, stone: serverStone }
      //    }));
      // }
      // -------------------------

      // [임시 Mock] 1초 뒤에 500 스톤을 가지고 있다고 가정
      await new Promise((resolve) => setTimeout(resolve, 500));
      set((state) => ({
        userInfo: { ...state.userInfo, stone: 500 },
      }));
      console.log("재화 정보 동기화 완료: 500 Stone");

    } catch (error) {
      console.error("스톤 정보를 가져오는데 실패했습니다.", error);
    }
  },

  // 스톤 충전 (POST)
  chargeStone: async (addAmount: number) => {
    // 1. 음수 값 방어 로직
    if (addAmount < 0) {
        console.warn("충전할 스톤 양(addAmount)은 0보다 커야 합니다.");
        return;
    }

    try {
      const currentStone = get().userInfo.stone;
      console.log(`스톤 변경 요청: ${addAmount} (현재: ${currentStone})`);

      // --- [서버 통신 예시 코드] ---
      // 요청 바디 키 이름을 addAmount로 설정
      // const response = await axiosRequest('/api/v1/user/stone', 'POST', { addAmount });
      // if (response.status === 200) {
      //    const newBalance = response.data.stone;
      //    set((state) => ({
      //      userInfo: { ...state.userInfo, stone: newBalance }
      //    }));
      // }
      // -------------------------

      // [임시 Mock] 즉시 상태 반영
      await new Promise((resolve) => setTimeout(resolve, 300));
      set((state) => ({
        userInfo: { ...state.userInfo, stone: state.userInfo.stone + addAmount },
      }));
      console.log(`스톤 충전 완료: ${get().userInfo.stone}`);

    } catch (error) {
      console.error("스톤 충전 실패", error);
    }
  },
}));
