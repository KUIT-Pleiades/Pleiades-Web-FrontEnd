import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "./pages/SplashScreen/Splash";
import Home from "./pages/Home/Home";
import Rocket from "./pages/Rocket/Rocket";
import Settings from "./pages/Settings/Settings";
import Station from "./pages/Station/Station";
import LogIn from "./pages/LogIn/LogIn";
import NaverLogin from "./pages/LogIn/NaverLogin";
import FriendsTab from "./pages/FriendsTab/FriendsTab";
import SearchUsers from "./pages/SearchUsers/SearchUsers";
import ShowStationList from "./pages/Station/ShowStationsList/ShowStationList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="naverlogin" element={<NaverLogin />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="rocket" element={<Rocket />}></Route>
        <Route path="settings" element={<Settings />}></Route>
        <Route path="station" element={<Station />}>
          <Route path="stationlist" element={<ShowStationList />} />
        </Route>
        <Route path="friendtab" element={<FriendsTab />}></Route>
        <Route path="searchusers" element={<SearchUsers />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
