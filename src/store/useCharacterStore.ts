import { create } from "zustand";
import { Character } from "../interfaces/Interfaces";

import skin01 from "../assets/Character/face/skin/skin01.png";
import hair01 from "../assets/Character/face/hair/hair01.png";
import face01 from "../assets/Character/face/face/face01.png";


interface CharacterStore {
  character: Character;         // 캐릭터 상태
  updateCharacter: (updates: Partial<Character>) => void; // 캐릭터 업데이트 함수
	resetCharacter: () => void;   // 캐릭터 초기화 함수
}

const initialCharacter: Character = {
  // 초기 캐릭터 상태
  characterId: "",
  characterName: "",
  characterAge: 0,
  face: {
    skinColor: {
      name: "",
      imgurl: skin01,
    },
    hair: {
      name: "",
      imgurl: hair01,
    },
    expression: {
      name: "",
      imgurl: face01,
    },
  },
  outfit: {
    top: { name: "", imgurl: "" },
    bottom: { name: "", imgurl: "" },
    shoes: { name: "", imgurl: "" },
  },
  accessories: { name: "", imgurl: "" },
  background: { name: "", imgurl: "" },
};

export const useCharacterStore = create<CharacterStore>((set) => ({ // 캐릭터 store 생성
  character: initialCharacter,
  updateCharacter: (updates) =>
    set((state) => ({
      character: { ...state.character, ...updates },
    })),
  resetCharacter: () => set({ character: initialCharacter }),
}));
