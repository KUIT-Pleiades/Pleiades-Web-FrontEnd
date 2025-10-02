// src/pages/Contact/Contact.tsx

import { Link } from 'react-router-dom';
import styles from './Contact.module.scss';
import pleiadesLogo from '../../assets/pleiadesLogo.png';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
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
        <h1>무엇을 도와드릴까요?</h1>
        <p>플레이아데스 이용 중 궁금한 점이나 불편한 점이 있으시면 언제든지 문의해주세요.</p>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <h3>이메일 문의</h3>
            <p>가장 빠른 답변을 원하시면 이메일로 문의 내용을 보내주세요. 24시간 내에 답변 드립니다.</p>
            <a href="mailto:support@pleiades.com" className={styles.contactLink}>support@pleiades.com</a>
          </div>
          <div className={styles.contactCard}>
            <h3>자주 묻는 질문 (FAQ)</h3>
            <p>다른 이용자들이 자주 묻는 질문들을 모아두었습니다. 먼저 확인해보시면 문제를 쉽게 해결할 수 있습니다.</p>
            <span className={styles.contactLinkDisabled}>FAQ 바로가기 (준비 중)</span>
          </div>
        </div>

        <div className={styles.companyInfo}>
          <h2>(주)플레이아데스</h2>
          <p><strong>주소:</strong> 서울특별시 강남구 테헤란로 123, 45층</p>
          <p><strong>대표전화:</strong> 02-123-4567 (평일 10:00 ~ 18:00)</p>
          <p><strong>사업자등록번호:</strong> 123-45-67890</p>
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

export default Contact;