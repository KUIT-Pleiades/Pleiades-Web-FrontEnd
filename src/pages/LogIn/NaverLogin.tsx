import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogInRequest } from "../../functions/logInRequest";
import { LogInState } from "../../types/types";

export default function NaverLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const urlParams = new URLSearchParams(url.search);
  const authCode = urlParams.get("code");
  const [loginState, setLoginState] = useState<LogInState>("Pending");

  useEffect(() => {
    const handleLogin = async () => {
      if (authCode !== null) {
        const tokenData = await naverLogInRequest(authCode, "Auth");
        if (tokenData == null) {
          navigate("/login");
        } else {
          window.localStorage.setItem("pleiadesTokenNA", tokenData.accessToken);
          window.localStorage.setItem(
            "pleiadesTokenNR",
            tokenData.refreshToken
          );
          setLoginState("Success");
        }
      } else {
        setLoginState("Fail");
        navigate("/login");
      }
    };
    handleLogin();
  }, [authCode, navigate]);

  return <div>{loginState}</div>;
}
