import s from "./StationBottomSheetContent.module.scss";
import { SortOptionForStations, Station } from "../../../../interfaces/Interfaces";
import StationDisplay from "../StationDisplay/StationDisplay";
import SortCriteriaBoxForStation from "../../../../components/SortCriteriaBox/SortCriteriaBoxForStation";

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

// 정거장 배경 파일명으로 썸네일 URL 생성
const getStationThumbnailUrl = (backgroundFileName: string): string => {
    if (!backgroundFileName) {
        return `${IMG_BASE_URL}background/thumbnails/rec_bg_station_1.png`;
    }
    // bg_station_X.png -> rec_bg_station_X.png
    return `${IMG_BASE_URL}background/thumbnails/rec_${backgroundFileName}`;
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
                                background={getStationThumbnailUrl(station.stationBackground)}
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