import React from 'react';
import s from './MarketMain.module.scss'
import MarketBar from './MarketBar/MarketBar';

import pleiadesLogo from '../../../assets/pleiadesLogoPurple.png';

const MarketMain: React.FC = () => {
    return (
        <div className={s.container}>
            <MarketBar coinBalance={100} stoneBalance={300} />
            <div className={s.officialMarketContainer}>
                <h2 className={s.officialMarketTitle}>공식몰</h2>
                <div className={s.announcement}>
                    <span className={s.announcementTitle}>아직 준비 중이에요</span>
                    <span className={s.announcementText}>조금만 기다려주세요!</span>
                </div>
            </div>
            <div className={s.secondhandMarketContainer}>
                <h2 className={s.secondhandMarketTitle}>중고몰</h2>
                <div className={s.announcement}>
                    <span className={s.announcementTitle}>아직 준비 중이에요</span>
                    <span className={s.announcementText}>조금만 기다려주세요!</span>
                    <img src={pleiadesLogo} alt='logo' className={s.logo} />
                </div>
            </div>
        </div>
    )
}

export default MarketMain;