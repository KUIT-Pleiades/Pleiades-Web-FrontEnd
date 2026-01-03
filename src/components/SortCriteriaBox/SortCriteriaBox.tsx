import React, { useState } from 'react';
import s from './SortCriteriaBox.module.scss';

// image files
import sortShowDown from '../../assets/FriendsTab/sortShowDown.png';
import sortHideUp from '../../assets/FriendsTab/sortHideUp.png';

interface SortCriteriaBoxProps {
    sortCriteria: "최신순" | "이름순";
    setSortCriteria: (criteria: "최신순" | "이름순") => void;
    textColor?: string;
}

const SortCriteriaBox: React.FC<SortCriteriaBoxProps> = ({ sortCriteria, setSortCriteria, textColor = "var(--gray-22, #444)" }) => {
    const [isSelectSortPopupOpen, setIsSelectSortPopupOpen] = useState<boolean>(false);

    return (
        <div className={s.container}>
            {isSelectSortPopupOpen ? (
                <div className={s.sortBySectionOpen}>
                    {/* 조건에 따라 버튼 순서를 조정 */}
                    {sortCriteria === "최신순" ? (
                        <>
                            <button
                                onClick={() => {
                                    setSortCriteria("최신순");
                                    setIsSelectSortPopupOpen(false);}}
                                className={s.sortCriteriaSelectButtonFirst}
                            >최신순</button>
                            <button
                                onClick={() => {
                                    setSortCriteria("이름순");
                                    setIsSelectSortPopupOpen(false);}}
                                className={s.sortCriteriaSelectButtonSecond}
                                style={{color: "#E1E1E1"}}
                            >이름순</button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setSortCriteria("이름순");
                                    setIsSelectSortPopupOpen(false);}}
                                className={s.sortCriteriaSelectButtonFirst}
                            >이름순</button>
                            <button
                                onClick={() => {
                                    setSortCriteria("최신순");
                                    setIsSelectSortPopupOpen(false);}}
                                className={s.sortCriteriaSelectButtonSecond}
                                style={{color: "#E1E1E1"}}
                            >최신순</button>
                        </>
                    )}
                    <img
                        className={s.arrowHideUp}
                        onClick={() => setIsSelectSortPopupOpen(false)}
                        src={sortHideUp}
                        alt="sortHideUp"
                    />
                </div>
            ) : (
                <div className={s.sortBySectionClose} onClick={() => setIsSelectSortPopupOpen(true)}>
                    <button
                        className={s.sortCriteriaText}
                        style={{ color: textColor }}
                    >
                        {sortCriteria}
                    </button>
                    <img className={s.arrowShowDown} src={sortShowDown} alt='sortShowDown' />
                </div>
            )}
        </div>
    );
};

export default SortCriteriaBox;