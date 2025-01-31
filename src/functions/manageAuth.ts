// accessToken은 전역상태 관리 라이브러리를 통해 메모리에 저장하는게 안전
// refreshToken은 쿠키를 이용해서 저장하는게 안전
// 현재는 둘 다 로컬스토리지에 저장해버려서
// console.log(window.localStorage.getItem("pleiadesTokenNR"))
// 하면 토큰 다 보임
// 수정해야함

export type Methods = "GET" | "POST" | "PUT" | "DELETE";

export function setRequest(
  method: Methods,
  accessToken: string,
  body: object | null
) {
  const credentials: RequestCredentials | undefined = "include";
  if (body !== null) {
    const request = {
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: credentials,
    };
    return request;
  }
}
