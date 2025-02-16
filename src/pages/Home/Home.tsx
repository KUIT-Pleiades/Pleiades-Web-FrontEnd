import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";
import { useCallback, useEffect } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";
import { useAuth } from "../../store/authStore";
import { fetchRequest } from "../../functions/fetchRequest";
import { User } from "../../interfaces/Interfaces";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSetup = location.pathname.includes("charactersetting");
  const { authorization } = useAuth();
  const { updateUserInfo } = useCharacterStore();
  const fetchUserInfo = useCallback(async () => {
  try {
    console.log("Fetching user info...");
    const data = await fetchRequest<User>("/home", "GET", null);
    console.log("Fetched data:", data);
    if (data !== null) {
      if (data.userId === "") {
        console.log("Navigating to /onboarding");
        navigate("/onboarding");
      } else {
        updateUserInfo(data);
      }
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}, [navigate, updateUserInfo]);

  useEffect(() => {
    if (authorization !== null) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, navigate, updateUserInfo, authorization]);

  return (
    <>
      <Outlet />
      {isSetup ? "" : <BottomBar />}
    </>
  );
}
