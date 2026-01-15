import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogInRequest } from "../../functions/logInRequest";
import { useAuth } from "../../store/authStore";
import LogInPending from "./LogInPending";
import { axiosRequest } from "../../functions/axiosRequest";
import { Message, UserInfo } from "../../interfaces/Interfaces";
import { isMessage } from "../../functions/isMessage";
import { useCharacterStore } from "../../store/useCharacterStore";
import { trackEvent } from "../../utils/analytics";

export default function KakaoLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const { authorization, setToken } = useAuth();
  const { updateUserInfo } = useCharacterStore();
  const urlParams = new URLSearchParams(url.search);
  const hash = urlParams.get("hash");

  useEffect(() => {
    if (!hash) {
      navigate("/loginfail");
      return;
    }
    const handleLogin = async () => {
      const tokenData = await kakaoLogInRequest(hash);
      if (tokenData === null) {
        navigate("/loginfail");
        return;
      }
      setToken(tokenData.accessToken);
    };

    handleLogin();
  }, [hash, navigate, setToken, updateUserInfo, url.search]);

  useEffect(() => {
  if (authorization) {
    const getUser = async () => {
      try {
        const userData = await axiosRequest<UserInfo | Message>("/home", "GET", null);

        if (isMessage(userData.data)) {
          /* [Insight] 신규 유저가 온보딩으로 넘어가는 시점입니다. */
          trackEvent("Auth", "login_success", { method: "kakao", isNewUser: true });
          navigate("/onboarding");
        } else {
          /* [Insight] 기존 유저가 메인 홈으로 들어가는 시점입니다. */
          updateUserInfo(userData.data);
          trackEvent("Auth", "login_success", { method: "kakao", isNewUser: false });
          navigate("/home");
        }
      } catch (error) {
        console.error("사용자 정보 요청 오류:", error);
        navigate("/loginfail");
      }
    };
    getUser();
  }
}, [authorization, navigate, updateUserInfo]);

  return <LogInPending />;
}
