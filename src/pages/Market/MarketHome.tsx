import s from './MarketHome.module.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarketHome: React.FC = () => {
    const navigate = useNavigate();

    const buttons = [
        { label: '공식/중고몰', path: '/market/official-store'},
        { label: '내 아이템 판매', path: '/market/my-item-sell'},
        { label: '내 상품 관리', path: '/market/my-product-management'},
        { label: '거래 내역', path: '/market/transaction-history'},
    ];

    return (
        <div className={s.container}>
            <div className={s.header}>
                <span className={s.headerTitle}>플레이아데스 상점</span>
            </div>

            <div className={s.content}>
                <div className={s.gridContainer}>
                    {buttons.map((btn, idx) => (
                        <div
                            key={idx}
                            className={s.marketButton}
                            onClick={() => navigate(btn.path)} // ✅ 클릭 시 이동
                        >
                            <div className={s.label}>{btn.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketHome;