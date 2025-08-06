import React from 'react';
import s from './StationDisplay.module.scss';

// image files
import stationNumOfUsersIcon from '../../../../assets/StationList/stationNumOfUsersIcon.svg';
import favoriteFilled from '../../../../assets/StationList/favoriteFilled.svg';
import favoriteOutline from '../../../../assets/StationList/favoriteOutline.svg';

interface StationProps {
  name: string;
  numOfUsers: number;
  background: string;
  favorite: boolean;
  onToggleFavorite: () => void;
}

const StationDisplay: React.FC<StationProps> = ({
    name,
    numOfUsers,
    background,
    favorite,
    onToggleFavorite
}) => {
  return (
    <div className={s.stationBox}>
      <div className={s.stationBackground} style={{ backgroundImage: `url(${background})` }} />
      <div className={s.stationInfo}>
        <div className={s.stationDetail}>
          <img
            src={favorite ? favoriteFilled : favoriteOutline}
            alt='favoriteIcon'
            className={s.favoriteIcon}
            onClick={(e) => {
              e.stopPropagation(); // 상위 클릭 이벤트 방지
              onToggleFavorite(); // 즐겨찾기 토글 함수 실행
            }}
          />
          <div className={s.stationNumOfUsers}>
            <img src={stationNumOfUsersIcon} alt='stationNumOfUsersIcon' />
            <span className={s.stationNumOfUsersCurrent}>{numOfUsers}</span>
            <span className={s.stationNumOfUsersMax}>/6</span>
          </div>
        </div>
        <div className={s.stationName}>{name}</div>
      </div>
    </div>
  );
};

export default StationDisplay;

