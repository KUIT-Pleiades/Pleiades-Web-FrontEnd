import { AuthToken } from "../interfaces/Interfaces";
import { useAuth } from "../store/authStore";

export function kakaoLogInRedirect() {
  const BASE_URL: string = import.meta.env.VITE_SERVER_URL;
  const requestURL = `${BASE_URL}/auth/login/kakao`;
  window.location.href = requestURL;
}

export async function kakaoLogInRequest(emailhash: string) {
  const BASE_URL: string = import.meta.env.VITE_SERVER_URL;
  const requestURL = `${BASE_URL}/auth/login/kakao/temp?hash=${emailhash}`;
  const response = await fetch(requestURL, { method: "GET" });
  const status = response.status;
  if (status == 401) {
    //다시 로그인하세요 모달
    return null;
  }
  const data: AuthToken = await response.json();
  return data;
}

export function naverLogInRedirect() {
  const CLIENT_URL: string = import.meta.env.VITE_CLIENT_URL;
  const timeStamp = new Date().getTime();
  const randInt = Math.floor(Math.random() * 900) + 100;
  const stateString = encodeURI(`${timeStamp}${randInt}`);
  const CALLBACK_URL = encodeURI(`${CLIENT_URL}/naverlogin`);
  const CLIENT_ID: string = import.meta.env.VITE_NAVER_CLIENT_ID;
  const naverLogInURL: string = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${stateString}&redirect_uri=${CALLBACK_URL}`;
  return naverLogInURL;
}

export async function naverLogInRequest(authCode: string) {
  const BASE_URL: string = import.meta.env.VITE_SERVER_URL;
  const requestURL = `${BASE_URL}/auth/login/naver`;
  const response = await fetch(requestURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code: authCode }),
  });
  const status = response.status;
  if (status == 401) {
    //다시 로그인하세요 모달
    return null;
  }
  const data: AuthToken = await response.json();
  return data;
}

export async function autoLogInRequest() {
  const { authorization, setToken } = useAuth.getState();
  const BASE_URL: string = import.meta.env.VITE_SERVER_URL;
  const requestURL = `${BASE_URL}/auth`;
  const refreshURL = `${BASE_URL}/auth/refresh`;
  const response1 = await fetch(requestURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response1.status === 200) {
    return true;
  } else if (response1.status === 401) {
    const refreshResponse = await fetch(refreshURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authorization}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      return false; // refresh 실패 → 로그인 실패 처리
    }

    const newAccessToken: AuthToken = await refreshResponse.json();
    setToken(newAccessToken.accessToken);

    const { authorization: newAuthorization } = useAuth.getState();
    const response2 = await fetch(requestURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${newAuthorization}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response2.status === 200;
  } else return false;
}
