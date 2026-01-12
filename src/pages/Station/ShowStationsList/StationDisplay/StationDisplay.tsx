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

function getStationBackgroundUrl(code: string | undefined, variant: 'dim' | 'full' | 'rec' = 'full'): string {
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL as string;
    if (!code) return `${IMG_BASE_URL}background/bg_station_1.png`;

    const match = code.match(/bg_station_(\d+)/);
    if (!match) {
        if (/^https?:\/\//.test(code)) return code;
        return `${IMG_BASE_URL}background/${code}`;
    }

    const n = parseInt(match[1], 10);
    const two = String(n).padStart(2, '0');

    switch (variant) {
        case 'dim':
            return `${IMG_BASE_URL}background/station_dim_${two}.png`;
        case 'rec':
            return `${IMG_BASE_URL}background/thumbnails/rec_bg_station_${n}.png`;
        case 'full':
        default:
            return `${IMG_BASE_URL}background/bg_station_${n}.png`;
    }
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
      <div className={s.stationBackground} style={{ backgroundImage: `url(${getStationBackgroundUrl(background, 'full')})` }} />
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

