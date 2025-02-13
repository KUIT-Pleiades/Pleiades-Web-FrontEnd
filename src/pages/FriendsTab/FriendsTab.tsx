import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './FriendsTab.module.scss';
//import { Character } from '../../interfaces/Interfaces';
//import characterData from '../../mock/character1.json';
//import friendsExampleData from '../../mock/socialInfo.json';

// components
import ShowTotalFriendsList from './ShowTotalFriendsList/ShowTotalFriendsList';
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';
import { fetchRequest } from '../../functions/fetchRequest';

// image files
import pleiadesLogo from '../../assets/FriendsTab/pleiadesLogoNoFriends.png';

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

const FriendsTab: React.FC = () => {
    const navigate = useNavigate();
    const [friendsData, setFriendsData] = useState<FriendsData | null>(null);
    const [hasNoFriend, setHasNoFriend] = useState<boolean>(false);

    // friends interaction functions
    const handleDeleteFriend = async(friendId: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/requests/${friendId}`,
            "DELETE",
            null
        );
        if (response) {
            console.log(response.message);
            getFriendsList(); // 친구 목록 갱신
        } else console.error("친구 삭제 실패");
    }
    const handleAcceptRequest = async (friendId: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/requests/${friendId}`,
            "PATCH",
            { status: "ACCEPTED" }
        );
        if (response) {
            console.log(response.message);
            getFriendsList(); // 친구 목록 갱신
        } else console.error("친구 요청 수락 실패");
    };
    const handleRejectRequest = async (friendId: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/requests/${friendId}`,
            "PATCH",
            { status: "REJECTED" }
        );
        if (response) {
            console.log(response.message);
            getFriendsList(); // 친구 목록 갱신
        } else console.error("친구 요청 거절 실패");
    }
    const handleDeleteRequest = async (friendId: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/requests/${friendId}`,
            "DELETE",
            null
        );
        if (response) {
            console.log(response.message);
            getFriendsList(); // 친구 목록 갱신
        } else console.error("친구 요청 취소 실패");
    }
    const handleSendSignal = async (friendId: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/${friendId}/signal`,
            "POST",
            { receiverId: friendId }
        );
        if (response) {
            console.log(response.message);
        } else console.error("시그널 보내기 실패");
    }

    const getFriendsList = async () => {
        const response = await fetchRequest<FriendsData>("/friends", "GET", null);
        if (response) {
            setFriendsData(response);
        }
    };
    useEffect(() => {
        //setFriendsData(friendsExampleData);
        getFriendsList();
    }, []);
    useEffect(() => {
        if (friendsData?.friend?.length === 0 && friendsData?.received?.length === 0 && friendsData?.sent?.length === 0) {
            setHasNoFriend(true); // 친구 없음
        } else {
            setHasNoFriend(false); // 친구 있음
        }
    }, [friendsData]);

    if (!friendsData) return <div>Loading...</div>;

    return (
        <div className={s.container}>
            {/*================================ 제목 부분 ===================================*/}
            <div className={s.headContainer}>
                <div className={s.title}>
                    <span className={s.titleName}>Example</span>
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
                handleAcceptRequest={handleAcceptRequest}
                handleRejectRequest={handleRejectRequest}
                handleDeleteRequest={handleDeleteRequest}
                handleSendSignal={handleSendSignal}
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

export default FriendsTab;
