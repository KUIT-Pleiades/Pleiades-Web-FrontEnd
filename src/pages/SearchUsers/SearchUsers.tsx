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
import Pending from '../PageManagement/Pending';

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
        if (!searchQuery) return;
    
        setLoading(true);
        setShowRecentSearches(false);
        setShowNoResultMessage(false);
    
        try {
            // ❌ 잘못된 타입 추론 (response가 배열이 아님)
            // const response = await fetchRequest<User[]>("/users?user_id=" + searchQuery, "GET", null);
            
            // ✅ 올바른 타입 적용 (response.users에 접근)
            const response = await fetchRequest<{ users: User[] }>(
                `/users?user_id=${searchQuery}`,
                "GET",
                null
            );
    
            console.log('검색 요청 완료. 검색어: ', searchQuery);
            console.log('response: ', response);
    
            setLoading(false);
    
            if (response && Array.isArray(response.users) && response.users.length > 0) {
                setFilteredUsers(response.users);
            } else {
                console.log('검색 결과 0명..');
                setFilteredUsers([]);
                setShowNoResultMessage(true);
            }
        } catch (error) {
            console.error("검색 요청 실패:", error);
            setLoading(false);
            setFilteredUsers([]);
            setShowNoResultMessage(true);
        }
    };

    const getRecentSearches = async () => {
        setRecentSearchLoading(true);
        const response = await fetchRequest<{ users: RecentSearchedUser[] }>(
            "/users/histories",
            "GET",
            null
        );
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
            {recentSearchloading || loading && <Pending />}
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
                <div className={s.recentSearchContainer}>
                    <RecentSearch
                        onUserClick={handleRecentSearchClick}
                        getRecentSearches={getRecentSearches}
                        //recentSearchloading={recentSearchloading}
                        recentSearches={recentSearches}
                    />
                </div>
            }
            {/*================================ 검색 결과 ================================*/}
            {filteredUsers.length > 0 ? (
                <div className={s.searchResultsContainer}>
                    <SearchResults
                        filteredUsers={filteredUsers}
                        refreshSearch={handleSearchSubmit}
                    />
                </div>
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
