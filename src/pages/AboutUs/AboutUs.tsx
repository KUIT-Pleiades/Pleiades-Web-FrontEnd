// src/pages/AboutUs/AboutUs.tsx

import { Link } from 'react-router-dom';
import styles from './AboutUs.module.scss';
import pleiadesLogo from '../../assets/pleiadesLogo.png';
import teamImage from '../../assets/pleiadesLogo.png'; // 실제 팀 이미지가 있다면 교체 권장

const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
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

      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h1>우리는 플레이아데스입니다</h1>
          <p>가상 세계를 통해 사람들을 연결하고, 진정한 소통의 가치를 만듭니다.</p>
        </div>

        <div className={styles.missionSection}>
          <h2>우리의 미션</h2>
          <p>
            플레이아데스는 단순히 아바타를 꾸미고 노는 공간을 넘어, 사용자들이 서로의 다름을 존중하고 긍정적인 관계를 형성할 수 있는 안전한 소셜 플랫폼을 지향합니다. 우리는 기술을 통해 물리적 제약을 넘어선 새로운 차원의 커뮤니티를 만들고, 모든 사람이 소외되지 않고 자신의 목소리를 낼 수 있는 세상을 꿈꿉니다.
          </p>
        </div>

        <div className={styles.teamSection}>
          <img src={teamImage} alt="플레이아데스 팀" className={styles.teamImage} />
          <h2>최고의 팀이 함께합니다</h2>
          <p>
            디자이너, 개발자, 기획자 등 각 분야의 전문가들이 모여 최고의 사용자 경험을 제공하기 위해 노력하고 있습니다. 우리는 사용자의 목소리에 귀 기울이며, 끊임없이 서비스를 개선하고 새로운 즐거움을 선사하기 위해 열정을 다합니다.
          </p>
        </div>
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
}

export default AboutUs;