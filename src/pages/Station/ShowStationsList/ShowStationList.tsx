import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ShowStationList.module.scss';
import { useCharacterStore } from '../../../store/useCharacterStore';
import { Message, Stations, Station } from '../../../interfaces/Interfaces';
import StationListBottomSheet from './StationListBottomSheet/StationListBottomSheet';
import SortCriteriaBox from '../../../components/SortCriteriaBox/SortCriteriaBox';
import SearchStationModal from '../../../components/SearchStationModal/SearchStationModal';
import { axiosRequest } from '../../../functions/axiosRequest';
import axiosInstance from '../../../api/axiosInstance';
//import StationDisplay from './StationDisplay/StationDisplay';

// 이미지 파일
import searchIcon from '../../../assets/StationList/searchIcon.svg';
import createIcon from '../../../assets/StationList/createIcon.svg';
import noStationLogo from '../../../assets/StationList/noStationLogo.png';

const IMG_BASE_URL = import.meta.env.VITE_PINATA_ENDPOINT;

const stationBackgrounds: { [key: string]: string } = {
  station_dim_01: `${IMG_BASE_URL}station_dim_01.png`,
  station_dim_02: `${IMG_BASE_URL}station_dim_02.png`,
  station_dim_03: `${IMG_BASE_URL}station_dim_03.png`,
  station_dim_04: `${IMG_BASE_URL}station_dim_04.png`,
};

