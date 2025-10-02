// src/pages/Blog/BlogPost1.tsx

import { Link } from 'react-router-dom';
import styles from './BlogPost.module.scss';
import pleiadesLogo from '../../assets/pleiadesLogo.png';
import postImage from '../../assets/Character/character1.svg';

const BlogPost1 = () => {
    return (
        <div className={styles.postContainer}>
            {/* --- 공통 헤더 --- */}
            <header className={styles.header}>
                <Link to="/"><img src={pleiadesLogo} alt="Pleiades Logo" className={styles.logo} /></Link>
                <nav className={styles.navigation}>
                    <Link to="/blog">블로그 목록</Link>
                    <Link to="/login" className={styles.loginButton}>로그인</Link>
                </nav>
            </header>

            <main className={styles.main}>
                <article className={styles.article}>
                    <header className={styles.articleHeader}>
                        <h1>플레이아데스, 당신의 두 번째 세계에 오신 것을 환영합니다!</h1>
                        <p className={styles.meta}>작성자: 플레이아데스 팀 | 작성일: 2024년 10월 28일</p>
                    </header>
                    <img src={postImage} alt="플레이아데스 런칭" className={styles.featuredImage} />
                    <div className={styles.articleContent}>
                        <p>안녕하세요, 플레이아데스 팀입니다.</p>
                        <p>수년간의 개발 끝에, 드디어 여러분께 저희의 첫 번째 메타버스 소셜 플랫폼 '플레이아데스'를 선보이게 되었습니다. 플레이아데스는 단순한 게임이나 아바타 채팅 앱이 아닙니다. 이곳은 여러분의 또 다른 현실이 되고, 새로운 관계가 시작되며, 상상 속의 꿈이 실현되는 무한한 가능성의 공간입니다.</p>
                        <h2>무엇이 플레이아데스를 특별하게 만드나요?</h2>
                        <p><strong>1. 압도적인 커스터마이징 자유도:</strong> 저희는 모든 사람이 각자의 고유한 개성을 가지고 있다고 믿습니다. 플레이아데스에서는 수천, 수만 가지의 아이템 조합을 통해 세상에 단 하나뿐인 당신만의 아바타를 만들 수 있습니다. 성별, 체형, 얼굴의 미세한 부분까지, 당신이 원하는 모습 그대로를 표현해보세요.</p>
                        <p><strong>2. 우리만의 아지트, '정거장':</strong> 모든 유저는 자신만의 개인 공간인 '정거장'을 갖게 됩니다. 이 공간을 친구들과 함께 꾸미고, 파티를 열고, 비밀 이야기를 나누는 아지트로 만들어보세요. 다른 사람의 정거장을 방문하며 새로운 영감을 얻고 관계를 확장해나가는 재미도 놓치지 마세요.</p>
                        <p><strong>3. 진정한 교감을 위한 '시그널' 시스템:</strong> '좋아요'만으로는 표현할 수 없는 미묘한 감정들을 플레이아데스에서는 '시그널'을 통해 나눌 수 있습니다. 익명의 공간에서 서로에게 진솔한 시그널을 보내며, 겉모습이 아닌 내면의 가치로 연결되는 새로운 관계를 경험해보세요.</p>
                        <h2>앞으로의 여정</h2>
                        <p>이번 런칭은 플레이아데스라는 거대한 우주를 향한 첫걸음일 뿐입니다. 저희는 유저 여러분의 피드백을 적극적으로 수용하여, 더욱 즐겁고, 안전하며, 의미 있는 경험을 제공하기 위해 끊임없이 업데이트해나갈 것입니다. 새로운 아이템, 다양한 테마의 정거장, 흥미진진한 이벤트들이 여러분을 기다리고 있습니다.</p>
                        <p>지금 바로 플레이아데스에 접속하여 당신만의 별을 밝혀보세요!</p>
                        <div className={styles.buttonContainer}>
                          <Link to="/blog" className={styles.backButton}>목록으로 돌아가기</Link>
                        </div>
                    </div>
                </article>
            </main>

            {/* --- 공통 푸터 --- */}
            <footer className={styles.footer}>
                <p>&copy; 2024 Pleiades Corp. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default BlogPost1;