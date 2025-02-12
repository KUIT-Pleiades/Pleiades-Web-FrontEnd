import React, { useEffect, useState } from 'react';
import s from './SearchUsers.module.scss';
import { useNavigate } from 'react-router-dom';
import pleiadesAllUsers from '../../mock/pleiadesUsers.json';
import friendsExampleData from '../../mock/socialInfo.json';

// components
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';

// image files
import RecentSearch from './RecentSearch/RecentSearch';
import SearchResults from './SearchResults/SearchResults';

interface Friend {
    friendId: number;
    userId: string;
    userName: string;
    profile: string;
}

interface FriendsData {
    received: Friend[];
    friend: Friend[];
    sent: Friend[];
}

interface User {
    Id: string;
    Name: string;
}

const SearchUsers: React.FC = () => {
    const navigate = useNavigate();
    const [friendsData, setFriendsData] = useState<FriendsData | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [showNoResultMessage, setShowNoResultMessage] = useState(false);
    const [showRecentSearches, setShowRecentSearches] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setFriendsData(friendsExampleData);
        setUsers(pleiadesAllUsers.pleiadesUsers);
        // fetch("/src/mock/socialInfo.json")
        //     .then((res) => res.json())
        //     .then((data) => {setFriendsData(data)})
        //     .catch((err) => {console.error(err)});
        // fetch("/src/mock/pleiadesUsers.json")
        //     .then((res) => res.json())
        //     .then((data) => {setUsers(data.pleiadesUsers)})
        //     .catch((err) => {console.error(err)});
        // fetch("/src/mock/recentSearchUsers.json")
        //     .then((res) => res.json())
        //     .then((data) => {setRecentSearches(data.recentSearchUsers)})
        //     .catch((err) => {console.error(err)});
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);

        if(value === ''){
            setFilteredUsers([]);
            setShowRecentSearches(true);
            setShowNoResultMessage(false);
        }else {
            const results = users.filter(user =>
                user.Id.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredUsers(results);
            setShowRecentSearches(false);
            if(results.length === 0){
                setShowNoResultMessage(true);
            }else{
                setShowNoResultMessage(false);
            }
        }
    };
    const handleInputFocus = () => {
        //if(searchValue !== '') setShowRecentSearches(false);
        setShowNoResultMessage(false);
    };

    const handleInputBlur = () => {
        setShowNoResultMessage(false);
        if (searchValue === '' && filteredUsers.length === 0) {
            setShowRecentSearches(true);
        }
    };

    const handleSearchSubmit = () => {
        console.log('Search submitted:', searchValue);

    };

    const handleSendRequestFriend = async (id: string) => {
        console.log(id); //요청 보내기
    };
    const handleWithdrawRequestFriend = async (id: string) => {
        console.log(id); //요청 철회
    };
    const handleRefuseRequestFriend = async (id: string) => {
        console.log(id); //요청 거절
    };
    const handlePoke = (id: string) => {
        console.log(id); //쿡 찌르기
    };
    const handleDeleteFriend = (id: string) => {
        console.log(id); //친구 삭제
    }

    const handleRecentSearchClick = (id: string) => {
        setSearchValue(id);
        setShowRecentSearches(false);
        setFilteredUsers(users.filter(user => user.Id.toLowerCase().includes(id.toLowerCase())));
    };

    const getFriendStatus = (id: string) => {
        if (!friendsData) return { isFriend: false, isRequested: false, isReceivedRequest: false };

        const isFriend = friendsData.friend.some(friend => friend.userId === id);
        const isRequested = friendsData.sent.some(request => request.userId === id);
        const isReceivedRequest = friendsData.received.some(request => request.userId === id);
      
        return { isFriend, isRequested, isReceivedRequest };
    };
    
    return (
        <div className={s.container}>
            {/*================================ 제목 부분 ===================================*/}
            <div className={s.headContainer}>
                <div className={s.searchSection}>
                    <div className={s.searchBarContainer}>
                        <SearchUsersBar
                            value={searchValue}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
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

            {showRecentSearches && (<RecentSearch onUserClick={handleRecentSearchClick} />)}

            {/*================================ 검색 결과 ================================*/}
            {filteredUsers.length > 0 && (
                <div className={s.searchResultContainer}>
                    <div className={s.searchResultTitle}>
                        <span className={s.searchResultTitleText}>{`검색결과 (${filteredUsers.length})`}</span>
                    </div>
                    <SearchResults 
                        filteredUsers={filteredUsers}
                        handleSendRequestFriend={handleSendRequestFriend}
                        handleWithdrawRequestFriend={handleWithdrawRequestFriend}
                        handleRefuseRequestFriend={handleRefuseRequestFriend}
                        handlePoke={handlePoke}
                        handleDeleteFriend={handleDeleteFriend}
                        getFriendStatus={getFriendStatus}
                    />
                </div>
                
            )}
            
            {/*============================== 검색 결과 없음 ================================*/}
            {showNoResultMessage && (
                <div className={s.noResultModal}>
                    <span className={s.noResultModalFirstText}>검색한 ID가 존재하지 않아요!</span>
                    <span className={s.noResultModalSecondText}>ID를 다시 확인해주세요</span>
                </div>
            )}
        </div>
    )
}

export default SearchUsers
