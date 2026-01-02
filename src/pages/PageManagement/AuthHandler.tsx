import { Outlet } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import Error from "./Error";
import { useEffect, useState } from "react";
import { sha256 } from "../../utils/hashUtils";
import axios from "axios";

export default function AuthHandler() {
  const { authorization, setToken } = useAuth();
  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);

  // 개발 환경 체크
  const isDevelopment = import.meta.env.MODE === "development";
  const devAuthBypass = import.meta.env.VITE_DEV_AUTH;

  // 하드코딩된 해시값 (pleiades-web-2025!의 SHA-256)
  const VALID_PASSWORD_HASH =
    "b4b0816e362ca087d4842a4cc35069bbd28112d24837549ee38875b1b3ad73ba";

  useEffect(() => {
    const checkAuth = async () => {
      // 개발모드이고 비밀번호가 설정된 경우
      if (isDevelopment && devAuthBypass) {
        try {
          const inputHash = await sha256(devAuthBypass);
          if (inputHash === VALID_PASSWORD_HASH) {
            setAuthState(true);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Hash generation failed:", error);
        }
      }

      // access token이 없으면 refresh token으로 재발급 시도
      if (!authorization) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          const newToken = response.data.accessToken;
          setToken(newToken);
          setAuthState(true);
          setLoading(false);
          return;
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
          setAuthState(false);
          setLoading(false);
          return;
        }
      }

      // access token이 있으면 인증 성공
      setAuthState(true);
      setLoading(false);
    };

    checkAuth();
  }, [authorization, isDevelopment, devAuthBypass, setToken]);

  if (loading) {
    return null; // 또는 로딩 스피너
  }

  return authState ? (
    <Outlet />
  ) : (
    <Error
      title="로그인이 필요해요"
      subTitle="앗! 잘못된 접근이에요"
      destination="/login"
      buttonDescription="로그인 화면으로 이동"
    />
  );
}
