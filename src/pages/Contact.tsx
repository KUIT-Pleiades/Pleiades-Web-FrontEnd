// src/pages/Contact.tsx

import { Link } from 'react-router-dom';
import pleiadesLogo from '../assets/pleiadesLogo.png';
// 참고: 아래 스타일은 Tailwind CSS를 가정하고 있습니다.
// 실제로는 스타일이 적용되지 않을 수 있습니다.

export default function Contact() {
  return (
    <div>
      <header style={{ padding: '1rem 5%', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/"><img src={pleiadesLogo} alt="Pleiades Logo" style={{ height: '35px' }} /></Link>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/about">소개</Link>
          <Link to="/blog">블로그</Link>
          <Link to="/contact">문의하기</Link>
          <Link to="/login" style={{ padding: '0.6rem 1.2rem', backgroundColor: '#7e57c2', color: 'white', borderRadius: '20px', textDecoration: 'none' }}>로그인</Link>
        </nav>
      </header>
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: '#4a148c', marginBottom: '1rem' }}>무엇을 도와드릴까요?</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '4rem' }}>플레이아데스 이용 중 궁금한 점이나 불편한 점이 있으시면 언제든지 문의해주세요.</p>
        <a href="mailto:support@pleiades.com" style={{ display: 'inline-block', padding: '0.8rem 1.5rem', backgroundColor: '#7e57c2', color: 'white', textDecoration: 'none', borderRadius: '25px' }}>
          support@pleiades.com
        </a>
      </main>
    </div>
  );
}