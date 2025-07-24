import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "./pages/SplashScreen/Splash";
import Home from "./pages/Home/Home";
import Station from "./pages/Station/Station";
import LogIn from "./pages/LogIn/LogIn";
import NaverLogin from "./pages/LogIn/NaverLogin";
import FriendsTab from "./pages/FriendsTab/FriendsTab";
import SearchUsers from "./pages/SearchUsers/SearchUsers";
import ShowStationList from "./pages/Station/ShowStationsList/ShowStationList";
import Error from "./pages/PageManagement/Error";
import KakaoLogin from "./pages/LogIn/KakaoLogin";
import AuthHandler from "./pages/PageManagement/AuthHandler";
import CharacterSettings from "./pages/CharacterSettings/CharacterSettings";
import Setting from "./pages/Setting/Setting";
import Market from "./pages/Market/Market";
import MyStar from "./pages/Home/MyStar";
import CreateStation from "./pages/Station/CreateStation/CreateStation";
import Report from "./pages/Report/Report";
import StationInside from "./pages/Station/StationInside/StationInside";
import PersonalSetting from "./pages/Setting/PersonalSetting/PersonalSetting";
import ProfileSetting from "./pages/Setting/ProfileSetting/ProfileSetting";
import OfficialStore from "./pages/Market/OfficialStore/OfficialStore";
import UsedStore from "./pages/Market/UsedStore";
import MyPage from "./pages/Market/MyPage";
import StationSetting from "./pages/Station/StationSetting/StationSetting";
import StationBackgroundSetting from "./pages/Station/StationSetting/StationBackgroundSetting";
import FriendStar from "./pages/FriendStar/FriendStar";
import FriendReport from "./pages/FriendStar/FriendReport/FriendReport";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="naverlogin" element={<NaverLogin />} />
        <Route path="kakaologin" element={<KakaoLogin />} />
        <Route
          path="/loginfail"
          element={
            <Error
              title="다시 로그인해주세요"
              subTitle="앗! 로그인에 실패했어요"
              destination="/login"
              buttonDescription="다시 로그인하기"
            />
          }
        />
        <Route element={<AuthHandler />}>
          <Route path="onboarding" element={<CharacterSettings />}></Route>
          <Route path="/home" element={<Home />}>
            <Route index element={<MyStar />} />
            <Route
              path="charactersetting"
              element={<CharacterSettings />}
            ></Route>
          </Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path="market" element={<Market />}>
            <Route index element={<OfficialStore />} />
            <Route path="used" element={<UsedStore />} />
            <Route path="my" element={<MyPage />} />
          </Route>
          <Route path="setting" element={<Setting />}>
            <Route index element={<PersonalSetting />} />
            <Route path="profile" element={<ProfileSetting />} />
          </Route>
          <Route path="station" element={<Station />}>
            <Route index element={<ShowStationList />} />
            <Route path="createstation" element={<CreateStation />} />
            <Route path="stationinside" element={<StationInside />} />
            <Route path="stationsetting" element={<StationSetting />} />
            <Route
              path="stationbackgroundsetting"
              element={<StationBackgroundSetting />}
            />
          </Route>
          <Route path="friendtab" element={<FriendsTab />}></Route>
          <Route path="searchusers" element={<SearchUsers />}></Route>
          <Route path="friendstar" element={<FriendStar />}></Route>
          <Route path="friendreport" element={<FriendReport />}></Route>
        </Route>
        <Route
          path="*"
          element={
            <Error
              title="경로를 다시 확인해주세요"
              subTitle="앗! 잘못된 접근이에요"
              destination="/home"
              buttonDescription="홈으로 돌아가기"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
