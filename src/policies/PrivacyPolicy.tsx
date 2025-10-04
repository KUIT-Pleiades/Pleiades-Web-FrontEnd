export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <h1>개인정보처리방침</h1>
      <p><strong>시행일: 2024년 10월 28일</strong></p>
      <p>플레이아데스(이하 "회사")는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.</p>

      <article style={{ marginBottom: '20px' }}>
        <h2>1. 수집하는 개인정보의 항목 및 수집방법</h2>
        <p>회사는 회원가입, 원활한 고객상담, 각종 서비스의 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
        <ul>
            <li><strong>필수항목:</strong> 소셜 로그인 제공업체로부터 제공받는 정보(이메일, 프로필 이름, 고유식별자), 서비스 내 닉네임, 아바타 정보</li>
            <li><strong>자동수집:</strong> 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 기기정보</li>
        </ul>
        <p>수집방법: 소셜 로그인을 통한 회원가입 시, 서비스 이용 과정에서 자동으로 생성</p>
      </article>

      <article style={{ marginBottom: '20px' }}>
        <h2>2. 개인정보의 수집 및 이용목적</h2>
        <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
        <ul>
            <li><strong>서비스 제공:</strong> 회원제 서비스 이용에 따른 본인 식별, 아바타 및 우주정거장 기능 제공, 콘텐츠 제공, 구매 및 요금 결제 등</li>
            <li><strong>회원 관리:</strong> 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 분쟁 조정을 위한 기록 보존, 불만처리 등 민원처리</li>
            <li><strong>신규 서비스 개발 및 마케팅/광고에의 활용:</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재(Google AdSense 포함), 접속 빈도 파악, 회원의 서비스 이용에 대한 통계</li>
        </ul>
      </article>

      <article>
        <h2>3. 개인정보 보호책임자</h2>
        <p>개인정보 관련 문의사항은 아래의 연락처로 접수해주시기 바랍니다.</p>
        <ul>
            <li><strong>개인정보 보호책임자:</strong> [담당자 이름]</li>
            <li><strong>연락처:</strong> [이메일 주소]</li>
        </ul>
      </article>
    </div>
  );
}