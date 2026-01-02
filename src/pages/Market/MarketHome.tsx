import s from "./MarketHome.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../../store/useCharacterStore";
import StoneBox from "../../components/Stone/StoneBox";

import marketSmallIcon from "../../assets/market/home/marketSmallIcon.svg";
import characterBackground from "../../assets/market/home/characterBackground.svg";
import mallIcon from "../../assets/market/home/mallIcon.svg";
import sellMyItemIcon from "../../assets/market/home/sellMyItemIcon.svg";
import myItemsIcon from "../../assets/market/home/myItemsIcon.svg";
import transactionDetailsIcon from "../../assets/market/home/transactionDetailsIcon.svg";
import insideButtonRightArrow from "../../assets/market/home/insideButtonRightArrow.svg";
import adStone from "../../assets/market/Ad/adStone.svg";
import adInfoQuestionIcon from "../../assets/market/Ad/adInfoQuestionIcon.svg";
import adSeeyouTomorrow from "../../assets/market/Ad/adSeeyouTomorrow.svg";
import adInfoCloseIcon from "../../assets/market/Ad/adInfoClose.svg";

const MarketHome: React.FC = () => {
  const navigate = useNavigate();
  const {
    userInfo, 
    fetchUserStone,
    fetchIsStoneCharged,
    // chargeStone

  } = useCharacterStore();
  const userName = userInfo.userName || "플레이아데스";
  const userCharacter = `${userInfo.character}`;

  const [isInformationModalVisible, setIsInformationModalVisible] = useState(false);

  useEffect(() => {
    fetchUserStone();
    fetchIsStoneCharged();
  }, []);

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
            //onClick={chargeStone} // todo: 디버깅용
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

        <div className={s.bottomSection}>
          {userInfo.isStoneCharged && (
            <div className={s.adSeeYouTomorrow}>
              <img src={adSeeyouTomorrow} alt="ad see you tomorrow" className={s.adSeeYouTomorrowIcon} />
              <span className={s.adSeeYouTomorrowText}>내일 다시 만나요!</span>
            </div>
          )}

          {/* 광고 섹션 */}
          <div className={s.bottomAdSection}>
            <div className={s.leftSide}>
              <img src={adStone} alt="ad stone" className={s.adStone} />
              <span className={s.adText}>밸런스 게임하고 무료로 스톤 충전하기</span>
              <img src={adInfoQuestionIcon} alt="ad info question icon" className={s.adInfoQuestionIcon} onClick={() => setIsInformationModalVisible(true)} />
            </div>
            {/* 광고 카운트는 백엔드에서 넘겨주는 데이터가 있다면 연결, 일단 UI 유지 */}
            <div 
              className={!userInfo.isStoneCharged ? s.adButton : s.adButtonDisabled} 
              onClick={() => {
                if (userInfo.isStoneCharged) return; // todo: 디버깅용으로 잠시 이거 주석처리
                navigate("/market/balance-game")
              }} // 경로 이동
            >
              충전하기
            </div>
          </div>


          <div className={s.bottomButtonSection}>
            {/* 공식/중고몰 */}
            <div
              className={s.officialUsedStoreButton}
              onClick={() => navigate(buttons[0].path)}
            >
              <div className={s.iconContainer}>
                  <img src={buttons[0].icon} alt={`${buttons[0].label} icon`} className={s.icon} />
              </div>
              <div className={s.textContainer}>
                  <div className={s.subText}>{buttons[0].subText}</div>
                  <div className={s.label}>{buttons[0].label}</div>
              </div>
              <img src={insideButtonRightArrow} alt="inside button right arrow" className={s.insideButtonRightArrow} />
            </div>

            {/* 내 아이템 판매 */}
            <div className={s.smallButtonsSection}>
              <div className={s.smallButton} onClick={() => navigate(buttons[1].path)}>
                <div className={s.smallIconContainer}>
                  <img src={buttons[1].icon} alt={`${buttons[1].label} icon`} className={s.smallIcon} />
                </div>
                <div className={s.buttonText}>{buttons[1].label}</div>
              </div>

              {/* 판매 중인 아이템 */}
              <div className={s.smallButton} onClick={() => navigate(buttons[2].path)}>
                <div className={s.smallIconContainer}>
                  <img src={buttons[2].icon} alt={`${buttons[2].label} icon`} className={s.smallIcon} />
                </div>
                <div className={s.buttonText}>{buttons[2].label}</div>
              </div>

              {/* 거래내역 */}
              <div className={s.smallButton} onClick={() => navigate(buttons[3].path)}>
                <div className={s.smallIconContainer}>
                  <img src={buttons[3].icon} alt={`${buttons[3].label} icon`} className={s.smallIcon} />
                </div>
                <div className={s.buttonText}>{buttons[3].label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isInformationModalVisible && (
        <div className={s.informationModalContainer} onClick={() => setIsInformationModalVisible(false)}>
          <div className={s.informationModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={s.informationModalTitle}>밸런스 게임하고 스톤 충전하기</div>

            <div className={s.textContainer}>
              <div className={s.informationModalText}>밸런스 게임은 하루에 한 세트 참여 가능합니다.</div>
              <div className={s.informationModalText}>밸런스 게임 완료시 10 스톤을 받을 수 있습니다.</div>
              <div className={s.informationModalText}>게임을 끝까지 완료하지 않을 경우, 스톤을 받을 수 없습니다.</div>
            </div>

            <img src={adInfoCloseIcon} alt="ad info close icon" className={s.adInfoCloseIcon} onClick={() => setIsInformationModalVisible(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketHome;
