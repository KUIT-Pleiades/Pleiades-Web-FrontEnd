import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ShowStationList.module.scss';
import { useCharacterStore } from '../../../store/useCharacterStore';
import { Message, Stations, Station, SortOptionForStations } from '../../../interfaces/Interfaces';
import StationListBottomSheet from './StationListBottomSheet/StationListBottomSheet';
import SortCriteriaBoxForStation from '../../../components/SortCriteriaBox/SortCriteriaBoxForStation';
import SearchStationModal from '../../../components/SearchStationModal/SearchStationModal';
import { axiosRequest } from '../../../functions/axiosRequest';
import axiosInstance from '../../../api/axiosInstance';
import { Methods } from '../../../types/types';

// 이미지 파일
import searchIcon from '../../../assets/StationList/searchIcon.svg';
import createIcon from '../../../assets/StationList/createIcon.svg';
import noStationLogo from '../../../assets/StationList/noStationLogo.png';
import StationListBottomSheetOpen from './StationListBottomSheet/StationListBottomSheetOpen';

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

  const [sortCriteria, setSortCriteria] = useState<SortOptionForStations>(
    () => (localStorage.getItem('sortCriteria') as SortOptionForStations) || '새로운 활동순'
  );
  const [isSearchStationModalVisible, setIsSearchStationModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isNoExistStationPopupVisible, setIsNoExistStationPopupVisible] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [carouselStations, setCarouselStations] = useState<Station[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentStation = carouselStations[backgroundIndex];

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

  useEffect(() => {
    // 🔧 MOCK DATA 시작
    const mockStations: Station[] = Array.from({ length: 20 }, (_, i) => ({
      stationId: `MOCKID${i + 1}`,
      name: `정거장${i + 1}`,
      numOfUsers: Math.floor(Math.random() * 7),
      stationBackground: `station_dim_0${(i % 4) + 1}` as Station['stationBackground'],
      createdAt: new Date(Date.now() - i * 10000000).toISOString(),
      lastActive: new Date(Date.now() - i * 5000000).toISOString(),
      isFavorite: i % 3 === 0,
    }));
    setStations({ stations: mockStations });
    setCarouselStations(mockStations.slice(0, 5));
    // 🔧 MOCK DATA 끝

    // 실제 서버 요청은 아래 주석 처리
    
    // const fetchStations = async () => {
    //   try {
    //     const response = await axiosRequest<Stations>('/stations', 'GET', null);
    //     if (response?.data?.stations) {
    //       setStations({ stations: response.data.stations });
    //       setCarouselStations(response.data.stations.slice(0, 5));
    //     }
    //   } catch (error) {
    //     console.error('정거장 불러오기 실패:', error);
    //   }
    // };
    // fetchStations();
    
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isOpenBottomSheet) {
      intervalRef.current = setInterval(() => {
        setBackgroundIndex((prev) => (prev + 1) % carouselStations.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [carouselStations, isOpenBottomSheet]);

  const sortedStations = useMemo(() => {
    const copied = [...stations.stations];
    return copied
      .sort((a, b) => {
        // 1. 즐겨찾기 여부 우선 정렬 (true가 앞으로)
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;

        // 2. 선택한 정렬 기준 적용
        switch (sortCriteria) {
          case '이름순':
            return a.name.localeCompare(b.name, 'ko');
          case '최근 가입순':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case '오래된 가입순':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case '새로운 활동순':
          default:
            return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        }
      });
  }, [stations, sortCriteria]);

  const handleChangeSortCriteria = (criteria: SortOptionForStations) => {
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

      if (response.status === 200 || response.status === 202) return enterStation(stationId);
      if (response.status === 404) return handlePopupNoExistStation();
      if (response?.message === 'Invalid or expired token') return navigate('/login');
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

        if (status === 401) navigate('/login');
        else if (status === 404) handlePopupNoExistStation();
        else if (status === 409) {
          if (message?.includes('User already')) enterStation(stationId);
        }
      } else console.error('서버에 연결할 수 없습니다.');
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

      if (status === 401) navigate('/login');
      else if (status === 404) handlePopupNoExistStation();
      else if (status === 409) {
        if (message?.includes('User already')) enterStation(stationId);
        else if (message?.includes('Station Full')) alert('정거장이 가득 찼습니다. 다른 정거장을 찾아보세요.');
      }
    } else console.error('서버에 연결할 수 없습니다.');
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

  const resetSliderInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % carouselStations.length);
    }, 5000);
  };

  const goToNextStation = () => {
    setBackgroundIndex((prev) => {
      const next = (prev + 1) % carouselStations.length;
      return next;
    });
    resetSliderInterval();
  };

  const goToPrevStation = () => {
    setBackgroundIndex((prev) => {
      const next = (prev - 1 + carouselStations.length) % carouselStations.length;
      return next;
    });
    resetSliderInterval();
  };

  const openCloseBottomSheet = () => {
    setIsOpenBottomSheet((prev) => !prev);
  };

  // 즐겨찾기 관련
  const toggleFavoriteInParent = async (stationId: string, isFavorite: boolean) => {
      try {
          const method: Methods = isFavorite ? 'DELETE' : 'POST';
          console.log(`즐겨찾기 ${isFavorite ? '제거' : '추가'}: ${stationId}`);
          const response = await axiosRequest(`/stations/${stationId}/favorite`, method, null);

          if (response.status === 200) {
              console.log(`즐겨찾기 ${isFavorite ? '제거' : '추가'} 성공: ${stationId}`);
              const updated = stations.stations.map(station =>
                  station.stationId === stationId ? { ...station, isFavorite: !isFavorite } : station
              );
              setStations({ stations: updated });
          }
      } catch {
          console.log('즐겨찾기 변경에 실패했습니다.');
      }
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
                    <SortCriteriaBoxForStation
                        sortCriteria={sortCriteria}
                        setSortCriteria={setSortCriteria}
                        textColor="#E1E1E1"
                    />
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
              <div className={s.dimOverlayNoStation} />
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
              <div className={s.dimOverlay} />
            </div>
            {currentStation &&
              (isOpenBottomSheet ? (
                <StationListBottomSheetOpen
                  sortedStations={sortedStations}
                  sortCriteria={sortCriteria}
                  setSortCriteria={handleChangeSortCriteria}
                  openCloseBottomSheet={openCloseBottomSheet}
                  handleEnterStation={handleEnterStation}
                  onToggleFavorite={toggleFavoriteInParent}
                />
              ) : (
                <StationListBottomSheet
                  station={currentStation}
                  onEnter={handleEnterStation}
                  goLeft={goToPrevStation}
                  goRight={goToNextStation}
                  openCloseBottomSheet={openCloseBottomSheet}
                />
              ))}
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