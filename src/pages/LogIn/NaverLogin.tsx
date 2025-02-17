import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { naverLogInRequest } from "../../functions/logInRequest";
import { useAuth } from "../../store/authStore";

export default function NaverLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const { setToken } = useAuth();
  const urlParams = new URLSearchParams(url.search);
  const authCode = urlParams.get("code");
  const stateString = urlParams.get("state");

  // useEffect(() => {
  //   if (authorization) {
  //     console.log(authorization);
  //     navigate("/home");
  //   }
  // }, [authorization, navigate]);

  useEffect(() => {
    if (!authCode || !stateString) {
      navigate("/loginfail");
      return;
    }
    const handleLogin = async () => {
      const tokenData = await naverLogInRequest(authCode, stateString);
      if (tokenData === null) {
        navigate("/loginfail");
      } else {
        console.log(tokenData.accessToken);
        navigate("/home");
      }
    };
    handleLogin();
  }, [authCode, navigate, setToken, stateString, url.search]);

  return <Outlet />;
}