const ShowStationList: React.FC = () => {
  const { userInfo } = useCharacterStore();
  const navigate = useNavigate();
  const userName = userInfo.userName || '플레이아데스';

  const [stations, setStations] = useState<Stations>({ stations: [] });
  const [sortCriteria, setSortCriteria] = useState<'최신순' | '이름순'>(
    () => (localStorage.getItem('sortCriteria') === '이름순' ? '이름순' : '최신순')
  );
  const [isSearchStationModalVisible, setIsSearchStationModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isNoExistStationPopupVisible, setIsNoExistStationPopupVisible] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [carouselStations, setCarouselStations] = useState<Station[]>([]);

  const currentStation = carouselStations[backgroundIndex];

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axiosRequest<Stations>('/stations', 'GET', null);
        if (response?.data?.stations) {
          setStations({ stations: response.data.stations });
          setCarouselStations(response.data.stations.slice(0, 5));
        }
      } catch (error) {
        console.error('정거장 불러오기 실패:', error);
      }
    };
    fetchStations();
  }, []);

  useEffect(() => {
    if (carouselStations.length === 0) return;
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % carouselStations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselStations]);

  const sortedStations = useMemo(() => {
    const copied = [...stations.stations];
    return sortCriteria === '이름순'
      ? copied.sort((a, b) => a.name.localeCompare(b.name, 'ko'))
      : copied;
  }, [stations, sortCriteria]);

  const handleChangeSortCriteria = (criteria: '최신순' | '이름순') => {
    setSortCriteria(criteria);
    localStorage.setItem('sortCriteria', criteria);
  };

  const handlePopupNoExistStation = () => {
    setIsNoExistStationPopupVisible(true);
    setTimeout(() => setIsNoExistStationPopupVisible(false), 1500);
  };

  const fetchSearchedStation = async (stationId: string) => {
    try {
      const response = await axiosRequest(`/stations/${stationId}`, 'PATCH', null);

      if (response.status === 200 || response.status === 202) {
        return enterStation(stationId);
      }

      if (response.status === 404) {
        return handlePopupNoExistStation();
      }

      if (response?.message === 'Invalid or expired token') {
        return navigate('/login');
      }
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        const axiosError = error as {
          response?: {
            status?: number;
            data?: { message?: string };
          };
        };

        const status = axiosError.response?.status;
        const message = axiosError.response?.data?.message;

        if (status === 401) {
          navigate('/login');
        } else if (status === 404) {
          handlePopupNoExistStation();
        } else if (status === 409) {
          if (message?.includes('User already')) {
            enterStation(stationId);
          }
        }
      } else {
        console.error('서버에 연결할 수 없습니다.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) await fetchSearchedStation(searchValue);
  };

  const handleEnterStation = async (stationId: string) => {
  try {
    const response = await axiosInstance.get<Message>(`/stations/${stationId}`);

    if ([200, 202, 409].includes(response.status)) {
      return enterStation(stationId);
    }
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error
    ) {
      const axiosError = error as {
        response?: {
          status?: number;
          data?: { message?: string };
        };
      };

      const status = axiosError.response?.status;
      const message = axiosError.response?.data?.message;

      if (status === 401) {
        navigate('/login');
      } else if (status === 404) {
        handlePopupNoExistStation();
      } else if (status === 409) {
        if (message?.includes('User already')) {
          enterStation(stationId);
        } else if (message?.includes('Station Full')) {
          alert('정거장이 가득 찼습니다. 다른 정거장을 찾아보세요.');
        }
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
  }
};

  const enterStation = (stationId: string) => {
    sessionStorage.setItem('stationId', stationId);
    navigate('/station/stationinside');
  };

  const closeSearchStationModal = () => {
    setIsSearchStationModalVisible(false);
    setSearchValue('');
  };

  return (
    <div className={s.container}>
      <div className={s.headContainer}>
        <div className={s.title}>
          <div className={s.titleText}>{userName}님 어디로 떠나볼까요?</div>
          <div className={s.titleButtons}>
            <button className={s.searchStationButton} onClick={() => setIsSearchStationModalVisible(true)}>
              <img src={searchIcon} alt="searchIcon" />
            </button>
            <button className={s.createStationButton} onClick={() => navigate("/station/createstation", { replace: true })}>
              <img src={createIcon} alt="createIcon" />
            </button>
          </div>
        </div>
      </div>

      {
        sortedStations.length == 0 ? (
          <>
            <div className={s.separator}>
              <div className={s.totalNumOfStations}>전체 {sortedStations.length || 0}</div>
              <div className={s.sortCriteriaBoxContainer}>
                <SortCriteriaBox sortCriteria={sortCriteria} setSortCriteria={handleChangeSortCriteria} textColor="#E1E1E1" />
              </div>
            </div>
            <div className={s.stationListWrapper}>
              <div className={s.stationListContainer}>
                <div className={s.noStation}>
                  <span className={s.noStationTitle}>아직 등록된 정거장이 없어요...</span>
                  <span className={s.noStationText}>정거장을 검색하거나, 새로운 정거장을 만들어 보세요!</span>
                  <img className={s.noStationLogo} src={noStationLogo} alt="noStationLogo" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={s.bodyWrapper}>
            {/* 배경 이미지 슬라이더 */}
            <div className={s.backgroundSlider} onClick={() => handleEnterStation(currentStation.stationId)}>
              <div
                className={s.backgroundImageStatic}
                style={{
                  backgroundImage: `url(${stationBackgrounds[currentStation?.stationBackground]})`,
                }}
              />
            </div>
            {currentStation && (
              <StationListBottomSheet
                station={currentStation}
                onEnter={handleEnterStation} 
              />
            )}
          </div>
        )
      }

      {/* 검색한 정거장이 없을 때 나타나는 팝업 */}
      {isNoExistStationPopupVisible && 
        <div className={s.popupNoExistStation}>
          <span className={s.popupTitle}>검색한 정거장이 존재하지 않아요!</span>
          <span className={s.popupText}>코드를 다시 확인해주세요</span>
        </div>
      }

      {isSearchStationModalVisible &&
        <SearchStationModal name={userName} handleSubmit={handleSubmit} searchValue={searchValue} setSearchValue={setSearchValue} handleCloseModal={closeSearchStationModal}/>
      }
    </div>
  );
};

export default ShowStationList;

{/* <div className={s.separator}>
        <div className={s.totalNumOfStations}>전체 {sortedStations.length || 0}</div>
        <div className={s.sortCriteriaBoxContainer}>
          <SortCriteriaBox sortCriteria={sortCriteria} setSortCriteria={handleChangeSortCriteria} textColor="#E1E1E1" />
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
                  background={stationBackgrounds[station.stationBackground] || `${IMG_BASE_URL}station_dim_01.png`}
                />
              </div>
            ))
          ) : (
            <div className={s.noStation}>
              <span className={s.noStationTitle}>아직 등록된 정거장이 없어요...</span>
              <span className={s.noStationText}>정거장을 검색하거나, 새로운 정거장을 만들어 보세요!</span>
              <img className={s.noStationLogo} src={noStationLogo} alt="noStationLogo" />
            </div>
          )}
        </div>
      </div> */}