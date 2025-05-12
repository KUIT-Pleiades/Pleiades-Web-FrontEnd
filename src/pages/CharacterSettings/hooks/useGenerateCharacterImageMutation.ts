// src/pages/CharacterSettings/hooks/useGenerateCharacterImageMutation.ts
import { useMutation } from "@tanstack/react-query";
import { CharacterImg } from "../../../interfaces/Interfaces";

const IMG_MAKER = import.meta.env.VITE_IMG_MAKER;

interface CharacterData {
  userId: string;
  userName: string;
  birthDate: string;
  starBackground: string;
  face: {
    skinColor: string;
    hair: string;
    expression: string;
  };
  outfit: {
    top: string;
    bottom: string;
    shoes: string;
  };
  item: {
    head: string;
    eyes: string;
    ears: string;
    neck: string;
    leftWrist: string;
    rightWrist: string;
    leftHand: string;
    rightHand: string;
  };
}

export const useGenerateCharacterImageMutation = () => {
  return useMutation<CharacterImg, Error, CharacterData>({
    mutationFn: async (characterData) => {
      const response = await fetch(IMG_MAKER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterData),
      });

      if (!response.ok) {
        throw new Error("캐릭터 이미지 생성 실패");
      }

      return await response.json();
    },
  });
};