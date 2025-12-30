// src/components/AdSense/AdSenseUnit.tsx
import React, { useEffect } from "react";

// 1. Window 인터페이스에 adsbygoogle 속성을 선언합니다.
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseUnit: React.FC = () => {
  useEffect(() => {
    try {
      // 이제 window.adsbygoogle 접근 시 타입 에러가 발생하지 않습니다.
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("AdSense push error:", e);
    }
  }, []);

  return (
    <div 
      className="ad-container" 
      style={{ display: 'block', overflow: 'hidden', minWidth: '250px', minHeight: '100px' }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-hl+a-w-1e+66"
        data-ad-client="ca-pub-9063401338616510"
        data-ad-slot="4647177583"
      ></ins>
    </div>
  );
};

export default AdSenseUnit;