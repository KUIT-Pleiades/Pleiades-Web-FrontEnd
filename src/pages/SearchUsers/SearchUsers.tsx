import React, { useEffect, useState } from 'react';
import s from './SearchUsers.module.scss';
import { useNavigate } from 'react-router-dom';
import friendsExampleData from '../../mock/socialInfo.json';
import pleiadesAllUsers from '../../mock/pleiadesUsers.json';
import recentResearchHistory from '../../mock/recentSearchUsers.json';

// components
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';
import ShowSearchedUser from './ShowSearchedUser/ShowSearchedUser';

// image files
import userProfileImg from '../../assets/SearchUsers/searchedUserProfileImg.png';
import ShowRecentSearchUsers from './ShowRecentSearchUsers/ShowRecentSearchUsers';

interface Friend {
    Id: string;
    Name: string;
}

interface FriendsData {
    FriendRequests: Friend[];
    MyFriends: Friend[];
    MyRequests: Friend[];
}

interface User {
    Id: string;
    Name: string;
}

const SearchUsers: React.FC = () => {
    const navigate = useNavigate();
    const [friendsData, setFriendsData] = useState<FriendsData | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [recentSearches, setRecentSearches] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [showNoResultMessage, setShowNoResultMessage] = useState(false);
    const [showRecentSearches, setShowRecentSearches] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setFriendsData(friendsExampleData);
        setUsers(pleiadesAllUsers.pleiadesUsers);
        setRecentSearches(recentResearchHistory.recentSearchUsers);
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

    const handleRemoveRecentSearch = (id: string) => {
        // 최근 검색 기록 삭제
        console.log('Remove recent search:', id);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);

        if(value === ''){
            setFilteredUsers([]);
            setShowRecentSearches(true);
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
    };

    const handleInputBlur = () => {
        if (searchValue === '' && filteredUsers.length === 0) {
            setShowRecentSearches(true);
        }
    };

    const handleSearchSubmit = () => {
        console.log('Search submitted:', searchValue);

    };

    const handleRequestFriend = async (id: string, isCancelRequest: boolean) => {
        // 친구 요청 보내거나 취소한 경우 서버에 보내는 로직
        
        // try {
        //   const response = await fetch(`/api/friends/${id}`, {
        //     method: isCancelRequest ? "DELETE" : "POST",
        //   });
      
        //   if (response.ok) {
        //     setFriendsData(prevData => {
        //       if (!prevData) return prevData;
      
        //       return {
        //         ...prevData,
        //         MyRequests: isCancelRequest
        //           ? prevData.MyRequests.filter(req => req.Id !== id) // 요청 취소하면 리스트에서 제거
        //           : [...prevData.MyRequests, { Id: id, Name: "새로운 친구" }] // 요청 보내면 추가
        //       };
        //     });
        //   }
        // } catch (error) {
        //   console.error("친구 요청 처리 중 오류 발생:", error);
        // }
        console.log(`Friend request ${isCancelRequest ? 'cancelled' : 'sent'} to user ${id}`);
    };

    // const isMyFriend = (id: string): boolean => {
    //     return friendsData?.MyFriends.some(friend => friend.Id === id) || false;
    // };
    const getFriendStatus = (id: string, friendsData: FriendsData | null) => {
        if (!friendsData) return { isFriend: false, isRequested: false, isReceivedRequest: false };

        const isFriend = friendsData.MyFriends.some(friend => friend.Id === id);
        const isRequested = friendsData.MyRequests.some(request => request.Id === id);
        const isReceivedRequest = friendsData.FriendRequests.some(request => request.Id === id);
      
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
            {showRecentSearches && (
                <div className={s.recentSearchContainer}>
                    <span className={s.recentSearchTitle}>최근 검색</span>
                    <div className={s.separator} />
                    {recentSearches.map(user => (
                    <ShowRecentSearchUsers
                        key={user.Id}
                        id={user.Id}
                        name={user.Name}
                        profileImage={userProfileImg}
                        onRemove={(id) => handleRemoveRecentSearch(id)}
                        onClick={(id) => console.log(`Clicked user ${id}`)}
                    />
                    ))}
                </div>
            )}
            {/*================================ 검색 결과 ================================*/}
            {filteredUsers.length > 0 && (
                <div className={s.searchResultContainer}>
                    {filteredUsers.map(user => {
                        const { isFriend, isRequested, isReceivedRequest } = getFriendStatus(user.Id, friendsData);
                        return(
                            <ShowSearchedUser
                                key={user.Id}
                                id={user.Id}
                                name={user.Name}
                                profileImage={userProfileImg}
                                isFriend={isFriend}
                                isRequested={isRequested}
                                isReceivedRequest={isReceivedRequest}
                                onRequestFriend={handleRequestFriend}
                            />
                        );
                    })}
                </div>
            )}
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
