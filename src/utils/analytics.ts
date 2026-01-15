import ReactGA from "react-ga4";

export const trackEvent = (category: string, action: string, params?: any) => {
  // 로컬 환경에서는 실제 GA로 전송하지 않고 콘솔에 출력하여 디버깅을 돕습니다.
  if (window.location.hostname === "localhost") {
    console.log(`[GA Event] Category: ${category}, Action: ${action}`, params);
    return;
  }
  
  // 실제 GA4 서버로 이벤트 전송
  ReactGA.event({ category, action, ...params });
};

export const trackPageView = (path: string) => {
  if (window.location.hostname === "localhost") return;
  ReactGA.send({ hitType: "pageview", page: path });
};