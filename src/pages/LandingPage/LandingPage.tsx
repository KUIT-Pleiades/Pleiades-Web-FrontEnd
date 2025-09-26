import styles from './LandingPage.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LandingPage = () => {
    return (
        <>
            {/* Helmet 컴포넌트를 사용해 이 페이지에만 적용될 head 태그들을 정의합니다. */}
            <Helmet>
                <meta name="google-adsense-account" content="ca-pub-9063401338616510" />
            </Helmet>
            
            <div className={styles.container}>
                <header className={styles.hero}>
                    <h1>또 다른 나를 찾아 떠나는 우주, Pleiades</h1>
                    <p>
                        스쳐 가는 관계에 지치셨나요? 플레이아데스는 소중한 사람들과 함께
                        '나'와 '우리'를 기록하고 만들어가는 새로운 방식의 프라이빗
                        커뮤니티입니다.
                    </p>
                    <Link to="/login" className={styles.ctaButton}>
                        ✨ 플레이아데스로 출발! ✨
                    </Link>
                </header>
                <main>
                    <section>
                        <h2>SNS 피로증후군, 더는 그만.</h2>
                        <p>
                            빠르게 소비되는 휘발성 콘텐츠와 의미 없는 소통은 우리에게 허무함과
                            정서적 피로감을 줍니다. 플레이아데스는 이러한 문제 의식에서
                            출발하여, 당신의 소중한 관계와 이야기가 오래도록 남을 수 있는 공간을
                            만들었습니다. 이곳에서는 불필요한 경쟁이나 과시 없이, 진정한 연결의
                            즐거움에만 집중할 수 있습니다.
                        </p>
                    </section>
                    <section>
                        <h2>플레이아데스만의 특별한 경험</h2>
                        <ul>
                            <li>
                                <strong>우리만의 프라이빗 아지트, 우주정거장:</strong> 오직 아이디와
                                입장 코드를 아는 친구들만 들어올 수 있습니다. 우리만의 공간을 함께
                                꾸미고, 매일 같은 주제로 생각을 나누며 특별한 유대감을 형성해
                                보세요.
                            </li>
                            <li>
                                <strong>나를 표현하는 아바타와 '별':</strong> 수백, 수천 가지의
                                아이템으로 세상에 하나뿐인 나만의 아바타를 만들 수 있습니다. 당신의
                                개성이 담긴 아바타는 개인 공간인 '별'에서 다른 친구들을 맞이합니다.
                            </li>
                            <li>
                                <strong>오래도록 남는 우리들의 이야기:</strong> '리포트' 시스템을
                                통해 나눈 대화와 생각들은 사라지지 않고 차곡차곡 쌓입니다. 언제든
                                우리의 추억이 담긴 서랍을 열어보며 관계의 깊이를 더할 수 있습니다.
                            </li>
                            <li>
                                <strong>즐거움이 되는 경제 활동, 마켓:</strong> 커뮤니티 활동을 통해
                                얻거나, 더 이상 사용하지 않는 아이템을 다른 유저와 자유롭게 거래해
                                보세요. 공식 상점에서는 구할 수 없는 희귀 아이템을 발견하는 재미도
                                놓치지 마세요.
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h2>이런 당신을 기다립니다</h2>
                        <p>
                            플레이아데스는 복잡한 기능은 줄이고 소통의 즐거움은 더했습니다. 기존
                            SNS에 피로감을 느끼는 분, 소수의 친구와 깊이 있는 관계를 맺고 싶은 분,
                            아바타를 꾸미고 가상 세계에서 소통하는 것을 즐기는 분이라면 누구나
                            환영합니다. 지금 바로 당신의 우주를 만들어보세요!
                        </p>
                    </section>
                </main>
                <footer className={styles.footer}>
                    <p>&copy; 2024 Pleiades. All Rights Reserved.</p>
                    <nav>
                        <Link to="/terms">이용약관</Link> &nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to="/privacy">개인정보처리방침</Link>
                    </nav>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;