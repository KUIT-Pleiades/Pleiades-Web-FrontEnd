import s from "./CurrentStationInfo.module.scss";
import { Station } from "../../../../interfaces/Interfaces";

// 이미지 파일
import slideLeft from "../../../../assets/StationList/slideLeft.svg";
import slideRight from "../../../../assets/StationList/slideRight.svg";
import lastActiveIcon from "../../../../assets/StationList/lastActiveIcon.svg";

const getTimeAgoText = (time: string): string => {
    const now = new Date().getTime();
    const past = new Date(time).getTime();
    const diffMs = now - past;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;

    if (diffMs < 10 * minute) return "방금전";
    if (diffMs < hour) return `${Math.floor(diffMs / minute)}분 전`;
    if (diffMs < day) return `${Math.floor(diffMs / hour)}시간 전`;
    if (diffMs < week) return `${Math.floor(diffMs / day)}일 전`;
    return "오래전";
}

const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
};

interface CurrentStationInfoProps {
    station: Station;
    onEnter: (id: string) => void;
    goLeft: () => void;
    goRight: () => void;
}

export default function CurrentStationInfo({ station, onEnter, goLeft, goRight }: CurrentStationInfoProps) {

    return (
        <div className={s.bottomSheetContainer}>
            <div className={s.header}>
                <button className={s.headerLeftButton} onClick={goLeft} >
                    <img
                        src={slideLeft}
                        alt="slide left"
                        className={s.headerLeftButtonIcon}
                    />
                </button>

                <div className={s.headerTitle} onClick={() => onEnter(station.stationId)}>
                    <h2 className={s.headerTitleStationName}>{station.name}</h2>
                    <div className={s.headerTitleStationInfo}>
                        <p className={s.headerTitleStationInfoCreationDate}>
                            생성일 {formatDate(station.createdAt)}
                        </p>

                        <div className={s.divider} />

                        <div className={s.headerTitleStationInfoNumOfUsers}>
                            <span className={s.headerTitleStationInfoNumOfUsersNum}>
                                {station.numOfUsers}
                            </span>
                            <span className={s.headerTitleStationInfoNumOfUsersText}>
                                /6
                            </span>
                        </div>

                        <div className={s.divider} />

                        <div className={s.headerTitleStationInfoLastActive}>
                            <img
                                src={lastActiveIcon}
                                alt="last active icon"
                                className={s.headerTitleStationInfoLastActiveIcon}
                            />
                            <span className={s.headerTitleStationInfoLastActiveText}>
                                {getTimeAgoText(station.lastActive)}
                            </span>
                        </div>
                    </div>
                </div>

                <button className={s.headerRightButton} onClick={goRight}>
                    <img
                        src={slideRight}
                        alt="slide right"
                        className={s.headerRightButtonIcon}
                    />
                </button>
            </div>
        </div>
    );
}