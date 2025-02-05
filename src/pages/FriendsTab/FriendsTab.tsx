import React, { useEffect, useState } from 'react';
import { Character } from '../../interfaces/Interfaces';
import s from './FriendsTab.module.scss';

// components
import ShowTotalFriendsList from './ShowTotalFriendsList/ShowTotalFriendsList';
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';

// image files
import pleiadesLogo from '../../assets/FriendsTab/pleiadesLogoNoFriends.png';
import { useNavigate } from 'react-router-dom';

interface Friend {
    Id: string;
    Name: string;
    Since: number;
}

interface FriendsData {
    FriendRequests: Friend[];
    MyFriends: Friend[];
    MyRequests: Friend[];
}

const FriendsTab: React.FC = () => {
    const navigate = useNavigate();
    const [character, setCharacter] = useState<Character | null>(null);
    const [friendsData, setFriendsData] = useState<FriendsData | null>(null);

    //친구 있는지 없는지
    const [hasNoFriend, setHasNoFriend] = useState<boolean>(false);

    const handleDeleteFriend = () => {
        //친구 삭제
    }

    useEffect(() => {
        fetch("/src/mock/character1.json")
            .then((res) => res.json())
            .then((data) => {setCharacter(data)})
            .catch((err) => {console.error(err)});
        fetch("/src/mock/socialInfo.json")
            .then((res) => res.json())
            .then((data) => {setFriendsData(data)})
            .catch((err) => {console.error(err)});
    }, []);
    useEffect(() => {
        if (
            friendsData?.FriendRequests?.length === 0 &&
            friendsData?.MyFriends?.length === 0 &&
            friendsData?.MyRequests?.length === 0
        ) {
            setHasNoFriend(true); // 친구 없음
        } else {
            setHasNoFriend(false); // 친구 있음
        }
    }, [friendsData]);

    if (!character || !friendsData) return <div>Loading...</div>;

    return (
        <div className={s.container}>
            {/*================================ 제목 부분 ===================================*/}
            <div className={s.headContainer}>
                <div className={s.title}>
                    <span className={s.titleName}>{character?.userName}</span>
                    <span className={s.titleText}>님의 친구목록</span>
                </div>
            </div>
            {/*================================ 검색창 부분 ==================================*/}
            <div
                onClick={() => {navigate("/searchusers");}}
                className={s.searchBarContainer}
            >
                <SearchUsersBar />
            </div>
            {/*================================ 친구 목록 부분 ================================*/}
            <ShowTotalFriendsList
                friendsData={friendsData}
                handleDeleteFriend={handleDeleteFriend}
            />
            {/*================================ 친구가 없을 때 ================================*/}
            {hasNoFriend &&
                <div className={s.noFriend}>
                    <p className={s.noFriendFirstText}>아직 친구가 없어요...</p>
                    <p className={s.noFriendSecondText}>ID를 검색해 친구를 추가해 보세요!</p>
                    <img src={pleiadesLogo} alt="pleiadesLogo" width={176} />
                </div>
            }
        </div>
    )
}

export default FriendsTab
