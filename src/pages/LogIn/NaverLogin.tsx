import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogInRequest } from "../../functions/logInRequest";
import { useAuth } from "../../store/authStore";

export default function NaverLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const { authorization, setToken } = useAuth();
  const urlParams = new URLSearchParams(url.search);
  const authCode = urlParams.get("code");

  useEffect(() => {
    if (authorization) {
      navigate("/home");
    }
  }, [authorization, navigate]);

  useEffect(() => {
    if (!authCode) {
      navigate("/loginfail");
      return;
    }
    const handleLogin = async () => {
      const tokenData = await naverLogInRequest(authCode);
      if (!tokenData) {
        navigate("/loginfail");
      } else {
        console.log(tokenData.accessToken);
        setToken(tokenData.accessToken);
      }
    };
    handleLogin();
  }, [navigate, setToken, url.search]);

  return <div>pending...</div>;
}
