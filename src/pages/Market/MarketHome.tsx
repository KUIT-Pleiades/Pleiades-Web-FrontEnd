import s from "./MarketHome.module.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MarketButton from "./HomeComponent/MarketButton";
import { useCharacterStore } from "../../store/useCharacterStore";
import StoneBox from "../../components/Stone/StoneBox";

import marketSmallIcon from "../../assets/market/home/marketSmallIcon.svg";
import characterBackground from "../../assets/market/home/characterBackground.svg";
import mallIcon from "../../assets/market/home/mallIcon.svg";
import sellMyItemIcon from "../../assets/market/home/sellMyItemIcon.svg";
import myItemsIcon from "../../assets/market/home/myItemsIcon.svg";
import transactionDetailsIcon from "../../assets/market/home/transactionDetailsIcon.svg";

const MarketHome: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo, fetchUserStone, chargeStone } = useCharacterStore();
  const userName = userInfo.userName || "플레이아데스";
  const userCharacter = `${userInfo.character}`;

  useEffect(() => {
    fetchUserStone();
  }, []);

  // const handleWatchAd = async () => {
  //   try {
  //     // --- [광고 SDK 연동 구간] ---
  //     // 예: await AdMob.showRewardVideo();
  //     // console.log("광고 시청 중...");
  //     // -------------------------

  //     // [테스트] 광고를 다 봤다고 가정하고 30 스톤 지급
  //     const rewardAmount = 30;
  //     await chargeStone(rewardAmount);
      
  //     // alert(`광고 시청 완료! ${rewardAmount} 스톤을 받았습니다.`);
  //   } catch (error) {
  //     console.error("광고 시청 중 오류 발생 또는 취소됨", error);
  //   }
  // };

  const buttons = [
    {
      label: "공식/중고몰",
      subText: "쇼핑하러 가볼까요?",
      path: "official-store",
      icon: mallIcon,
    },
    {
      label: "내 아이템 판매",
      subText: "아이템 팔고 스톤 벌자!",
      path: "my-item-sell",
      icon: sellMyItemIcon,
    },
    {
      label: "판매 중인 아이템",
      subText: "상품을 관리해요",
      path: "my-item-selling",
      icon: myItemsIcon,
    },
    {
      label: "거래내역",
      subText: "거래내역이 궁금할땐",
      path: "transaction-history",
      icon: transactionDetailsIcon,
    },
  ];

  return (
    <div className={s.container}>
      <div className={s.header}>
        <span className={s.headerTitle}>플레이아데스 상점</span>
      </div>

      <div className={s.content}>
        <div className={s.topInformationSection}>
          <div className={s.userName}>
            <img
              src={marketSmallIcon}
              alt="market small icon"
              className={s.userNameMarketSmallIcon}
            />
            <span className={s.userNameText}>{userName}님의 상점</span>
          </div>

          <div 
            className={s.stone} 
            // onClick={handleWatchAd}
          > {/*임시로 돈 무한 복사 버그판*/}
            <StoneBox stoneAmount={userInfo.stone || 0} />
          </div>
        </div>

        <div className={s.characterContainer}>
          <img
            className={s.characterBackground}
            src={characterBackground}
            alt="캐릭터 배경"
          />
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
