import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

//import Splash from "./pages/SplashScreen/Splash"; // 스플래시 페이지가 필요하다면 주석 해제
import Home from "./pages/Home/Home";
import Station from "./pages/Station/Station";
import LogIn from "./pages/LogIn/LogIn";
import NaverLogin from "./pages/LogIn/NaverLogin";
import KakaoLogin from "./pages/LogIn/KakaoLogin";
import FriendsTab from "./pages/FriendsTab/FriendsTab";
import SearchUsers from "./pages/SearchUsers/SearchUsers";
import ShowStationList from "./pages/Station/ShowStationsList/ShowStationList";
import Error from "./pages/PageManagement/Error";
import AuthHandler from "./pages/PageManagement/AuthHandler";
import CharacterSettings from "./pages/CharacterSettings/CharacterSettings";
import Setting from "./pages/Setting/Setting";
import MyStar from "./pages/Home/MyStar";
import CreateStation from "./pages/Station/CreateStation/CreateStation";
import Report from "./pages/Report/Report";
import StationInside from "./pages/Station/StationInside/StationInside";
import PersonalSetting from "./pages/Setting/PersonalSetting/PersonalSetting";
import ProfileSetting from "./pages/Setting/ProfileSetting/ProfileSetting";
import OfficialUsedStore from "./pages/Market/OfficialStore/OfficialUsedStore";
import StationSetting from "./pages/Station/StationSetting/StationSetting";
import StationBackgroundSetting from "./pages/Station/StationSetting/StationBackgroundSetting";
import FriendStar from "./pages/FriendStar/FriendStar";
import FriendReport from "./pages/FriendStar/FriendReport/FriendReport";
import MarketHome from "./pages/Market/MarketHome";
import MyItemSell from "./pages/Market/MyItemSell/MyItemSell";
import MyItemPriceCheck from "./pages/Market/MyItemPriceCheck/MyItemPriceCheck";
import MyProductManagement from "./pages/Market/MyProductManagement/MyProductManagement";
import TransactionHistory from "./pages/Market/TransactionHistory/TransactionHistory";
import Market from "./pages/Market/Market";

// AdSense 를 위한 랜딩페이지, 약관, 개인정보처리방침 페이지
import LandingPage from './pages/LandingPage/LandingPage';
import TermsPage from './pages/TermsPage/TermsPage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* === 1. 로그인 없이 접근 가능한 공개 페이지들 === */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/kakaologin" element={<KakaoLogin />} />
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
        {/* Splash 스크린이 필요하다면 별도 경로로 유지할 수 있습니다. 예: <Route path="/splash" element={<Splash />} /> */}


        {/* === 2. 로그인이 반드시 필요한 기존 앱 페이지들 === */}
        <Route element={<AuthHandler />}>
          <Route path="/onboarding" element={<CharacterSettings />}></Route>
          <Route path="/home" element={<Home />}>
            <Route index element={<MyStar />} />
            <Route
              path="charactersetting"
              element={<CharacterSettings />}
            ></Route>
          </Route>
          <Route path="/report" element={<Report />}></Route>

          {/* 상점 관련 루트 */}
          <Route path="/market" element={<Market />}>
            <Route index element={<MarketHome />} />
            <Route path="official-store" element={<OfficialUsedStore />} />
            <Route path="my-item-sell" element={<MyItemSell />} />
            <Route path="my-item-price-check" element={<MyItemPriceCheck />} />
            <Route path="my-product-management" element={<MyProductManagement />} />
            <Route path="transaction-history" element={<TransactionHistory />} />
          </Route>

          {/* 세팅 관련 루트 */}
          <Route path="/setting" element={<Setting />}>
            <Route index element={<PersonalSetting />} />
            <Route path="profile" element={<ProfileSetting />} />
          </Route>

          {/* 정거장 관련 루트 */}
          <Route path="/station" element={<Station />}>
            <Route index element={<ShowStationList />} />
            <Route path="createstation" element={<CreateStation />} />
            <Route path="stationinside" element={<StationInside />} />
            <Route path="stationsetting" element={<StationSetting />} />
            <Route path="stationbackgroundsetting" element={<StationBackgroundSetting />} />
          </Route>

          <Route path="/friendtab" element={<FriendsTab />}></Route>
          <Route path="/searchusers" element={<SearchUsers />}></Route>
          <Route path="/friendstar" element={<FriendStar />}></Route>
          <Route path="/friendreport" element={<FriendReport />}></Route>
        </Route>
        
        {/* 일치하는 라우트가 없을 때 표시할 에러 페이지 */}
        <Route
          path="*"
          element={
            <Error
              title="경로를 다시 확인해주세요"
              subTitle="앗! 잘못된 접근이에요"
              destination="/"
              buttonDescription="랜딩 페이지로 돌아가기"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}