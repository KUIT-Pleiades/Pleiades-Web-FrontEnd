import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './FriendsTab.module.scss';
import { useCharacterStore } from '../../store/useCharacterStore';

// components
import ShowTotalFriendsList from './ShowTotalFriendsList/ShowTotalFriendsList';
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';
import { fetchRequest } from '../../functions/fetchRequest';
import SendSignalPopup from './SendSignalPopup/SendSignalPopup';

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
    const { userInfo } = useCharacterStore();
    console.log("userInfo: ", userInfo);
    const userName = userInfo.userName || "플레이아데스";
    const [friendsData, setFriendsData] = useState<FriendsData | null>(null);
    const [hasNoFriend, setHasNoFriend] = useState<boolean>(false);
    const [signalTo, setSignalTo] = useState<string>("");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isSendSignalPopupVisible, setIsSendSignalPopupVisible] = useState<boolean>(false);
    const handleOpenSendSignalPopup = (friendName: string) => {
        setSignalTo(friendName);
        setIsSendSignalPopupVisible(true);
    };
    const handleCloseSendSignalPopup = () => {
        setIsSendSignalPopupVisible(false);
        setSignalTo("");
    };
    const handleImageSelected = (index: number) => {
        setSelectedImageIndex(index);
        console.log(`선택된 이미지 인덱스: ${selectedImageIndex}`);
    };

    // friends interaction functions
    const handleDeleteFriend = async(friendId: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/requests/${friendId}`,
            "DELETE",
            null
        );
        if (response) {
            console.log("친구 삭제 완료. 응답: ", response);
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
            console.log('삭제 완료. 응답 메시지: ',response);
            getFriendsList(); // 친구 목록 갱신
        } else console.error("친구 요청 취소 실패");
    }
    const handleSendSignal = async (friendId: string, friendName: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/${friendId}/signal`,
            "POST",
            { receiverId: friendId }
        );
        if (response) {
            console.log(response.message);
            handleOpenSendSignalPopup(friendName);
        } else console.error("시그널 보내기 실패");
    }

    const getFriendsList = async () => {
        const response = await fetchRequest<FriendsData>("/friends", "GET", null);
        if (response) {
            console.log("친구 목록 새로고침. 응답: ",response);
            setFriendsData(response);
        }
    };
    useEffect(() => {
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
                    <span className={s.titleName}>{userName}</span>
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
                <div className={s.totalFriendsListContainer}>
                <ShowTotalFriendsList
                    friendsData={friendsData}
                    handleDeleteFriend={handleDeleteFriend}
                    handleAcceptRequest={handleAcceptRequest}
                    handleRejectRequest={handleRejectRequest}
                    handleDeleteRequest={handleDeleteRequest}
                    handleSendSignal={handleSendSignal}
                />
                </div>
            {/*================================ 친구가 없을 때 ================================*/}
            {hasNoFriend &&
                <div className={s.noFriend}>
                    <p className={s.noFriendFirstText}>아직 친구가 없어요...</p>
                    <p className={s.noFriendSecondText}>ID를 검색해 친구를 추가해 보세요!</p>
                    <img src={pleiadesLogo} alt="pleiadesLogo" width={176} />
                </div>
            }
            {isSendSignalPopupVisible &&
                <SendSignalPopup
                    username={signalTo}
                    isSendSignalPopupVisible={isSendSignalPopupVisible}
                    handleCloseSendSignalPopup={handleCloseSendSignalPopup}
                    onImageSelected={handleImageSelected}
                />
            }
        </div>
    )
}

export default FriendsTab;
