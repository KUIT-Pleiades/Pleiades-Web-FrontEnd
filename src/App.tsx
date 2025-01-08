import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "./pages/SplashScreen/Splash";
import Home from "./pages/Home/Home";
import Rocket from "./pages/Rocket/Rocket";
import Settings from "./pages/Settings/Settings";
import Station from "./pages/Station/Station";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="home" element={<Home />}></Route>
        <Route path="rocket" element={<Rocket />}></Route>
        <Route path="settings" element={<Settings />}></Route>
        <Route path="station" element={<Station />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
