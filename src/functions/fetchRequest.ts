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

  function setRequest(method: Methods, body: object | null) {
    const credentials: RequestCredentials | undefined = "include";
    if (body !== null) {
      const request = {
        method: method,
        headers: {
          Authorization: `Bearer ${authorization}`,
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
          Authorization: `Bearer ${authorization}`,
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
    const req = setRequest("GET", null);
    const response = await fetch(refreshUrl, req);
    if (response.headers.get("content-type") !== "application/json")
      return null;
    return response.json();
  }

  const req = setRequest(method, body);
  const response1 = await fetch(requestURL, req);
  if (response1.headers.get("content-type") !== "application/json") {
    return null;
  }
  if (response1.status === 401) {
    const refreshedAccessToken = await refresh();
    if (refreshedAccessToken !== null) {
      setToken(refreshedAccessToken.accessToken);
      const response2 = await fetch(requestURL, req);
      return response2.json() as Promise<T>;
    } else {
      return null;
    }
  } else if (response1.status === 403) {
    return null; // 재 로그인 필요
  }
  return response1.json() as Promise<T>;
};
