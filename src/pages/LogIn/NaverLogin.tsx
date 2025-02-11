import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogInRequest } from "../../functions/logInRequest";
import { useAuth } from "../../store/authStore";

export default function NaverLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const { setToken } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(url.search);
    const authCode = urlParams.get("code");
    console.log(authCode);
    if (!authCode) {
      navigate("/loginfail");
      return;
    }
    const handleLogin = async () => {
      const tokenData = await naverLogInRequest(authCode);
      if (tokenData == null) {
        navigate("/loginfail");
      } else {
        setToken(tokenData.accessToken);
        navigate("/home");
      }
    };
    handleLogin();
  }, [navigate, setToken, url.search]);

  return <div>pending...</div>;
}
