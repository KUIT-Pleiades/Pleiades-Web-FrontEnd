import React, { useEffect, useState } from 'react';
import s from './SearchUsers.module.scss';
import { useNavigate } from 'react-router-dom';
// import pleiadesAllUsers from '../../mock/pleiadesUsers.json';
// import friendsExampleData from '../../mock/socialInfo.json';

// components
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';
import { fetchRequest } from '../../functions/fetchRequest';
import RecentSearch from './RecentSearch/RecentSearch';
import SearchResults from './SearchResults/SearchResults';

interface User {
    userId: string;
    userName: string;
    profile: string;
    status: "FRIEND" | "RECEIVED" | "SENT" | "JUSTHUMAN";
}
interface RecentSearchedUser {
    userId: string;
    userName: string;
    profile: string;
}

const SearchUsers: React.FC = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [showNoResultMessage, setShowNoResultMessage] = useState(false);
    const [recentSearches, setRecentSearches] = useState<RecentSearchedUser[]>([]);
    const [recentSearchloading, setRecentSearchLoading] = useState<boolean>(true);
    const [showRecentSearches, setShowRecentSearches] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);

        if(value === ''){
            setFilteredUsers([]);
            setShowRecentSearches(true);
            setShowNoResultMessage(false);
        }
    };

    const handleSearchSubmit = async (value?: string) => {
        const searchQuery = value || searchValue.trim();
        if(!searchQuery) return;
        
        setLoading(true);
        setShowRecentSearches(false);
        setShowNoResultMessage(false);

        const response = await fetchRequest<{ users: User[] }>(
            `/users?user_id=${searchValue}`,
            "GET",
            null
        );

        setLoading(false);

        if (response && response.users.length > 0) {
            setFilteredUsers(response.users);
        } else {
            setFilteredUsers([]);
            setShowNoResultMessage(true);
        }
    };

    const getRecentSearches = async () => {
        setRecentSearchLoading(true);
        const response = await fetchRequest<{ users: User[] }>("/users/histories", "GET", null);
        if (response && response.users) {
            setRecentSearches(response.users);
        }else{
            setRecentSearches([]);
        }
        setRecentSearchLoading(false);
    };

    const handleRecentSearchClick = async (id: string) => {
        setSearchValue(id);
        setShowRecentSearches(false);
        await handleSearchSubmit(id);
    };

    useEffect(() => {
        if(showRecentSearches) getRecentSearches();
    }, [showRecentSearches]);
    
    return (
        <div className={s.container}>
            {/*================================ 제목 부분 ===================================*/}
            <div className={s.headContainer}>
                <div className={s.searchSection}>
                    <div className={s.searchBarContainer}>
                        <SearchUsersBar
                            value={searchValue}
                            onChange={handleInputChange}
                            onSubmit={handleSearchSubmit}
                        />
                    </div>
                    <button
                        className={s.cancelSearchButton}
                        onClick={() => {navigate("/friendtab");}}
                    >취소</button>
                </div>
            </div>
            {/*============================== 최근 검색 기록 ================================*/}

            {showRecentSearches &&
                <RecentSearch
                    onUserClick={handleRecentSearchClick}
                    getRecentSearches={getRecentSearches}
                    recentSearchloading={recentSearchloading}
                    recentSearches={recentSearches}
                />
            }
            {/*================================ 검색 결과 ================================*/}
            {loading ? (
                <div className={s.loading}>검색 중...</div>
            ) : filteredUsers.length > 0 ? (
                <SearchResults filteredUsers={filteredUsers} refreshSearch={handleSearchSubmit} />
            ) : showNoResultMessage ? (
                <div className={s.noResultModal}>
                    <span className={s.noResultModalFirstText}>검색한 ID가 존재하지 않아요!</span>
                    <span className={s.noResultModalSecondText}>ID를 다시 확인해주세요</span>
                </div>
            ) : null}
        </div>
    )
}

export default SearchUsers
