// src/pages/AboutUs.tsx

import { Link } from 'react-router-dom';
import pleiadesLogo from '../assets/pleiadesLogo.png';
// 참고: 아래 스타일은 Tailwind CSS를 가정하고 있습니다.
// 실제로는 스타일이 적용되지 않을 수 있습니다.

export default function AboutUs() {
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
        <div style={{ marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#4a148c', marginBottom: '1rem' }}>우리는 플레이아데스입니다</h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>가상 세계를 통해 사람들을 연결하고, 진정한 소통의 가치를 만듭니다.</p>
        </div>
        <div>
          <h2>우리의 미션</h2>
          <p>
            플레이아데스는 단순히 아바타를 꾸미고 노는 공간을 넘어, 사용자들이 서로의 다름을 존중하고 긍정적인 관계를 형성할 수 있는 안전한 소셜 플랫폼을 지향합니다.
          </p>
        </div>
      </main>
    </div>
  );
}