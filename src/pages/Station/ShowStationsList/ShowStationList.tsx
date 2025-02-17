/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import s from './ShowStationList.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCharacterStore } from '../../../store/useCharacterStore';

//import characterData from '../../../mock/character1.json';
//import stationsData from '../../../mock/myStations.json';
import { StationDetails, Stations } from '../../../interfaces/Interfaces';
import SortCriteriaBox from '../../../components/SortCriteriaBox/SortCriteriaBox';
import StationDisplay from './StationDisplay/StationDisplay';
import SearchStationModal from '../../../components/SearchStationModal/SearchStationModal';

// image files
import searchIcon from '../../../assets/StationList/searchIcon.svg';
import createIcon from '../../../assets/StationList/createIcon.svg';
import noStationLogo from '../../../assets/StationList/noStationLogo.png';
import { fetchRequest } from '../../../functions/fetchRequest';
import background1 from '../../../assets/stationBackgroundImg/stationBackgroundImg_01.png';
import background2 from '../../../assets/stationBackgroundImg/stationBackgroundImg_02.png';
import background3 from '../../../assets/stationBackgroundImg/stationBackgroundImg_03.png';
import background4 from '../../../assets/stationBackgroundImg/stationBackgroundImg_04.png';

const stationBackgrounds: { [key: string]: string } = {
  stationBackgroundImg_01: background1,
  stationBackgroundImg_02: background2,
  stationBackgroundImg_03: background3,
  stationBackgroundImg_04: background4,
};
// interface searchedStation { // 아직 정거장 검색부분 개발 전이라 임시로 만든 타입.. 추후 수정해야함
//   stationId: string;
//   name: string;
//   numOfUsers: number;
//   stationBackground: string;
// }

const ShowStationList: React.FC = () => {
  const { userInfo } = useCharacterStore();
  const userName = userInfo.userName || "플레이아데스";
  const [stations, setStations] = useState<Stations>({ stations: [] });
  const [sortCriteria, setSortCriteria] = useState<"최신순" | "이름순">("최신순");
  const [isSearchStationModalVisible, setIsSearchStationModalVisible] = useState(false);
  const navigate = useNavigate();
  
  const [searchValue, setSearchValue] = useState('');

  const fetchStations = async () => {
    try {
      const response = await fetchRequest<Stations>('/stations', 'GET', null);
  
      if (response && Array.isArray(response.stations)) {
        setStations((prevStations) => {
          if (JSON.stringify(prevStations) !== JSON.stringify(response)) {
            console.log('정거장 업데이트:', response.stations);
            return response;
          }
          return prevStations;
        });
      } else {
        console.warn('정거장 목록이 비어 있거나 응답이 예상과 다릅니다.', response);
        setStations((prevStations) => prevStations); // 상태 변경이 없도록 유지
      }
    } catch (error) {
      console.error('정거장 불러오기 실패:', error);
    }
  };

  const fetchSearchedStation = async (stationId: string) => {
    try {
      const response = await fetchRequest<StationDetails>(`/stations/${stationId}`, 'PATCH', null);

      if(response) {
        console.log('정거장 검색 성공', response);
      }else{
        console.log('정거장 검색 실패');
      }
    } catch (error) {
      console.error('정거장 검색 오류:', error);
    }
    // 그런데 응답이 정거장 내부 홈 화면에서 필요한 정거장 전체 정보이므로, 검색 로직을 여기가 아니라
    // 정거장 내부 홈.tsx 에서 하고, 여기서는 검색 밸류만 프롭스든 뭐든 해서 넘겨주는게 맞지 않을까?
  };

  const closeSearchStationModal = () => {
    setIsSearchStationModalVisible(false);
    setSearchValue('');
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('검색 제출:', searchValue);
    
    if (searchValue.trim() !== '') {
      await fetchSearchedStation(searchValue);
    }
  };
  const handleEnterStation = (stationId: string) => {
    console.log('enter to station. station id : ',stationId);
    //정거장 입장
  }

  useEffect(() => {
    //setCharacter(characterData);
    //setStations(stationsData);
    //setStations({"stations": []});
    fetchStations();
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
          <div className={s.titleText}>{userName}님 어디로 떠나볼까요?</div>
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
            textColor="#E1E1E1"
          />
        </div>
      </div>
      <div className={s.stationListWrapper}>
        <div className={s.stationListContainer}>
          {sortedStations.length > 0 ? (
            sortedStations.map((station) => (
              <div
                key={station.stationId}
                className={s.stationDisplayWrapper}
                onClick={() => handleEnterStation(station.stationId)}
              >
                <StationDisplay
                  name={station.name}
                  numOfUsers={station.numOfUsers}
                  background={stationBackgrounds[station.stationBackground] || background1}
                />
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
