import { Outlet } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import Error from "./Error";
import { useEffect, useState } from "react";

export default function AuthHandler() {
  const { authorization } = useAuth();
  const [authState,setAuthState] = useState(false);

  useEffect(()=>{
    console.log(authorization);
    setAuthState(authorization!==null);
  },[authorization])

  return authState ? (
    <Outlet />
  ) : (
    <Error
      title="로그인이 필요해요"
      subTitle="앗! 잘못된 접근이에요"
      destination="/login"
      buttonDescription="로그인 화면으로 이동"
    />
  );
}
