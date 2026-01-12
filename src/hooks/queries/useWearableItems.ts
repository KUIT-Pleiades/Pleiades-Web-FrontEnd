import { useQuery } from "@tanstack/react-query";
import { getWearableItems } from "../../api/characterApi";
import { WearableItemsData } from "../../interfaces/Interfaces";

// ============= 배포 시 false로 변경 =============
const USE_MOCK = false;
// =============================================

// 목업 데이터
const mockWearableItems: WearableItemsData = {
  faceItems: [
    // 피부색
    { id: 1, name: "face_skin_1.png", description: "밝은 피부", basic: true },
    { id: 2, name: "face_skin_2.png", description: "중간 피부", basic: true },
    { id: 3, name: "face_skin_3.png", description: "어두운 피부", basic: true },
    // 머리
    { id: 10, name: "face_hair_1.png", description: "단발머리", basic: true },
    { id: 11, name: "face_hair_2.png", description: "긴생머리", basic: true },
    { id: 12, name: "face_hair_3.png", description: "곱슬머리", basic: false },
    { id: 13, name: "face_hair_4.png", description: "포니테일", basic: false },
    // 눈
    { id: 20, name: "face_eyes_1.png", description: "기본 눈", basic: true },
    { id: 21, name: "face_eyes_2.png", description: "큰 눈", basic: true },
    { id: 22, name: "face_eyes_3.png", description: "고양이 눈", basic: false },
    // 코
    { id: 30, name: "face_nose_1.png", description: "기본 코", basic: true },
    // 입
    { id: 40, name: "face_mouth_1.png", description: "미소", basic: true },
    { id: 41, name: "face_mouth_2.png", description: "도톰 입술", basic: true },
    { id: 42, name: "face_mouth_3.png", description: "웃는 입", basic: false },
    // 점
    {
      id: 50,
      name: "face_mole_1.png",
      description: "왼쪽 볼 점",
      basic: false,
    },
  ],
  fashionItems: [
    // 상의
    {
      id: 100,
      name: "fashion_top_1.png",
      description: "기본 티셔츠",
      basic: true,
    },
    {
      id: 101,
      name: "fashion_top_2.png",
      description: "스트라이프 셔츠",
      basic: false,
    },
    { id: 102, name: "fashion_top_3.png", description: "후드티", basic: false },
    // 하의
    {
      id: 110,
      name: "fashion_bottom_1.png",
      description: "청바지",
      basic: true,
    },
    {
      id: 111,
      name: "fashion_bottom_2.png",
      description: "검정 슬랙스",
      basic: false,
    },
    // 세트
    { id: 120, name: "fashion_set_1.png", description: "원피스", basic: false },
    // 신발
    {
      id: 130,
      name: "fashion_shoes_1.png",
      description: "스니커즈",
      basic: true,
    },
    { id: 131, name: "fashion_shoes_2.png", description: "구두", basic: false },
    // 악세서리 - 머리
    {
      id: 140,
      name: "fashion_acc_head_1.png",
      description: "버킷햇",
      basic: false,
    },
    // 악세서리 - 눈
    {
      id: 150,
      name: "fashion_acc_eyes_1.png",
      description: "선글라스",
      basic: false,
    },
    // 악세서리 - 귀
    {
      id: 160,
      name: "fashion_acc_ears_1.png",
      description: "이어링",
      basic: false,
    },
    // 악세서리 - 목
    {
      id: 170,
      name: "fashion_acc_neck_1.png",
      description: "목걸이",
      basic: false,
    },
    // 악세서리 - 왼손목
    {
      id: 180,
      name: "fashion_acc_leftWrist_1.png",
      description: "시계",
      basic: false,
    },
    // 악세서리 - 왼손
    {
      id: 190,
      name: "fashion_acc_leftHand_1.png",
      description: "반지",
      basic: false,
    },
    // 악세서리 - 오른손
    {
      id: 200,
      name: "fashion_acc_rightHand_1.png",
      description: "꽃",
      basic: false,
    },
  ],
};

// 목업용 비동기 함수 (실제 API처럼 딜레이 추가)
const getMockWearableItems = (): Promise<WearableItemsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWearableItems);
    }, 500); // 0.5초 딜레이
  });
};

export const useWearableItems = () => {
  return useQuery({
    queryKey: ["wearable", "items"],
    queryFn: USE_MOCK ? getMockWearableItems : getWearableItems,
  });
};
