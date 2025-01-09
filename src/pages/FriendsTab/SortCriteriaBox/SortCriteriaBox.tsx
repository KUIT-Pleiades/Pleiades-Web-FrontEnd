import React, { useState } from 'react';
import s from './SortCriteriaBox.module.scss';

// image files
import sortShowDown from '../../../assets/FriendsTab/sortShowDown.svg';
import sortHideUp from '../../../assets/FriendsTab/sortHideUp.svg';

interface SortCriteriaBoxProps {
    sortCriteria: "최신순" | "이름순";
    setSortCriteria: (criteria: "최신순" | "이름순") => void;
}

const SortCriteriaBox: React.FC<SortCriteriaBoxProps> = ({ sortCriteria, setSortCriteria}) => {
    const [isSelectSortPopupOpen, setIsSelectSortPopupOpen] = useState<boolean>(false); //정렬 기준 정하는 버튼 눌렀을 때 true

    return (
        <div className={s.container}>
            {isSelectSortPopupOpen ? 
                (
                    <div className={s.sortBySectionOpen}>
                        <div className={s.sortCriteriaSelectButtonContainer}>
                            <button onClick={() => {
                                    setSortCriteria("최신순");
                                    setIsSelectSortPopupOpen(false);}}
                                    className={s.sortCriteriaSelectButton}
                                    {...(sortCriteria === "이름순" ? {style: {color: "#E1E1E1"}} : {})}
                            >최신순</button>

                            <button onClick={() => {
                                    setSortCriteria("이름순");
                                    setIsSelectSortPopupOpen(false);}}
                                    className={s.sortCriteriaSelectButton}
                                    {...(sortCriteria === "최신순" ? {style: {color: "#E1E1E1"}} : {})}
                            >이름순</button>
                        </div>
                        <img
                            className={s.arrow}
                            onClick={() => setIsSelectSortPopupOpen(false)}
                            src={sortHideUp}
                            alt='sortHideUp'
                        />
                    </div>
                )
                :
                (
                    <div className={s.sortBySectionClose} onClick={() => setIsSelectSortPopupOpen(true)}>
                        {sortCriteria}
                        <img className={s.arrow} src={sortShowDown} alt='sortShowDown' />
                    </div>
                )
            }
        </div>
    )
}

export default SortCriteriaBox;
