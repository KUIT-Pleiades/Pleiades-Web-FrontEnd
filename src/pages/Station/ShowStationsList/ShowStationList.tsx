import React, { useEffect, useMemo, useState } from 'react';
import s from './ShowStationList.module.scss';
import { useNavigate } from 'react-router-dom';

//import characterData from '../../../mock/character1.json';
import stationsData from '../../../mock/myStations.json';
import { Stations } from '../../../interfaces/Interfaces';
import SortCriteriaBox from '../../../components/SortCriteriaBox/SortCriteriaBox';
import StationDisplay from './StationDisplay/StationDisplay';
import SearchStationModal from '../../../components/SearchStationModal/SearchStationModal';

// image files
import searchIcon from '../../../assets/StationList/searchIcon.svg';
import createIcon from '../../../assets/StationList/createIcon.svg';
import noStationLogo from '../../../assets/StationList/noStationLogo.png';

const ShowStationList: React.FC = () => {
  //const [character, setCharacter] = useState<Character | null>(null);
  const [stations, setStations] = useState<Stations | null>(null);
  const [sortCriteria, setSortCriteria] = useState<"최신순" | "이름순">("최신순");
  const [isSearchStationModalVisible, setIsSearchStationModalVisible] = useState(false);
  const navigate = useNavigate();
  
  const [searchValue, setSearchValue] = useState('');

  const closeSearchStationModal = () => {
    setIsSearchStationModalVisible(false);
    setSearchValue('');
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('검색 제출:', searchValue);
    // 여기에 검색 실행 로직 작성
  };

  useEffect(() => {
    //setCharacter(characterData);
    setStations(stationsData);
    //setStations({"stations": []});
  }, []);

  const sortedByRecent = useMemo(() => (stations ? [...stations.stations] : []), [stations]);

  const sortedByName = useMemo(() => {
    return stations ? [...stations.stations].sort((a, b) => a.name.localeCompare(b.name, 'ko')) : [];
  }, [stations]);

  const sortedStations = sortCriteria === "최신순" ? sortedByRecent : sortedByName;
      
  return (
    <div className={s.container}>
      <div className={s.headContainer}>
        <div className={s.title}>
          <div className={s.titleText}>Example님 어디로 떠나볼까요?</div>
          <div className={s.titleButtons}>
            <button
              className={s.searchStationButton}
              onClick={() => setIsSearchStationModalVisible(true)}
            >
              <img src={searchIcon} alt="searchIcon" />
            </button>
            <button
              className={s.createStationButton}
              onClick={() => {navigate("/station/createstation", {replace: true});}}
            >
              <img src={createIcon} alt="createIcon" />
            </button>
          </div>
        </div>
      </div>

      <div className={s.separator}>
        <div className={s.totalNumOfStations}>
          전체 {sortedStations.length || 0}
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
          {sortedStations.length > 0 ? (
            sortedStations.map((station) => (
              <div key={station.stationId} className={s.stationDisplayWrapper}>
                <StationDisplay name={station.name} numOfUsers={station.numOfUsers} />
              </div>
            ))
          ) : (
            <div className={s.noStation}>
              <span className={s.noStationTitle}>아직 등록된 정거장이 없어요...</span>
              <span className={s.noStationText}>정거장을 검색하거나, 새로운 정거장을 만들어 보세요!</span>
              <img className={s.noStationLogo} src={noStationLogo} alt='noStationLogo' />
            </div>
          )}
        </div>
      </div>
      {isSearchStationModalVisible && (
        <SearchStationModal
          name={"example"}
          handleSubmit={handleSubmit}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleCloseModal={closeSearchStationModal}
        />
      )}
    </div>
  )
}

export default ShowStationList;
