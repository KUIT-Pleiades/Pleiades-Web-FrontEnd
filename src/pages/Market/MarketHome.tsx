import s from './MarketHome.module.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MarketButton from './HomeComponent/MarketButton';
import { useCharacterStore } from '../../store/useCharacterStore';
import AssetBox from '../../components/Asset/AssetBox';

import marketSmallIcon from '../../assets/market/home/marketSmallIcon.svg';
import characterBackground from '../../assets/market/home/characterBackground.svg';
import mallIcon from '../../assets/market/home/mallIcon.svg';
import sellMyItemIcon from '../../assets/market/home/sellMyItemIcon.svg';
import myItemsIcon from '../../assets/market/home/myItemsIcon.svg';
import transactionDetailsIcon from '../../assets/market/home/transactionDetailsIcon.svg';

const MarketHome: React.FC = () => {
    const navigate = useNavigate();
    const { userInfo } = useCharacterStore();
    const userName = userInfo.userName || '플레이아데스';
    const userCharacter = `${userInfo.character}`;

    const buttons = [
        { label: '공식/중고몰', subText: '쇼핑하러 가볼까요?', path: 'official-store', icon: mallIcon},
        { label: '내 아이템 판매', subText: '아이템 팔고 스톤 벌자!', path: 'my-item-sell', icon: sellMyItemIcon},
        { label: '판매 중인 아이템', subText: '상품을 관리해요', path: 'my-product-management', icon: myItemsIcon},
        { label: '거래내역', subText: '거래내역이 궁금할땐', path: 'transaction-history', icon: transactionDetailsIcon},
    ];

    return (
        <div className={s.container}>

            <div className={s.header}>
                <span className={s.headerTitle}>플레이아데스 상점</span>
            </div>

            <div className={s.content}>

                <div className={s.topInformationSection}>
                    <div className={s.userName}>
                        <img src={marketSmallIcon} alt='market small icon' className={s.userNameMarketSmallIcon} />
                        <span className={s.userNameText}>
                            {userName}님의 상점
                        </span>
                    </div>
                    
                    <div className={s.coinAndStone}>
                        <AssetBox
                            coinAmount={5}
                            stoneAmount={312}
                        />
                    </div>
                </div>

                <div className={s.characterContainer}>
                    <img className={s.characterBackground} src={characterBackground} alt="캐릭터 배경" />
                    <img className={s.character} src={userCharacter} alt="캐릭터" />
                </div>

                
                
                <div className={s.gridContainer}>
                    {buttons.map((btn, idx) => (
                        <MarketButton
                            key={idx}
                            idx={idx}
                            label={btn.label}
                            subText={btn.subText}
                            icon={btn.icon}
                            onClick={() => navigate(btn.path)}
                        />
                    ))}
                </div>
                
            </div>

        </div>
    );
};

export default MarketHome;