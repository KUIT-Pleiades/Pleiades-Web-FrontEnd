import React, { useEffect, useState } from 'react';
import s from './InstallGuide.module.scss';

import pleiadesLogo from '../../assets/InstallGuide/logo.png';
import safariImg from '../../assets/InstallGuide/safariGuideImage.png';
import chromeImg from '../../assets/InstallGuide/chromeGuideImage.png';

// BeforeInstallPromptEvent 타입 정의 (PWA 설치 프롬프트용)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// IE의 MSStream 타입 확장
declare global {
  interface Window {
    MSStream?: unknown;
  }
}

const InstallGuide: React.FC = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // 안드로이드 설치 프롬프트를 저장할 상태
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // 브라우저가 기본적으로 띄우는 설치 하단바를 막습니다.
      e.preventDefault();
      // 이벤트를 상태에 저장합니다.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // 아직 설치 프롬프트가 준비되지 않았을 때 (조건 미달 등)
      alert("설치 준비 중입니다. 잠시 후 다시 시도하거나 브라우저 메뉴의 '앱 설치'를 이용해 주세요!");
      return;
    }

    // 설치 팝업 띄우기
    deferredPrompt.prompt();

    // 사용자의 선택 결과 기다리기
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`사용자 설치 선택: ${outcome}`);

    // 사용 완료한 프롬프트 초기화
    setDeferredPrompt(null);
  };

  return (
    <div className={s.container}>

      <div className={s.content}>
        <img className={s.logo} src={pleiadesLogo} alt="pleiadesLogo" />
        <span className={s.contentText}>홈화면에 플아데를 설치하고 이용해 주세요!</span>
      </div>

      <div className={s.guideSection}>
        {isIOS ? (
          <div className={s.guideSectionContent}>
            <div className={s.safari}>
              <img className={s.guideImage} src={safariImg} alt="safariImg" />
              <span className={s.guideText}>Safari</span>
              <span className={s.guideSubText}>하단 [공유] → [홈 화면에 추가]</span>
            </div>
            <div className={s.chrome}>
              <img className={s.guideImage} src={chromeImg} alt="chromeImg" />
              <span className={s.guideText}>Chrome</span>
              <span className={s.guideSubText}>상단 [공유] → [홈 화면에 추가]</span>
            </div>
          </div>
        ) : (
          <div className={s.guideSectionContent}>
            <div 
              className={s.installButton} 
              onClick={handleInstallClick}
              style={{ cursor: 'pointer' }}
            >
              <span>설치하기</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default InstallGuide;