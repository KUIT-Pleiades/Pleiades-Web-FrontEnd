// src/pages/Blog/BlogPost2.tsx

import { Link } from 'react-router-dom';
import styles from './BlogPost.module.scss';
import pleiadesLogo from '../../assets/pleiadesLogo.png';
import postImage from '../../assets/Character/character2.svg';

const BlogPost2 = () => {
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
                        <h1>인싸되는 비법! 나만의 정거장 꾸미기 A to Z</h1>
                        <p className={styles.meta}>작성자: 플레이아데스 팀 | 작성일: 2024년 10월 24일</p>
                    </header>
                    <img src={postImage} alt="정거장 꾸미기" className={styles.featuredImage} />
                    <div className={styles.articleContent}>
                        <p>플레이아데스의 유저 여러분, 안녕하세요! 오늘은 여러분의 개성을 뽐낼 수 있는 최고의 공간, '정거장'을 200% 활용하는 꿀팁을 들고 왔습니다. 친구들이 끊임없이 방문하는 '인싸' 정거장을 만드는 비법, 지금부터 시작합니다!</p>
                        <h2>1단계: 컨셉은 확실하게!</h2>
                        <p>무작정 꾸미기 시작하면 나중에 뒤죽박죽이 되기 십상입니다. 먼저 어떤 컨셉의 정거장을 만들고 싶은지 정해보세요. 아늑한 카페? 미래적인 우주선 내부? 혹은 동화 속 숲속 오두막? 컨셉을 정하면 가구를 고르기가 훨씬 쉬워집니다. 상점에서 '테마'별로 아이템을 둘러보는 것도 좋은 방법입니다.</p>
                        <h2>2단계: 과감한 공간 분할</h2>
                        <p>하나의 넓은 공간보다는, 파티션이나 키가 큰 가구를 이용해 공간을 분리해보세요. 예를 들어, 입구 쪽은 휴식 공간, 안쪽은 작업 공간처럼 나누는 거죠. 이렇게 하면 공간이 훨씬 입체적이고 흥미로워 보입니다. 동선도 함께 고려하여 가구를 배치하면 더욱 실용적인 공간을 만들 수 있습니다.</p>
                        <h2>3단계: 작은 소품으로 디테일 더하기</h2>
                        <p>이제 작은 소품들로 공간을 채워나갈 차례입니다. 화분, 액자, 조명, 쿠션 등 아기자기한 소품들은 정거장에 생기를 불어넣어 줍니다. 비슷한 색상 톤의 소품들을 여러 곳에 반복해서 배치하면 전체적으로 통일감 있는 인테리어를 완성할 수 있습니다.</p>
                        <h2>4단계: 친구들과 함께 완성하기</h2>
                        <p>정거장은 혼자만의 공간이 아닙니다. 친구들을 초대해서 함께 꾸며보세요! 친구가 선물한 아이템을 배치하거나, 함께 찍은 스크린샷을 액자에 넣어두면 정거장은 단순한 공간을 넘어 소중한 추억이 담긴 장소가 될 것입니다.</p>
                        <p>여러분도 자신만의 멋진 정거장을 꾸미고 친구들을 초대해보세요! 다음 주에는 '패션 코디네이션' 꿀팁으로 돌아오겠습니다.</p>
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

export default BlogPost2;