import React from 'react';
import s from './MarketButton.module.scss';

interface MarketButtonProps {
    idx: number;
    label: string;
    subText: string;
    icon: string;
    onClick: () => void;
}

const MarketButton: React.FC<MarketButtonProps> = ({ idx, label, subText, icon, onClick }) => {
    return (
        <div
            className={`${s.marketButton} ${idx === 0 ? s.firstButton : ''}`} // ✅ 첫 번째만 스타일 추가
            onClick={onClick}
        >
            <div className={s.textContainer}>
                <div className={s.subText}>{subText}</div>
                <div className={s.label}>{label}</div>
            </div>
            <div className={s.iconContainer}>
                <img src={icon} alt={`${label} icon`} className={s.icon} />
            </div>
        </div>
    );
};

export default MarketButton;