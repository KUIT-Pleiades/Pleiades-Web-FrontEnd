import s from "./StationListBottomSheetOpen.module.scss";

import handleIcon from "../../../../assets/StationList/bottomSheetHandle.svg";
import { SortOptionForStations, Station } from "../../../../interfaces/Interfaces";
import StationDisplay from "../StationDisplay/StationDisplay";
import SortCriteriaBoxForStation from "../../../../components/SortCriteriaBox/SortCriteriaBoxForStation";

const IMG_BASE_URL = import.meta.env.VITE_PINATA_ENDPOINT;

const stationBackgrounds: { [key: string]: string } = {
    station_dim_01: `${IMG_BASE_URL}station_dim_01.png`,
    station_dim_02: `${IMG_BASE_URL}station_dim_02.png`,
    station_dim_03: `${IMG_BASE_URL}station_dim_03.png`,
    station_dim_04: `${IMG_BASE_URL}station_dim_04.png`,
};

interface Props {
    sortedStations: Station[];
    sortCriteria: SortOptionForStations;
    setSortCriteria: (criteria: SortOptionForStations) => void;
    openCloseBottomSheet: () => void;
    handleEnterStation: (stationId: string) => void;
    onToggleFavorite: (stationId: string, isFavorite: boolean) => void;
}

export default function StationListBottomSheetOpen({
    sortedStations,
    sortCriteria,
    setSortCriteria,
    openCloseBottomSheet,
    handleEnterStation,
    onToggleFavorite,
}: Props) {
    return (
        <div className={s.bottomSheetContainer}>
            <div className={s.handle} onClick={openCloseBottomSheet}>
                <img
                    src={handleIcon}
                    alt="handle icon"
                    className={s.handleIcon}
                />
                <h2 className={s.handleText}>내 정거장 목록</h2>
            </div>

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
                                        stationBackgrounds[station.stationBackground] ||
                                        `${IMG_BASE_URL}station_dim_01.png`
                                    }
                                    isFavorite={station.isFavorite}
                                    onToggleFavorite={() =>
                                        onToggleFavorite(station.stationId, station.isFavorite) // ✅ 전달
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}