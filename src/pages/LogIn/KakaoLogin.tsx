import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { kakaoLogInRequest } from "../../functions/logInRequest";
import { useAuth } from "../../store/authStore";

export default function KakaoLogin() {
  const navigate = useNavigate();
  const url = useLocation();
  const { setToken } = useAuth();
  const urlParams = new URLSearchParams(url.search);
  const hash = urlParams.get("hash");

  useEffect(() => {
    if (hash === null) {
      navigate("/loginfail");
      return;
    }
    const handleLogin = async () => {
      if (hash !== null) {
        const tokenData = await kakaoLogInRequest(hash);
        if (tokenData === null) {
          navigate("/loginfail");
        } else {
          setToken(tokenData.accessToken);
          navigate("/home");
        }
      } else {
        navigate("/loginfail");
      }
    };
    handleLogin();
  }, [hash, navigate, setToken, url.search]);

  return <Outlet />;
}
