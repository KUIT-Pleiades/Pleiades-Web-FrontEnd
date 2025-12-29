// 파일: src/pages/Market/MyItemPriceCheck/MyItemPriceCheck.tsx
import s from './MyItemPriceCheck.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import backArrow from '../../../assets/pleiadesBackArrow.svg';
import stone from '../../../assets/market/stone.svg';
import { axiosRequest } from '../../../functions/axiosRequest';

import noItemLogo from '../../../assets/market/logo.svg';

// ============= 배포 시 false로 변경 =============
const USE_MOCK = false;
// =============================================

// 데모용 데이터 (실서비스에서는 API 연동)
type Listing = {
    id: number;
    name: string;
    price: number;
    discountedPrice: number;
    image: string;
};

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT || '';

const MyItemPriceCheck: React.FC = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    
    const nameFromQuery = params.get('name') || '';
    const itemIdFromQuery = params.get('id') || '';
    const imgFromQuery = params.get('img') || '';

    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPriceHistory = async () => {
        if (USE_MOCK) {
            // 목업 데이터 로직
            const mockData: Listing[] = Array.from({ length: 10 }).map((_, i) => ({
                id: i + 1,
                name: nameFromQuery,
                price: 200,
                discountedPrice: 180 - (i * 10),
                image: `${IMG_BASE_URL}${imgFromQuery}`,
            }));
            setListings(mockData);
            setIsLoading(false);
            return;
        }

        if (!itemIdFromQuery) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosRequest<any[]>(
                `/store/resale/items/${itemIdFromQuery}/price`, 
                'GET', 
                null
            );

            if (response.status === 200 && Array.isArray(response.data)) {
                const formatted = response.data.map((it: any) => ({
                    id: it.id,
                    name: nameFromQuery,
                    price: it.price,
                    discountedPrice: it.discountedPrice,
                    image: `${IMG_BASE_URL}${imgFromQuery}`,
                }));
                setListings(formatted);
            }
        } catch (error) {
            console.error('[시세 확인] 데이터 로드 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPriceHistory();
    }, [itemIdFromQuery]);

    return (
        <div className={s.container}>
            <div className={s.header}>
                <img
                    src={backArrow}
                    alt="back arrow"
                    className={s.backArrow}
                    onClick={() => navigate(-1)}
                />
                <span className={s.headerTitle}>내 아이템 판매시세</span>
            </div>

            <div className={s.sectionTitle}>
                <span className={s.itemTitle}>[{nameFromQuery}]</span>
                <span className={s.sectionSub}>판매 중인 상품</span>
                <span className={s.count}>({listings.length})</span>
            </div>

            {!isLoading && listings.length > 0 ? (
                <div className={s.scrollArea}>
                    <div className={s.grid} aria-label="판매 중인 동일 상품 목록">
                        {listings.map((it) => (
                            <div key={it.id} className={s.itemSection}>
                                <div
                                    className={s.card}
                                    //onClick={() => console.log('img src:', it.image)}
                                >
                                    {/* 할인율 계산 표시 (필요 시) */}
                                    {it.price > it.discountedPrice && (
                                        <div className={s.cardBadge}>
                                            {Math.round(((it.price - it.discountedPrice) / it.price) * 100)}%
                                        </div>
                                    )}
                                    <div className={s.cardThumbWrap}>
                                        <img 
                                            src={it.image}
                                            alt={it.name} 
                                            className={s.cardThumb} 
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = backArrow; 
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={s.name}>{it.name}</div>

                                <div className={s.price}>
                                    <img src={stone} alt="stone" className={s.stoneIcon} />
                                    <span className={s.priceValue}>{it.discountedPrice}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : !isLoading ? (
                <div className={s.noItem}>
                    <span className={s.noItemTitle}>현재 중고로 등록한 유저가 없어요...</span>
                    <span className={s.noItemText}>이 아이템을 최초로 등록해 보세요!</span>
                    <img className={s.noItemLogo} src={noItemLogo} alt="noItemLogo" />
                </div>
            ) : null}

            
        </div>
    );
};

export default MyItemPriceCheck;