// src/pages/CharacterSettings/hooks/useSignupMutation.ts
import { useMutation } from "@tanstack/react-query";
import { axiosRequest } from "../../../functions/axiosRequest";
import { Message, UserInfo } from "../../../interfaces/Interfaces";

export const useSignupMutation = (isOnboarding: boolean) => {
  const endpoint = isOnboarding
    ? "/auth/signup"
    : "/home/settings/character";

  return useMutation<Message, Error, UserInfo>({
    mutationFn: async (userInfo) => {
      const response = await axiosRequest<Message>(
        endpoint,
        "POST",
        userInfo
      );
      if (!response) throw new Error("회원가입 요청 실패");
      return response.data;
    },
  });
};