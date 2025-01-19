import React, { useEffect, useState } from 'react';
import s from './SearchUsers.module.scss';

// components
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';
import ShowSearchedUser from './ShowSearchedUser/ShowSearchedUser';

// image files
import pleiadesLogo from '../../assets/FriendsTab/pleiadesLogoNoFriends.png';
import userProfileImg from '../../assets/SearchUsers/searchedUserProfileImg.png';

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
    const [friendsData, setFriendsData] = useState<FriendsData | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [showInstruction, setShowInstruction] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
            fetch("/src/mock/socialInfo.json")
                .then((res) => res.json())
                .then((data) => {setFriendsData(data)})
                .catch((err) => {console.error(err)});
            fetch("/src/mock/pleiadesUsers.json")
                .then((res) => res.json())
                .then((data) => {setUsers(data.pleiadesUsers)})
                .catch((err) => {console.error(err)});
        }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);

        if(value === ''){
            setFilteredUsers([]);
            setShowInstruction(true);
        }else {
            const results = users.filter(user =>
                user.Id.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredUsers(results);
            setShowInstruction(false);
        }
    };
    const handleInputFocus = () => {
        //if(searchValue !== '') setShowInstruction(false);
    };

    const handleInputBlur = () => {
        if (searchValue === '' && filteredUsers.length === 0) {
            setShowInstruction(true);
        }
    };

    const handleSearchSubmit = () => {
        console.log('Search submitted:', searchValue);

    };

    const handleRequestFriend = (id: string, isCancelRequest: boolean) => {
        if(isCancelRequest){
            console.log('Cancel Request Friend to',id);
        }else{
            console.log('Request Friend to',id);
        }
    }

    const isMyFriend = (id: string): boolean => {
        return friendsData?.MyFriends.some(friend => friend.Id === id) || false;
    };
    
    return (
        <div className={s.container}>
            {/*================================ 제목 부분 ===================================*/}
            <div className={s.headContainer}>
                <div className={s.title}>
                    <span className={s.titleName}>사용자 검색</span>
                </div>
            </div>
            {/*================================ 검색창 부분 ==================================*/}
            <div className={s.searchBarContainer}>
                <SearchUsersBar
                    value={searchValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onSubmit={handleSearchSubmit}
                />
                <button className={s.cancelSearchButton}>취소</button>
            </div>
            {/*================================ 텍스트 및 로고 ================================*/}
            {showInstruction && (
                <div className={s.instruction}>
                    <p className={s.instructionMessage}>ID를 검색해 친구를 추가해 보세요!</p>
                    <img src={pleiadesLogo} alt="pleiadesLogo" width={176} />
                </div>
            )}
            {/*================================ 검색 결과 ================================*/}
            {filteredUsers.length > 0 && (
                <div className={s.searchResultContainer}>
                    {filteredUsers.map(user => (
                        <ShowSearchedUser
                            key={user.Id}
                            id={user.Id}
                            name={user.Name}
                            profileImage={userProfileImg}
                            isMyFriend={isMyFriend(user.Id)}
                            onRequestFriend={handleRequestFriend}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchUsers
