import React, { useEffect, useState } from 'react';
import s from './ShowStationList.module.scss';

import searchIcon from '../../../assets/StationList/searchIcon.svg';
import createIcon from '../../../assets/StationList/createIcon.svg';
import { Character, Stations } from '../../../interfaces/Interfaces';
import SortCriteriaBox from '../../../components/SortCriteriaBox/SortCriteriaBox';
import StationDisplay from './StationDisplay/StationDisplay';

const ShowStationList: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [stations, setStations] = useState<Stations | null>(null);
  const [sortCriteria, setSortCriteria] = useState<"최신순" | "이름순">("최신순");

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

  const sortedStations = React.useMemo(() => {
    if (!stations) return null;

    const sorted = [...stations.stations];
    if (sortCriteria === "최신순") {
      sorted.sort((a, b) => b.createdAt - a.createdAt); // 타임스탬프 기준 내림차순 정렬
    } else if (sortCriteria === "이름순") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "ko")); // 이름순 오름차순 정렬
    }

    return sorted;
  }, [stations, sortCriteria]);
      
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
        <div className={s.sortCriteriaBoxContainer}>
          <SortCriteriaBox
            sortCriteria={sortCriteria}
            setSortCriteria={setSortCriteria}
            textColor="var(--gray-7, #E1E1E1)"
          />
        </div>
      </div>
      <div className={s.stationListWrapper}>
        <div className={s.stationListContainer}>
          {sortedStations?.map((station) => (
            <div key={station.id} className={s.stationDisplayWrapper}>
              <StationDisplay
                name={station.name}
                numOfUsers={station.numOfUsers}
              />
            </div>
            
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default ShowStationList;
