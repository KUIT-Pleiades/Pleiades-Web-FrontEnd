import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogInState } from "../../types/types";
import { kakaoLogInRequest } from "../../functions/logInRequest";
import { useAuth } from "../../store/authStore";

export default function KakaoLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const { setToken } = useAuth();
  const [loginState, setLoginState] = useState<LogInState>("Pending");

  useEffect(() => {
    const urlParams = new URLSearchParams(url.search);
    const hash = urlParams.get("hash");
    const handleLogin = async () => {
      if (hash !== null) {
        const tokenData = await kakaoLogInRequest(hash);
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
  }, [navigate, setToken, url.search]);

  return <div>{loginState}</div>;
}
