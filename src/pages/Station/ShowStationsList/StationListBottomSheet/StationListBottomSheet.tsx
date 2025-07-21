import s from "./StationListBottomSheet.module.scss";
import { Station } from "../../../../interfaces/Interfaces";

// 이미지 파일
import slideLeft from "../../../../assets/StationList/slideLeft.svg";
import slideRight from "../../../../assets/StationList/slideRight.svg";
import lastActiveIcon from "../../../../assets/StationList/lastActiveIcon.svg";
import handleIcon from "../../../../assets/StationList/bottomSheetHandle.svg";

interface Props {
  station: Station;
  onEnter: (id: string) => void;
  goLeft: () => void;
  goRight: () => void;
  openCloseBottomSheet: () => void;
}

// export interface Station {
//   stationId: string;
//   name: string;
//   numOfUsers: number;
//   stationBackground: string;
// }

export default function StationListBottomSheet({ station, onEnter, goLeft, goRight, openCloseBottomSheet }: Props) {

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
              생성일 2025.임시.02
            </p>

            <div className={s.divider} />

            <div className={s.headerTitleStationInfoNumOfUSers}>
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
                방금전
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

      <div className={s.handle} onClick={openCloseBottomSheet}>
        <img
          src={handleIcon}
          alt="handle icon"
          className={s.handleIcon}
        />
        <h2 className={s.handleText}>내 정거장 목록</h2>
      </div>

      <div className={s.content}>
        
      </div>
    </div>
  );
}