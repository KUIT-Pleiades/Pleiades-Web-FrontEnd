import { AuthToken } from "../interfaces/Interfaces";
import { useAuth } from "../store/authStore";
import { Methods } from "../types/types";

/** requestURL 작성 시 /포함해서 작성.
 * ex) /home/me 이런식으로
 * 그리고 사용 시 <>내에 타입지정해줘야함*/
export const fetchRequest = async <T>(
  requestPoint: string,
  method: Methods,
  body: object | null
): Promise<T | null> => {
  const BASEURL = import.meta.env.VITE_SERVER_URL;
  const requestURL = `${BASEURL}${requestPoint}`;
  const { authorization, setToken } = useAuth.getState();

  function setRequest(
    method: Methods,
    body: object | null,
    token: string | null
  ) {
    const credentials: RequestCredentials | undefined = "include";
    if (body !== null) {
      const request = {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: credentials,
        body: JSON.stringify(body),
      };
      return request;
    } else {
      const request = {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: credentials,
      };
      return request;
    }
  }

  async function refresh(): Promise<AuthToken | null> {
    // access 토큰 refresh 받는 url
    const refreshUrl = `${BASEURL}/auth/refresh`;
    const response = await fetch(refreshUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.headers.get("content-type") !== "application/json") {
      console.log("응답형식이 JSON이 아닙니다");
      return null;
    }
    return response.json();
  }

  let req = setRequest(method, body, authorization);
  let response = await fetch(requestURL, req);
  if (response.headers.get("content-type") !== "application/json") {
    console.log("응답형식이 JSON이 아닙니다");
    return null;
  }
  if (response.status === 401 || response.status === 428) {
    const refreshedAccessToken = await refresh();
    if (refreshedAccessToken !== null) {
      setToken(refreshedAccessToken.accessToken);
      req = setRequest(method, body, refreshedAccessToken.accessToken);
      response = await fetch(requestURL, req);
      return response.json() as Promise<T>;
    } else {
      console.log("refresh실패");
      return null;
    }
  } else if (response.status === 403) {
    console.log("재로그인 필요");
    return null; // 재 로그인 필요
  }
  return response.json() as Promise<T>;
};
