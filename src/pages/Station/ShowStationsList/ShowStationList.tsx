import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ShowStationList.module.scss';
import { useCharacterStore } from '../../../store/useCharacterStore';
import { Message, Stations, Station, SortOptionForStations, JoinStationResponse } from '../../../interfaces/Interfaces';
import SortCriteriaBoxForStation from '../../../components/SortCriteriaBox/SortCriteriaBoxForStation';
import SearchStationModal from '../../../components/SearchStationModal/SearchStationModal';
import { axiosRequest } from '../../../functions/axiosRequest';
import axiosInstance from '../../../api/axiosInstance';
import { Methods } from '../../../types/types';
import { DraggableBottomSheet } from '../../../components/DraggableBottomSheet/DraggableBottomSheet';
import StationBottomSheetContent from './StationBottomSheetContent/StationBottomSheetContent';
import CurrentStationInfo from './CurrentStationInfo/CurrentStationInfo';

// 이미지 파일
import searchIcon from '../../../assets/StationList/searchIcon.svg';
import createIcon from '../../../assets/StationList/createIcon.svg';
import noStationLogo from '../../../assets/StationList/noStationLogo.png';

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

// 서버에서 오는 'bg_station_X' 값을 실제 배경 이미지 파일명으로 매핑합니다.
// const stationBackgrounds: { [key: string]: string } = {
//     bg_station_1: `${IMG_BASE_URL}station_dim_01.png`,
//     bg_station_2: `${IMG_BASE_URL}station_dim_02.png`,
//     bg_station_3: `${IMG_BASE_URL}station_dim_03.png`,
//     bg_station_4: `${IMG_BASE_URL}station_dim_04.png`,
// };

