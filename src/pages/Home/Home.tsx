import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";
import { useEffect } from "react";
import { getUser } from "../../functions/getUserInfo";
import { useCharacterStore } from "../../store/useCharacterStore";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSetup = location.pathname.includes("charactersetting");
  const { userInfo, updateUserInfo } = useCharacterStore();

  useEffect(() => {
    // 유저정보가 비어있으면 데이터 받아오기
    // 안비어있으면 전역상태에서 가져오면 됨
    const fetchUserInfo = async () => {
      if (userInfo.userId === "") {
        const data = await getUser();
        if (data === null) {
          return <>데이터 로드 실패</>;
        }
        updateUserInfo(data);
        if (data.userId === "") {
          navigate("/home/charactersetting");
        } else {
          navigate("/home/mystar");
        }
      }
    };
    fetchUserInfo();
  }, [navigate, updateUserInfo, userInfo.userId]);

  return (
    <>
      <Outlet />
      {isSetup ? "" : <BottomBar />}
    </>
  );
}
