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
import backArrow from '../../assets/FriendsTab/backArrow.svg';
import Pending from '../PageManagement/Pending';

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

// interface SignalFrom {
//     userId: string;
//     userName: string;
//     imageIndex: number;
// }

const FriendsTab: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const { userInfo } = useCharacterStore();
    const userName = userInfo.userName || "플레이아데스";
    const [friendsData, setFriendsData] = useState<FriendsData>({ received: [], friend: [], sent: [] });
    const [hasNoFriend, setHasNoFriend] = useState<boolean>(false);
    const [signalTo, setSignalTo] = useState<string>("");
    const [signalImageIndex, setSignalImageIndex] = useState<number>(-1);
    const [isSendSignalPopupVisible, setIsSendSignalPopupVisible] = useState<boolean>(false);
    const handleOpenSendSignalPopup = (friendName: string) => {
        setSignalTo(friendName);
        setIsSendSignalPopupVisible(true);
    };
    const handleCloseSendSignalPopup = () => {
        setIsSendSignalPopupVisible(false);
        setSignalTo("");
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
        const randomIndex = Math.floor(Math.random() * 3);
        setSignalImageIndex(randomIndex);
        const response = await fetchRequest<{ message: string }>(
            `/friends/signals`,
            "POST",
            {
                receiverId: friendId,
                imageIndex: signalImageIndex
            }
        );
        if (response) {
            console.log(response.message);
            handleOpenSendSignalPopup(friendName);
        } else console.error("시그널 보내기 실패");
    }
    // const handleReceiveSignal = async () => { // 시그널 받는 코드
    //     const response = await fetchRequest<{ signals: SignalFrom[] }>(
    //         '/friends/signals',
    //         "GET",
    //         null
    //     );
    //     if (response) {
    //         console.log(response.signals);
    //     } else console.error("시그널 받기 실패");
    // }
    // const handleDeleteSignal = async (userId: string) => { // 시그널 삭제하는 코드
    //     const response = await fetchRequest<{ message: string }>(
    //         `/friends/signals/${userId}`,
    //         "DELETE",
    //         null
    //     );
    //     if (response) {
    //         console.log(response.message);
    //     } else console.error("시그널 삭제 실패");
    // }

    const getFriendsList = async () => {
        const response = await fetchRequest<FriendsData>("/friends", "GET", null);
        if (response) {
            console.log("친구 목록 새로고침. 응답: ",response);
            setFriendsData(response);
            setLoading(false);
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

    // if (!friendsData) {
    //     setLoading(true);
    // } else {
    //     setLoading(false);
    // }

    return (
        <div className={s.container}>
            {loading && <Pending />}
            {/*================================ 제목 부분 ===================================*/}
            <div className={s.headContainer}>
                <button
                    className={s.backButton}
                    onClick={() => {navigate("/home");}}
                >
                    <img src={backArrow} alt='backArrow' />
                </button>
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
                    handleCloseSendSignalPopup={handleCloseSendSignalPopup}
                    imageIndex={signalImageIndex}
                />
            }
        </div>
    )
}

export default FriendsTab;
