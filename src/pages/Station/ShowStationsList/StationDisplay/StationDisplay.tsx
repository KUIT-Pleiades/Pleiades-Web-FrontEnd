import React from 'react';
import s from './StationDisplay.module.scss';

// image files
import stationNumOfUsersIcon from '../../../../assets/StationList/stationNumOfUsersIcon.svg';

interface StationProps {
  name: string;
  numOfUsers: number;
  background: string;
}

const StationDisplay: React.FC<StationProps> = ({
    name,
    numOfUsers,
    background
}) => {
  console.log('stationName: ', name);
  console.log('background: ', background);
  return (
    <div className={s.stationBox}>
      <div className={s.stationBackground} style={{ backgroundImage: `url(${background})` }} />
      <div className={s.stationInfo}>
        <div className={s.stationNumOfUsers}>
          <img src={stationNumOfUsersIcon} alt='stationNumOfUsersIcon' />
          <span className={s.stationNumOfUsersCurrent}>{numOfUsers}</span>
          <span className={s.stationNumOfUsersMax}>/6</span>
        </div>
        <div className={s.stationName}>{name}</div>
      </div>
    </div>
  );
};

export default StationDisplay;

