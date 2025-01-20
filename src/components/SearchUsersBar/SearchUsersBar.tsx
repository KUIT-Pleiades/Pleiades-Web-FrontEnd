import React from 'react';
import s from './SearchUsersBar.module.scss';

// image files
import searchIcon from '../../assets/FriendsTab/searchIcon.svg';

interface SearchUsersBarProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onSubmit?: () => void;
    placeholder?: string;
}

const SearchUsersBar: React.FC<SearchUsersBarProps> = ({
    value,
    onChange,
    onFocus,
    onBlur,
    onSubmit,
    placeholder = "추가할 ID를 검색해보세요",
}) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onSubmit) {
            onSubmit();
        }
    };
    return (
        <div className={s.searchBarContainer}>
            <div className={s.searchBar}>
                <input
                    className={s.searchInput}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                />
                <button
                    className={s.searchButton}
                    type="submit"
                    onClick={onSubmit}
                >
                    <img src={searchIcon} alt="searchIcon" />
                </button>
            </div>
        </div>
        
    )
}

export default SearchUsersBar;
