import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogInRequest } from "../../functions/logInRequest";
import { useAuth } from "../../store/authStore";
import LogInPending from "./LogInPending";
import { axiosRequest } from "../../functions/axiosRequest";
import { Message, UserInfo } from "../../interfaces/Interfaces";
import { isMessage } from "../../functions/isMessage";
import { useCharacterStore } from "../../store/useCharacterStore";
import { trackEvent } from "../../utils/analytics";

export default function NaverLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const { authorization, setToken } = useAuth();
  const { updateUserInfo } = useCharacterStore();
  const urlParams = new URLSearchParams(url.search);
  const authCode = urlParams.get("code");

  useEffect(() => {
    if (!authCode) {
      navigate("/loginfail");
      return;
    }
    const handleLogin = async () => {
      const tokenData = await naverLogInRequest(authCode);
      if (tokenData === null) {
        navigate("/loginfail");
        return;
      }
      setToken(tokenData.accessToken);
    };

    handleLogin();
  }, [authCode, navigate, setToken, updateUserInfo, url.search]);

  useEffect(() => {
  if (authorization) {
    const getUser = async () => {
      const userData = await axiosRequest<UserInfo | Message>("/home", "GET", null);
      if (userData !== null) {
        if (isMessage(userData.data)) {
          /* [Insight] 네이버 로그인 성공 - 신규 유저 */
          trackEvent("Auth", "login_success", { method: "naver", isNewUser: true });
          navigate("/onboarding");
        } else {
          /* [Insight] 네이버 로그인 성공 - 기존 유저 */
          updateUserInfo(userData.data);
          trackEvent("Auth", "login_success", { method: "naver", isNewUser: false });
          navigate("/home");
        }
      } else navigate("/loginfail");
    };
    getUser();
  }
}, [authorization, navigate, updateUserInfo]);

  return <LogInPending />;
}
