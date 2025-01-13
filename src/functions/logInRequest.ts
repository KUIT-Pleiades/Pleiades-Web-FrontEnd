import { AuthToken } from "../interfaces/Interfaces";
import { codeType } from "../types/types";

export async function kakaoLoginRequest(userID: string) {
  const BASE_URL: string = import.meta.env.VITE_SERVER_URL;
  const requestURL = `${BASE_URL}/auth/login/kakao?userId=${userID}`;
  const response = await fetch(requestURL, { method: "GET" });
  const data = await response.json(); //로그인 완료 시 유저 정보 Promise 객체 반환
  return data;
  //data에 type 설정 추가해야함 (UserType)
}

export function naverLogInRedirect() {
  const CLIENT_URL: string = import.meta.env.VITE_CLIENT_URL;
  const timeStamp = new Date().getTime();
  const randInt = Math.floor(Math.random() * 900) + 100;
  const stateString = `${timeStamp}${randInt}`;
  const CALLBACK_URL = `${CLIENT_URL}/naverlogin`;
  const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID;
  const naverLogInURL: string = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${stateString}&redirect_uri=${CALLBACK_URL}`;
  return naverLogInURL;
}

export async function naverLogInRequest(authCode: string, codeType: codeType) {
  const BASE_URL: string = import.meta.env.VITE_SERVER_URL;
  const requestURL = `${BASE_URL}/auth/login/naver/callback`;
  const response = await fetch(requestURL, {
    method: "POST",
    body: JSON.stringify({ code: authCode, type: codeType }),
  });
  const data: AuthToken = await response.json(); //로그인 완료 시 유저 정보 Promise 객체 반환
  return data;
}
