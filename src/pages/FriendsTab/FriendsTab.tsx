import React, { useEffect, useState } from 'react';
import { Character } from '../../interfaces/Interfaces';
import s from './FriendsTab.module.scss';

// components
import ShowTotalFriendsList from './ShowTotalFriendsList/ShowTotalFriendsList';
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';

// image files
import pleiadesLogo from '../../assets/FriendsTab/pleiadesLogoNoFriends.png';

interface Friend {
    Id: string;
    Name: string;
}

interface FriendsData {
    FriendRequests: Friend[];
    MyFriends: Friend[];
    MyRequests: Friend[];
}

const FriendsTab: React.FC = () => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [friendsData, setFriendsData] = useState<FriendsData>({
        FriendRequests: [],
        MyFriends: [],
        MyRequests: [],
    });

    //친구 있는지 없는지
    //const [hasNoFriend, setHasNoFriend] = useState<boolean>(false);

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

    const hasNoFriend = React.useMemo(() => {
        return (
            friendsData.FriendRequests.length === 0 &&
            friendsData.MyFriends.length === 0 &&
            friendsData.MyRequests.length === 0
        );
    }, [friendsData]);

    if (!character || !friendsData) return <div>Loading...</div>;

    return (
        <div className={s.container}>
            {/*================================ 제목 부분 ===================================*/}
            <div className={s.headContainer}>
                <div className={s.title}>
                    <span className={s.titleName}>{character?.characterName}님의 친구목록</span>
                </div>
            </div>
            {/*================================ 검색창 부분 ==================================*/}
            <div onClick={() => {
                //navigate("/search");
            }}>
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
