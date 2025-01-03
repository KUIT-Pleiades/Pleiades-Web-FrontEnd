import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import s from "./app.module.scss";
import Settings from "./pages/Settings/Settings";
import ProfileSetUp from "./pages/Settings/ProfileSetUp";
import BackgroundSetUp from "./pages/Settings/BackgroundSetUp";

function App() {
  const [count, setCount] = useState(0);
  const [showMain, setShowMain] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false); 
  const [showBackground, setShowBackground] = useState(false); // showBackground 는 사용 안됨

  const handleSettingsClick = () => {
    setShowMain(false);
    setShowSettings(true);
    setShowProfile(false);
    setShowBackground(false);
  };

  const handleProfileClick = () => {
    setShowMain(false);
    setShowSettings(false);
    setShowProfile(true);
    setShowBackground(false);
  };

  const handleBackgroundClick = () => {
    setShowMain(false);
    setShowSettings(false);
    setShowProfile(false);
    setShowBackground(true);
  };

  return (
    <>
      {showMain ? (
        <>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
          <p className={s.pTag}>Pretendard 적용 됐는지 글씨체 확인 바람</p>
          <button className={s.btn} onClick={handleSettingsClick}>
            Settings 보기
          </button>
          <button className={s.btn} onClick={handleProfileClick}>
            프로필 설정
          </button>
          <button className={s.btn} onClick={handleBackgroundClick}>
            배경 설정
          </button>
        </>
      ) : showSettings ? (
        <Settings />
      ) : showProfile ? (
        <ProfileSetUp />
      ) : (
        <BackgroundSetUp />
      )}
    </>
  );
}

export default App;
