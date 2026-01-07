import s from "./StationBottomSheetContent.module.scss";
import { SortOptionForStations, Station } from "../../../../interfaces/Interfaces";
import StationDisplay from "../StationDisplay/StationDisplay";
import SortCriteriaBoxForStation from "../../../../components/SortCriteriaBox/SortCriteriaBoxForStation";

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

// 정거장 목록 썸네일 이미지 매핑
const stationThumbnails: { [key: string]: string } = {
    // [change] 키에 .png 포함
    'bg_station_1.png': `${IMG_BASE_URL}rec_bg_station_1.png`,
    'bg_station_2.png': `${IMG_BASE_URL}rec_bg_station_2.png`,
    'bg_station_3.png': `${IMG_BASE_URL}rec_bg_station_3.png`,
    'bg_station_4.png': `${IMG_BASE_URL}rec_bg_station_4.png`,
};

interface StationBottomSheetContentProps {
    sortedStations: Station[];
    sortCriteria: SortOptionForStations;
    setSortCriteria: (criteria: SortOptionForStations) => void;
    handleEnterStation: (stationId: string) => void;
    onToggleFavorite: (stationId: string, isFavorite: boolean) => void;
}

export default function StationBottomSheetContent({
    sortedStations,
    sortCriteria,
    setSortCriteria,
    handleEnterStation,
    onToggleFavorite,
}: StationBottomSheetContentProps) {
    return (
        <div className={s.content}>
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
                    {sortedStations.map((station) => (
                        <div
                            key={station.stationId}
                            className={s.stationDisplayWrapper}
                            onClick={() => handleEnterStation(station.stationId)}
                        >
                            <StationDisplay
                                name={station.name}
                                numOfUsers={station.numOfUsers}
                                background={
                                    stationThumbnails[station.stationBackground] || // 썸네일 맵 사용
                                    `${IMG_BASE_URL}rec_bg_station_1.png` // 기본 썸네일
                                }
                                favorite={station.favorite}
                                onToggleFavorite={() =>
                                    onToggleFavorite(station.stationId, station.favorite)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}