import React, { useState } from 'react';
import s from './SortCriteriaBoxForStation.module.scss';

// image files
import sortShowDown from '../../assets/FriendsTab/sortShowDown.svg';
import sortHideUp from '../../assets/FriendsTab/sortHideUp.svg';
import { SortOptionForStations } from '../../interfaces/Interfaces';

// type SortOption = '새로운 활동순' | '최근 가입순' | '오래된 가입순' | '이름순';

interface SortCriteriaBoxForStationProps {
    sortCriteria: SortOptionForStations;
    setSortCriteria: (criteria: SortOptionForStations) => void;
    textColor?: string;
}

const SortCriteriaBoxForStation: React.FC<SortCriteriaBoxForStationProps> = ({ sortCriteria, setSortCriteria, textColor = "#444" }) => {
    const [isSelectSortPopupOpen, setIsSelectSortPopupOpen] = useState<boolean>(false);

    const options: SortOptionForStations[] = ['새로운 활동순', '최근 가입순', '오래된 가입순', '이름순'];
    const sortedOptions = options.slice().sort((a, b) => {
        if (a === sortCriteria) return -1;
        if (b === sortCriteria) return 1;
        return 0;
    });

    return (
        <div className={s.container}>
            {isSelectSortPopupOpen ? (
                <div className={s.sortBySectionOpen}>
                    <div className={s.buttonContainer}>
                        {sortedOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    setSortCriteria(option);
                                    setIsSelectSortPopupOpen(false);
                                }}
                                className={s.sortCriteriaSelectButton}
                                style={{
                                    color: option === sortCriteria ? "#444" : "#E1E1E1"
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <img
                        className={s.arrowHideUp}
                        onClick={() => setIsSelectSortPopupOpen(false)}
                        src={sortHideUp}
                        alt="sortHideUp"
                    />
                </div>
            ) : (
                <div className={s.sortBySectionClose} onClick={() => setIsSelectSortPopupOpen(true)}>
                    <button className={s.sortCriteriaText} style={{ color: textColor }}>
                        {sortCriteria}
                    </button>
                    <img className={s.arrowShowDown} src={sortShowDown} alt='sortShowDown' />
                </div>
            )}
        </div>
    );
};

export default SortCriteriaBoxForStation;