// src/pages/LandingPage/LandingPage.tsx

import { Link } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import pleiadesLogo from '../../assets/pleiadesLogo.png';
import featureImage1 from '../../assets/Character/face/character1face.png'; 
import featureImage2 from '../../assets/Character/face/character2face.png';
import featureImage3 from '../../assets/Character/face/character3face.png';

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      {/* --- 공통 헤더 --- */}
      <header className={styles.header}>
        <Link to="/"><img src={pleiadesLogo} alt="Pleiades Logo" className={styles.logo} /></Link>
        <nav className={styles.navigation}>
          <Link to="/about">소개</Link>
          <Link to="/blog">블로그</Link>
          <Link to="/contact">문의하기</Link>
          <Link to="/login" className={styles.loginButton}>로그인</Link>
        </nav>
      </header>

      <main className={styles.mainContent}>
        {/* --- Hero 섹션 --- */}
        <section className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1>당신만의 우주, 플레이아데스에서<br />새로운 나를 발견하세요.</h1>
            <p>친구들과 함께 떠나는 환상적인 아바타 소셜 월드. 지금껏 경험하지 못한 메타버스 라이프가 펼쳐집니다.</p>
            <Link to="/login" className={styles.ctaButton}>지금 바로 여정 시작하기</Link>
          </div>
        </section>

        {/* --- 상세 기능 소개 섹션 --- */}
        <section id="features" className={styles.featuresSection}>
          <h2>상상하는 모든 것이 현실이 되는 곳</h2>
          <div className={styles.featureItem}>
            <img src={featureImage1} alt="캐릭터 커스터마이징" className={styles.featureImage}/>
            <div className={styles.featureDescription}>
              <h3>무한한 가능성의 캐릭터 커스터마이징</h3>
              <p>수천가지의 패션 아이템과 헤어, 얼굴 파츠로 당신의 개성을 마음껏 표현하세요. 현실의 나, 상상 속의 나, 그 어떤 모습이든 플레이아데스에서는 가능합니다.</p>
            </div>
          </div>
          <div className={`${styles.featureItem} ${styles.reversed}`}>
            <img src={featureImage2} alt="나만의 정거장 꾸미기" className={styles.featureImage}/>
            <div className={styles.featureDescription}>
              <h3>친구들과 함께 만드는 우리만의 아지트, '정거장'</h3>
              <p>테마별로 제공되는 가구와 소품으로 나만의 정거장을 꾸미고 친구들을 초대하세요. 서로의 정거장을 방문하고, 방명록을 남기며 즐거운 추억을 만들 수 있습니다.</p>
            </div>
          </div>
           <div className={styles.featureItem}>
            <img src={featureImage3} alt="실시간 소통 기능" className={styles.featureImage}/>
            <div className={styles.featureDescription}>
              <h3>'시그널'로 통하는 우리들의 교감</h3>
              <p>플레이아데스만의 특별한 교감 시스템, '시그널'을 통해 친구들과 실시간으로 소통하고 관계를 더욱 돈독히 하세요. 익명이 보장된 공간에서 솔직한 내 마음을 나눌 수 있습니다.</p>
            </div>
          </div>
        </section>

        {/* --- 사용자 후기 섹션 --- */}
        <section className={styles.testimonialsSection}>
          <h2>플레이아데스 유저들의 리얼 보이스</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <p>"현실에서 벗어나 새로운 친구들을 사귈 수 있어서 너무 좋아요! 정거장 꾸미는 재미에 시간 가는 줄 몰라요."</p>
              <span>- 별빛유저123</span>
            </div>
             <div className={styles.testimonialCard}>
              <p>"캐릭터가 너무 귀여워서 매일 접속하게 돼요. 다른 사람들은 어떻게 꾸몄는지 구경하는 것도 꿀잼!"</p>
              <span>- 우주먼지콜렉터</span>
            </div>
             <div className={styles.testimonialCard}>
              <p>"소심한 성격이라 친구 사귀기 어려웠는데, 여기서는 '시그널' 덕분에 쉽게 마음을 터놓을 수 있었어요."</p>
              <span>- 은하수여행자</span>
            </div>
          </div>
        </section>
      </main>

      {/* --- 공통 푸터 --- */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link to="/about">회사 소개</Link>
          <Link to="/terms">이용약관</Link>
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/contact">고객센터</Link>
        </div>
        <p>(주)플레이아데스 | 대표: 홍길동 | 사업자등록번호: 123-45-67890</p>
        <p>주소: 서울특별시 강남구 테헤란로 123, 45층 | 통신판매업신고: 제2024-서울강남-0000호</p>
        <p>&copy; 2024 Pleiades Corp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;