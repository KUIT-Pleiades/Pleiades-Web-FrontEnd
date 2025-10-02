// src/pages/Blog/BlogPost3.tsx

import { Link } from 'react-router-dom';
import styles from './BlogPost.module.scss';
import pleiadesLogo from '../../assets/pleiadesLogo.png';
import postImage from '../../assets/Character/character3.svg';

const BlogPost3 = () => {
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
                        <h1>플레이아데스 개발팀이 직접 답하다! 유저 Q&A 세션</h1>
                        <p className={styles.meta}>작성자: 플레이아데스 팀 | 작성일: 2024년 10월 20일</p>
                    </header>
                    <img src={postImage} alt="Q&A 세션" className={styles.featuredImage} />
                    <div className={styles.articleContent}>
                        <p>안녕하세요, 플레이아데스 커뮤니티 매니저입니다. 지난주 금요일 저녁, 공식 커뮤니티에서 진행된 개발팀과의 Q&A 세션에 참여해주신 모든 분들께 진심으로 감사드립니다. 뜨거운 관심 속에 다양한 질문들이 오고 갔는데요, 미처 참여하지 못한 분들을 위해 주요 질문과 답변을 정리하여 공유합니다.</p>

                        <h2>1. 아이템 관련 질문</h2>
                        <p><strong>Q. 새로운 패션 아이템은 언제쯤 업데이트 되나요?</strong><br/>
                        A. (아트 디렉터 답변) 현재 할로윈 시즌을 겨냥한 특별 코스튬 세트를 열심히 준비 중이며, 10월 마지막 주 업데이트를 목표로 하고 있습니다. 고퀄리티의 아이템을 선보이기 위해 조금 시간이 걸리는 점 양해 부탁드립니다. 앞으로 매달 새로운 컨셉의 아이템을 선보일 예정이니 기대해주세요!</p>

                        <p><strong>Q. 아이템을 유저끼리 거래할 수 있는 기능이 생기나요?</strong><br/>
                        A. (기획팀장 답변) 네, 유저 간 아이템 거래 시스템은 저희의 최우선 개발 과제 중 하나입니다. 모든 유저가 안전하고 편리하게 거래할 수 있는 시스템을 구축하기 위해 다양한 방안을 검토 중이며, 올해 안으로 선보이는 것을 목표로 하고 있습니다. 자세한 내용은 추후 공지를 통해 안내해 드리겠습니다.</p>

                        <h2>2. 시스템 관련 질문</h2>
                        <p><strong>Q. 친구가 아닌 사람의 정거장에도 방문할 수 있나요?</strong><br/>
                        A. (서버 개발자 답변) 네, 물론입니다. 하단 메뉴의 '탐험' 기능을 통해 랜덤으로 다른 유저의 정거장을 방문할 수 있습니다. 멋지게 꾸며진 정거장을 발견했다면 방명록에 칭찬을 남겨주세요! 새로운 친구를 사귈 수 있는 좋은 기회가 될 것입니다.</p>

                        <p><strong>Q. 신고 기능이 더 강화되었으면 좋겠습니다.</strong><br/>
                        A. (운영팀장 답변) 저희는 모든 유저분들이 안전한 환경에서 플레이아데스를 즐기실 수 있도록 클린 캠페인을 지속적으로 진행하고 있습니다. 신고 시스템을 더욱 고도화하고, 비매너 유저에 대한 제재를 강화하여 쾌적한 커뮤니티를 만들어나가겠습니다. 구체적인 개선안은 다음 업데이트에 포함될 예정입니다.</p>

                        <p>더 많은 질문과 답변은 공식 커뮤니티에서 확인하실 수 있습니다. 앞으로도 유저 여러분과 적극적으로 소통하며 함께 성장하는 플레이아데스 팀이 되겠습니다. 감사합니다.</p>
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

export default BlogPost3;