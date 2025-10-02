// src/App.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom";

// 기존 페이지 import
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
import TermsPage from './pages/TermsPage/TermsPage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';

// === 애드센스 승인을 위해 대거 추가된 페이지들 ===
import LandingPage from './pages/LandingPage/LandingPage';
import AboutUs from './pages/AboutUs/AboutUs'; // 새로 추가
import Contact from './pages/Contact/Contact'; // 새로 추가
import Blog from './pages/Blog/Blog'; // 새로 추가
import BlogPost1 from "./pages/Blog/BlogPost1"; // 새로 추가
import BlogPost2 from "./pages/Blog/BlogPost2"; // 새로 추가
import BlogPost3 from "./pages/Blog/BlogPost3"; // 새로 추가

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === 1. 로그인 없이 접근 가능한 공개 페이지들 (콘텐츠 대폭 강화) === */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/post-1" element={<BlogPost1 />} />
        <Route path="/blog/post-2" element={<BlogPost2 />} />
        <Route path="/blog/post-3" element={<BlogPost3 />} />

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
          <Route path="/market" element={<Market />}>
            <Route index element={<MarketHome />} />
            <Route path="official-store" element={<OfficialUsedStore />} />
            <Route path="my-item-sell" element={<MyItemSell />} />
            <Route path="my-item-price-check" element={<MyItemPriceCheck />} />
            <Route path="my-product-management" element={<MyProductManagement />} />
            <Route path="transaction-history" element={<TransactionHistory />} />
          </Route>
          <Route path="/setting" element={<Setting />}>
            <Route index element={<PersonalSetting />} />
            <Route path="profile" element={<ProfileSetting />} />
          </Route>
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