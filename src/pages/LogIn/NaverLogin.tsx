import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogInRequest } from "../../functions/logInRequest";
import { useAuth } from "../../store/authStore";
import LogInPending from "./LogInPending";
import { fetchRequest } from "../../functions/fetchRequest";
import { Message, UserInfo } from "../../interfaces/Interfaces";
import { isMessage } from "../../functions/isMessage";
import { useCharacterStore } from "../../store/useCharacterStore";

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
        const userData = await fetchRequest<UserInfo | Message>(
          "/home",
          "GET",
          null
        );
        if (userData !== null) {
          if (isMessage(userData)) {
            console.log(userData.message);
            navigate("/onboarding");
          } else {
            updateUserInfo(userData);
            navigate("/home");
          }
        } else navigate("/loginfail");
      };
      getUser();
    }
  }, [authorization, navigate, updateUserInfo]);

  return <LogInPending />;
}
