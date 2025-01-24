import React, { useEffect, useState } from 'react';
import s from './ShowStationList.module.scss';

import searchIcon from '../../../assets/StationList/searchIcon.svg';
import createIcon from '../../../assets/StationList/createIcon.svg';
import { Character, Stations } from '../../../interfaces/Interfaces';

const ShowStationList: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [stations, setStations] = useState<Stations | null>(null);

  useEffect(() => {
    fetch("/src/mock/character1.json")
      .then((res) => res.json())
      .then((data) => {setCharacter(data)})
      .catch((err) => {console.error(err)});
    fetch("/src/mock/myStations.json")
      .then((res) => res.json())
      .then((data) => {setStations(data)})
      .catch((err) => {console.error(err)});
  }, []);

      
  return (
    <div className={s.container}>
      <div className={s.headContainer}>
        <div className={s.title}>
          <div className={s.titleText}>{character?.characterName}님 어디로 떠나볼까요?</div>
          <div className={s.titleButtons}>
            <button className={s.searchStationButton}>
              <img src={searchIcon} alt="searchIcon" />
            </button>
            <button className={s.createStationButton}>
              <img src={createIcon} alt="createIcon" />
            </button>
          </div>
        </div>
      </div>

      <div className={s.separator}>
        <div className={s.totalNumOfStations}>
          전체 {stations?.stations?.length || 0}
        </div>
      </div>
    </div>
  )
}

export default ShowStationList;
