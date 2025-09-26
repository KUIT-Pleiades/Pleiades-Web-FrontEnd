// 파일: src/pages/Market/MyItemPriceCheck/MyItemPriceCheck.tsx
import s from './MyItemPriceCheck.module.scss';
import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import backArrow from '../../../assets/pleiadesBackArrow.svg';
import stone from '../../../assets/market/stone.svg';

// 데모용 데이터 (실서비스에서는 API 연동)
type Listing = {
    id: string;
    name: string;        // 아이템명
    price: number;       // 스톤
    discountPct?: number; // % (ex. 10)
    image: string;
};

const demoImage = '/assets/market/items/dress_red.png'; // 프로젝트 자산 경로에 맞게 조정
const mockListings: Listing[] = Array.from({ length: 9 }).map((_, i) => ({
    id: `r-${i + 1}`,
    name: '레드 파티 드레스',
    price: 2,
    discountPct: 10,
    image: demoImage,
}));

const MyItemPriceCheck: React.FC = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const nameFromQuery = params.get('name') || '레드 파티 드레스';

    const listings = useMemo(() => {
        // TODO: nameFromQuery를 이용해 서버에서 “판매 중인 동일 상품”을 조회
        return mockListings.map((l) => ({ ...l, name: nameFromQuery }));
    }, [nameFromQuery]);

    return (
        <div className={s.container}>
            {/* 상단 헤더 */}
            <header className={s.header}>
                <img
                    src={backArrow}
                    alt="back"
                    className={s.back}
                    onClick={() => navigate(-1)}
                />
                <h1 className={s.title}>내 아이템 판매시세</h1>
            </header>

            {/* 섹션 타이틀 */}
            <section className={s.sectionTitle}>
                <span className={s.itemTitle}>[{nameFromQuery}]</span>
                <span className={s.sectionSub}>판매 중인 상품</span>
                <span className={s.count}>({listings.length})</span>
            </section>

            {/* 구분선 */}
            <div className={s.divider} />

            {/* 카드 그리드 */}
            <section className={s.grid} aria-label="판매 중인 동일 상품 목록">
                {listings.map((it) => (
                    <article key={it.id} className={s.card}>
                        {it.discountPct ? (
                            <div className={s.badge}>{it.discountPct}%</div>
                        ) : null}
                        <div className={s.thumbWrap}>
                            <img src={it.image} alt={it.name} className={s.thumb} />
                        </div>
                        <div className={s.name}>{it.name}</div>
                        <div className={s.price}>
                            <img src={stone} alt="stone" className={s.stoneIcon} />
                            <span className={s.priceValue}>{it.price}</span>
                        </div>
                    </article>
                ))}
            </section>

            {/* TODO:
                - API 연동: 동일 상품 리스트(중고/공식몰) 조회
                - 정렬(최신/가격 오름/내림), 필터(할인중 등)
                - 무한스크롤 또는 페이지네이션
            */}
        </div>
    );
};

export default MyItemPriceCheck;