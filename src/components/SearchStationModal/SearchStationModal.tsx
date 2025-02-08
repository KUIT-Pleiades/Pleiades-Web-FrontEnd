import React from 'react';
import s from './SearchStationModal.module.scss';

// image files
import searchStationModalIcon from '../../assets/StationList/searchStationModalIcon.png';
import closeModal from '../../assets/StationList/closeModal.svg';

interface SearchStationModalProps {
    name?: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    handleCloseModal: () => void;
}

const SearchStationModal: React.FC<SearchStationModalProps> = ({
    name='',
    handleSubmit,
    searchValue,
    setSearchValue,
    handleCloseModal
}) => {
return (
    <div className={s.modalOverlay}>
        <div className={s.modal}>
            <div className={s.modalIcon}>
                <img src={searchStationModalIcon} alt='searchStationModalIcon' />
            </div>
            <button
                className={s.modalClose}
                onClick={handleCloseModal}
            >
                <img src={closeModal} alt='closeModal' />
            </button>
            <span className={s.modalTitle}>{name}님 어디로 떠나볼까요?</span>
            <div className={s.modalSearch}>
                <form onSubmit={handleSubmit}>
                    <input
                        className={s.modalInput}
                        type='search'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='우주 정거장 코드를 입력해주세요.'
                    />
                </form>
            </div>
        </div>
    </div>
)
}

export default SearchStationModal;
