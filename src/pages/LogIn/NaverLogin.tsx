import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogInRequest } from "../../functions/logInRequest";
import { LogInState } from "../../types/types";
import { useAuth } from "../../store/authStore";

export default function NaverLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const { setToken } = useAuth();
  const [loginState, setLoginState] = useState<LogInState>("Pending");
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(url.search);
    setAuthCode(urlParams.get("code"));
    const handleLogin = async () => {
      if (authCode !== null) {
        const tokenData = await naverLogInRequest(authCode);
        if (tokenData == null) {
          navigate("/loginfail");
        } else {
          setToken(tokenData.accessToken);
          setLoginState("Success");
          navigate("/home");
        }
      } else {
        setLoginState("Fail");
        navigate("/loginfail");
      }
    };
    handleLogin();
  }, [authCode, navigate, setToken, url.search]);

  return <div>{loginState}</div>;
}
