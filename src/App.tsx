// src/App.tsx (최종 수정본)

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

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
import LandingPage from './pages/LandingPage/LandingPage';

// === 블로그 개편으로 새로 추가/변경되는 페이지들 ===
import BlogIndexPage from './blog/pages/BlogIndexPage';
import BlogPostPage from './blog/pages/BlogPostPage';
import PrivacyPolicy from "./policies/PrivacyPolicy";
import TermsOfService from "./policies/TermsOfService";
// ⭐ --- [추가] AboutUs, Contact 페이지 import --- ⭐
import AboutUs from "./pages/AboutUs"; 
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* === 1. 로그인 없이 접근 가능한 공개 페이지들 === */}
        <Route path="/" element={<LandingPage />} />
        
        {/* ⭐ --- [추가] About, Contact 라우트 --- ⭐ */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* 정책 페이지 라우트 */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* 새로운 블로그 라우트 */}
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* 기존 로그인 관련 라우트 */}
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