import { create } from "zustand";
import { Character } from "../interfaces/Interfaces";

import skin01 from "../assets/Character/face/skin/skin01.png";
import hair01 from "../assets/Character/face/hair/hair01.png";
import face01 from "../assets/Character/face/face/face01.png";
import top01 from "../assets/Character/outfit/top/top01.png";
import bottom01 from "../assets/Character/outfit/bottom/bottom01.png";
import shoes01 from "../assets/Character/outfit/shoes/shoes01.png";
import background01 from "../assets/backgroundImg/starBackroundImg/backgroundImg01.png"


interface CharacterStore {
  character: Character;         // 캐릭터 상태
  updateCharacter: (updates: Partial<Character>) => void; // 캐릭터 업데이트 함수
	resetCharacter: () => void;   // 캐릭터 초기화 함수
}

const initialCharacter: Character = {
  // 초기 캐릭터 상태 -> 디자이너, pm 과 상의
  characterId: "",
  characterName: "",
  characterAge: 0,
  face: {
    skinColor: {
      name: "skin01",
      imgurl: skin01,
    },
    hair: {
      name: "hair01",
      imgurl: hair01,
    },
    expression: {
      name: "face01",
      imgurl: face01,
    },
  },
  outfit: {
    top: { name: "top01", imgurl: top01 },
    bottom: { name: "bottom01", imgurl: bottom01 },
    shoes: { name: "shoes01", imgurl: shoes01 },
  },
  item: {
    head: { name: "", imgurl: "" },
    eyes: { name: "", imgurl: "" },
    ears: { name: "", imgurl: "" },
    neck: { name: "", imgurl: "" },
    leftWrist: { name: "", imgurl: "" },
    rightWrist: { name: "", imgurl: "" },
    leftHand: { name: "", imgurl: "" },
    rightHand: { name: "", imgurl: "" },
  },
  background: { name: "background01", imgurl: background01 },
};

export const useCharacterStore = create<CharacterStore>((set) => ({ // 캐릭터 store 생성
  character: initialCharacter,
  updateCharacter: (updates) =>
    set((state) => ({
      character: { ...state.character, ...updates },
    })),
  resetCharacter: () => set({ character: initialCharacter }),
}));