function getStationBackgroundUrl(code: string | undefined, variant: 'dim' | 'full' | 'rec' = 'dim'): string {
    if (!code) return `${IMG_BASE_URL}background/station_dim_01.png`;

    const match = code.match(/bg_station_(\d+)/);
    if (!match) {
        if (/^https?:\/\//.test(code)) return code;
        return `${IMG_BASE_URL}background/${code}`;
    }

    const n = parseInt(match[1], 10);
    const two = String(n).padStart(2, '0');

    switch (variant) {
        case 'full':
            return `${IMG_BASE_URL}background/bg_station_${n}.png`;
        case 'rec':
            return `${IMG_BASE_URL}background/thumbnails/rec_bg_station_${n}.png`;
        case 'dim':
        default:
            return `${IMG_BASE_URL}background/station_dim_${two}.png`;
    }
}

function getMockStations(): Stations {
    const now = new Date();
    const iso = (d: Date) => d.toISOString();

    const mock: Station[] = [
        {
            stationId: 'ST001',
            stationCode: 'A1B2C3',
            name: '오로라 정거장',
            numOfUsers: 3,
            stationBackground: 'bg_station_1.png',
            createdAt: iso(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7)),
            lastActive: iso(new Date(now.getTime() - 1000 * 60 * 3)),
            favorite: true,
        },
        {
            stationId: 'ST002',
            stationCode: 'D4E5F6',
            name: '은하수 라운지',
            numOfUsers: 5,
            stationBackground: 'bg_station_2.png',
            createdAt: iso(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 14)),
            lastActive: iso(new Date(now.getTime() - 1000 * 60 * 30)),
            favorite: false,
        },
        {
            stationId: 'ST003',
            stationCode: 'G7H8I9',
            name: '성운 카페',
            numOfUsers: 2,
            stationBackground: 'bg_station_3.png',
            createdAt: iso(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30)),
            lastActive: iso(new Date(now.getTime() - 1000 * 60 * 120)),
            favorite: false,
        },
    ];

    return { stations: mock };
}

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
    const bottomSheetHeaderHeight = 57;

    const USE_MOCK = false; // todo <============== 모의 데이터를 사용할지 여부. 나중에 false로 수정 필요!!!

    useEffect(() => {
        const fetchStations = async () => {
            if (USE_MOCK) {
                const mock = getMockStations();
                setStations(mock);
                const sortedMock = [...mock.stations].sort((a, b) => 
                    new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
                );
                setCarouselStations(sortedMock.slice(0, 5));
                return;
            }

            try {
                // GET /stations API 호출
                const response = await axiosRequest<Stations>('/stations', 'GET', null);
                if (response?.data?.stations) {
                    const allStations = response.data.stations;
                    setStations({ stations: allStations });
                    const sortedForCarousel = [...allStations].sort((a, b) => {
                        return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
                    });

                    setCarouselStations(sortedForCarousel.slice(0, 5));
                } else {
                    setStations({ stations: [] });
                    setCarouselStations([]);
                }
            } catch (error: unknown) {
                 console.error('정거장 목록을 불러오는 중 오류가 발생했습니다:', error);
                // 로그인 토큰 만료 등 인증 오류 처리
                if (
                    typeof error === 'object' &&
                    error !== null &&
                    'response' in error
                ) {
                    const axiosError = error as {
                        response?: {
                            status?: number;
                        };
                    };
                    if (axiosError.response?.status === 401) {
                        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
                        navigate('/login');
                    }
                }
                 // 오류 발생 시 빈 배열로 상태 설정
                setStations({ stations: [] });
                setCarouselStations([]);
            }
        };

        fetchStations();
    }, [navigate]);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        // 캐러셀에 정거장이 있고, 바텀시트가 닫혀있을 때만 인터벌 실행
        if (carouselStations.length > 0 && !isOpenBottomSheet) {
            intervalRef.current = setInterval(() => {
                setBackgroundIndex((prev) => (prev + 1) % carouselStations.length);
            }, 5000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [carouselStations.length, isOpenBottomSheet]);

    const sortedStations = useMemo(() => {
        const copied = [...stations.stations];
        return copied.sort((a, b) => {
            if (a.favorite && !b.favorite) return -1;
            if (!a.favorite && b.favorite) return 1;

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

    const handlePopupNoExistStation = () => {
        setIsNoExistStationPopupVisible(true);
        setTimeout(() => setIsNoExistStationPopupVisible(false), 1500);
    };

    const joinStationByCode = async (stationCode: string) => {
        try {
            const response = await axiosRequest<JoinStationResponse>(`/stations/${stationCode}`, 'PATCH', null);

            if (response.status === 200 || response.status === 202) return enterStation(response.data.stationId);
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
                    if (message?.includes('User already')) {
                        const joined = stations.stations.find(st => st.stationCode === stationCode);
                        if (joined?.stationId) enterStation(joined.stationId);
                        else handlePopupNoExistStation();
                    }
                }
            } else console.error('서버에 연결할 수 없습니다.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('입력된 정거장 코드:', searchValue);
        if (searchValue.trim()) await joinStationByCode(searchValue);
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
        if (carouselStations.length > 0) {
            intervalRef.current = setInterval(() => {
                setBackgroundIndex((prev) => (prev + 1) % carouselStations.length);
            }, 5000);
        }
    };

    const goToNextStation = () => {
        setBackgroundIndex((prev) => (prev + 1) % carouselStations.length);
        resetSliderInterval();
    };

    const goToPrevStation = () => {
        setBackgroundIndex((prev) => (prev - 1 + carouselStations.length) % carouselStations.length);
        resetSliderInterval();
    };

    const handleChangeSortCriteria = (criteria: SortOptionForStations) => {
        setSortCriteria(criteria);
        localStorage.setItem('sortCriteria', criteria);
    };

    const toggleFavorite = async (stationId: string, isFavorite: boolean) => {
        try {
            const method: Methods = isFavorite ? 'DELETE' : 'POST';
            const response = await axiosRequest(`/stations/${stationId}/favorite`, method, null);

            if (response.status === 200) {
                setStations(prev => ({
                    stations: prev.stations.map(station =>
                        station.stationId === stationId ? { ...station, favorite: !isFavorite } : station
                    )
                }));
                 setCarouselStations(prev => prev.map(station =>
                    station.stationId === stationId ? { ...station, favorite: !isFavorite } : station
                ));
            }
        } catch {
            alert('즐겨찾기 변경에 실패했습니다.');
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
                sortedStations.length === 0 ? (
                    <>
                        <div className={s.separator}>
                            <div className={s.totalNumOfStations}>전체 0</div>
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
                        <div className={s.backgroundSlider} onClick={() => handleEnterStation(currentStation.stationId)}>
                            <div
                                className={s.backgroundImageStatic}
                                style={{ backgroundImage: `url(${getStationBackgroundUrl(currentStation?.stationBackground, 'full')})` }}
                            />
                            <div className={s.dimOverlay} />
                        </div>
                        {currentStation && (
                            <>
                                <CurrentStationInfo
                                    station={currentStation}
                                    onEnter={handleEnterStation}
                                    goLeft={goToPrevStation}
                                    goRight={goToNextStation}
                                />
                                <DraggableBottomSheet
                                    open={isOpenBottomSheet}
                                    onClose={() => setIsOpenBottomSheet(false)}
                                    onOpen={() => setIsOpenBottomSheet(true)}
                                    headerHeight={bottomSheetHeaderHeight}
                                >
                                    <StationBottomSheetContent
                                        sortedStations={sortedStations}
                                        sortCriteria={sortCriteria}
                                        setSortCriteria={handleChangeSortCriteria}
                                        handleEnterStation={handleEnterStation}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                </DraggableBottomSheet>
                            </>
                        )}
                    </div>
                )
            }

            {isNoExistStationPopupVisible &&
                <div className={s.popupNoExistStation}>
                    <span className={s.popupTitle}>검색한 정거장이 존재하지 않아요!</span>
                    <span className={s.popupText}>코드를 다시 확인해주세요</span>
                </div>
            }

            {isSearchStationModalVisible &&
                <SearchStationModal
                    name={userName}
                    handleSubmit={handleSubmit}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleCloseModal={closeSearchStationModal}
                />
            }
        </div>
    );
};

export default ShowStationList;
