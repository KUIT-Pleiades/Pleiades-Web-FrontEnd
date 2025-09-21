// src/pages/TermsPage/TermsPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const pageStyle: React.CSSProperties = {
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    lineHeight: '1.6',
    color: '#333',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
};

const h1Style: React.CSSProperties = {
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
};

const articleStyle: React.CSSProperties = {
    marginBottom: '20px',
};

const TermsPage = () => {
    return (
        <div style={pageStyle}>
            <h1 style={h1Style}>플레이아데스 이용약관</h1>
            <p>
                <strong>시행일: 2024년 00월 00일</strong>
            </p>

            <article style={articleStyle}>
                <h2>제1장 총칙</h2>
                <h3>제1조 (목적)</h3>
                <p>
                    본 약관은 플레이아데스(이하 "회사")가 제공하는 아바타 기반 소셜
                    커뮤니케이션 서비스 '플레이아데스'(이하 "서비스")의 이용과 관련하여
                    회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                </p>

                <h3>제2조 (용어의 정의)</h3>
                <p>
                    본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                    <br />
                    1. "서비스"라 함은 회사가 제공하는 아바타, 별, 우주정거장 등 모든 관련
                    기능을 의미합니다.
                    <br />
                    2. "회원"이라 함은 본 약관에 동의하고 서비스를 이용하는 사용자를
                    의미합니다.
                    <br />
                    3. "별"이라 함은 회원의 개인 아바타와 개인화된 공간을 의미합니다.
                    <br />
                    4. "우주정거장"이라 함은 회원들이 그룹을 이루어 프라이빗하게 소통하는
                    공간을 의미합니다.
                    <br />
                    5. "재화"라 함은 서비스 내에서 아이템 구매 등에 사용되는 가상의
                    화폐(코인 등)를 의미합니다.
                    <br />
                    6. "아이템"이라 함은 아바타를 꾸미는 데 사용되는 의상, 액세서리 등
                    디지털 콘텐츠를 의미합니다.
                </p>
            </article>

            <article style={articleStyle}>
                <h2>제2장 서비스 이용 계약</h2>
                <h3>제3조 (회원가입)</h3>
                <p>
                    회원가입은 서비스를 이용하고자 하는 자가 본 약관에 동의하고, 회사가
                    정한 가입 절차에 따라 신청을 완료함으로써 체결됩니다. 회사는 필요한
                    경우 가입 신청자에게 본인 확인을 요청할 수 있습니다.
                </p>

                <h3>제4조 (회원 정보의 변경)</h3>
                <p>
                    회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고
                    수정할 수 있습니다. 회원가입 신청 시 기재한 사항이 변경되었을 경우
                    온라인으로 수정을 하거나 전자우편 기타 방법으로 회사에 대하여 그
                    변경사항을 알려야 합니다.
                </p>
            </article>

            <article style={articleStyle}>
                <h2>제3장 권리와 의무</h2>
                <h3>제5조 (회사의 의무)</h3>
                <p>
                    회사는 관련 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지
                    않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여
                    노력합니다. 또한, 회사는 회원의 개인정보 보호를 위해 보안 시스템을
                    갖추어야 하며 개인정보처리방침을 공시하고 준수합니다.
                </p>

                <h3>제6조 (회원의 의무)</h3>
                <p>
                    회원은 다음 행위를 하여서는 안 됩니다.
                    <br />
                    1. 타인의 정보를 도용하는 행위
                    <br />
                    2. 욕설, 비방 등 타인의 명예를 손상시키는 행위
                    <br />
                    3. 공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형, 음성 등을
                    타인에게 유포하는 행위
                    <br />
                    4. 서비스의 정상적인 운영을 방해하는 행위 (버그 악용, 어뷰징 등)
                    <br />
                    5. 회사의 사전 승낙 없이 서비스를 이용하여 영리활동을 하는 행위
                </p>
            </article>
            {/* ... 나머지 내용들 ... */}
            <footer>
                <Link to="/"> &lt; 돌아가기</Link>
            </footer>
        </div>
    );
};

export default TermsPage;