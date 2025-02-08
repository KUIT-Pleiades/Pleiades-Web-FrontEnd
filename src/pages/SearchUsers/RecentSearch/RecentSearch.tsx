import React, { useEffect, useState } from 'react';
import s from './RecentSearch.module.scss';
import recentResearchHistory from '../../../mock/recentSearchUsers.json';

// components
import ShowRecentSearchUsers from './ShowRecentSearchUser/ShowRecentSearchUser';

// image files
import userProfileImg from '../../../assets/SearchUsers/searchedUserProfileImg.png';

interface User {
    Id: string;
    Name: string;
}

interface RecentSearchProps {
    onUserClick: (id: string) => void;
}

const RecentSearch: React.FC<RecentSearchProps> = ({ onUserClick }) => {
    const [recentSearches, setRecentSearches] = useState<User[]>([]);

    const handleRemoveRecentSearch = (id: string) => {
        // 최근 검색 기록 삭제
        console.log('Remove recent search:', id);
    }

    useEffect(() => {
        setRecentSearches(recentResearchHistory.recentSearchUsers);
    }, []);

    return (
        <div className={s.recentSearchContainer}>
            <span className={s.recentSearchTitle}>최근 검색</span>
            <div className={s.separator} />
            {recentSearches.length === 0 ? 
            (
                <div className={s.noRecentSearchContainer}>
                    <span className={s.noRecentSearch}>검색 내역이 없어요</span>
                </div>
            )
            :
            (
                recentSearches.map(user => (
                    <ShowRecentSearchUsers
                        key={user.Id}
                        id={user.Id}
                        name={user.Name}
                        profileImage={userProfileImg}
                        onRemove={(id) => handleRemoveRecentSearch(id)}
                        onClick={() => onUserClick(user.Id)}
                    />
                ))
            )}
            
        </div>
    )
}

export default RecentSearch;
