// src/pages/Blog/Blog.tsx

import { Link } from 'react-router-dom';
import styles from './Blog.module.scss';
import pleiadesLogo from '../../assets/pleiadesLogo.png';
import postImage1 from '../../assets/Character/character1.svg';
import postImage2 from '../../assets/Character/character2.svg';
import postImage3 from '../../assets/Character/character3.svg';

const blogPosts = [
  {
    id: 1,
    title: '플레이아데스, 당신의 두 번째 세계에 오신 것을 환영합니다!',
    summary: '새롭게 선보이는 메타버스 소셜 플랫폼, 플레이아데스의 공식 런칭 소식을 알려드립니다. 무엇을 상상하든 그 이상을 경험하게 될 것입니다.',
    image: postImage1,
    link: '/blog/post-1',
    date: '2024년 10월 28일'
  },
  {
    id: 2,
    title: '인싸되는 비법! 나만의 정거장 꾸미기 A to Z',
    summary: '정거장은 단순한 공간이 아닙니다. 당신의 개성을 표현하고 친구들과 교감하는 특별한 장소죠. 정거장 꾸미기 꿀팁을 모두 공개합니다!',
    image: postImage2,
    link: '/blog/post-2',
    date: '2024년 10월 24일'
  },
  {
    id: 3,
    title: '플레이아데스 개발팀이 직접 답하다! 유저 Q&A 세션',
    summary: '지난 주 커뮤니티에서 진행된 Q&A 세션의 주요 내용을 정리했습니다. 플레이아데스에 대해 궁금했던 모든 것을 확인해보세요.',
    image: postImage3,
    link: '/blog/post-3',
    date: '2024년 10월 20일'
  }
];

const Blog = () => {
  return (
    <div className={styles.blogContainer}>
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
          <h1>플레이아데스 소식</h1>
          <p>플레이아데스의 최신 업데이트, 이벤트, 그리고 흥미로운 이야기들을 만나보세요.</p>
        </div>

        <div className={styles.postGrid}>
          {blogPosts.map(post => (
            <Link to={post.link} key={post.id} className={styles.postCard}>
              <div className={styles.imageContainer}>
                <img src={post.image} alt={post.title} className={styles.postImage} />
              </div>
              <div className={styles.postContent}>
                <span className={styles.postDate}>{post.date}</span>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postSummary}>{post.summary}</p>
              </div>
            </Link>
          ))}
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

export default Blog;