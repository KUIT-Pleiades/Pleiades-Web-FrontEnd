import React, { useState } from 'react';
import s from './SearchResults.module.scss';

//components
import ShowSearchedUser from './ShowSearchedUser/ShowSearchedUser';
import { fetchRequest } from '../../../functions/fetchRequest';

//image files
//import userProfileImg from '../../../assets/SearchUsers/searchedUserProfileImg.png';

interface User { 
    userId: string;
    userName: string;
    profile: string;
    status: "FRIEND" | "RECEIVED" | "SENT" | "JUSTHUMAN";
 }

interface SearchResultsProps {
    filteredUsers: User[];
    refreshSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ filteredUsers, refreshSearch }) => {
    const [isAcceptRequestPopupVisible, setIsAcceptRequestPopupVisible] = useState(false);
    const [isRefuseRequestPopupVisible, setIsRefuseRequestPopupVisible] = useState(false);
    const [isWithdrawRequestPopupVisible, setIsWithdrawRequestPopupVisible] = useState(false);
    const [isSendRequestPopupVisible, setIsSendRequestPopupVisible] = useState(false);

    const handleSendRequestFriend = async (friendId: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/requests`,
            "POST",
            { receiverId: friendId }
        );
        console.log('친구 요청 보냄. to: ',friendId);
        if (response) {
            console.log('응답 받기 성공. 응답 메시지: ',response.message);
            refreshSearch();
            setIsSendRequestPopupVisible(true);
            setTimeout(() => {
                setIsSendRequestPopupVisible(false);
            }, 1500);
        } else console.error("친구 요청 실패");
    };
    const handleDeleteRequest = async (friendId: string, type: "REQUEST" | "FRIEND") => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/requests/${friendId}`,
            "DELETE",
            null
        );
        if (response) {
            console.log('딜리트 함수 실행 완. 메시지: ',response.message);
            refreshSearch();
    
            if (type === "REQUEST") {
                setIsWithdrawRequestPopupVisible(true);
                setTimeout(() => setIsWithdrawRequestPopupVisible(false), 1500);
            }
        } else console.error(type === "REQUEST" ? "친구 요청 취소 실패" : "친구 삭제 실패");
    };
    const handleRejectRequest = async (friendId: string) => {
        const response = await fetchRequest<{ message: string }>(
            `/friends/requests/${friendId}`,
            "PATCH",
            { status: "REJECTED" }
        );
        if (response) {
            console.log(response.message);
            refreshSearch();
            setIsRefuseRequestPopupVisible(true);
            setTimeout(() => {
                setIsRefuseRequestPopupVisible(false);
            }, 1500);
        } else console.error("친구 요청 거절 실패");
    }
    const handleAcceptRequest = async (friendId: string) => {
            const response = await fetchRequest<{ message: string }>(
                `/friends/requests/${friendId}`,
                "PATCH",
                { status: "ACCEPTED" }
            );
            if (response) {
                console.log(response.message);
                refreshSearch();
                setIsAcceptRequestPopupVisible(true);
                setTimeout(() => {
                    setIsAcceptRequestPopupVisible(false);
                }, 1500);
            } else console.error("친구 요청 수락 실패");
        };
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

    const handleAddSearchHistory = async (searchedId: string) => {
        console.log('검색기록 추가 시도..!');
        try {
            const response = await fetchRequest<{ message: string }>(
                "/users/histories",
                "POST",
                { searchedId: searchedId }
            );
            if (response) {
                console.log('최근 검색 기록 추가 완료. 추가한 사용자 아이디: ',searchedId);
                console.log('응답: ', response);
                //getRecentSearches();
            } else {
                console.error("최근 검색 기록 추가 실패");
            }
        } catch (error) {
            console.error("최근 검색 기록 추가 중 오류 발생:", error);
        }
    };

    return (
        <div className={s.searchResultContainer}>
            {filteredUsers.map(user => {
                return(
                    <div className={s.searchUserContainer} key={user.userId}>
                        <ShowSearchedUser
                            user={user}
                            handleSendRequestFriend={handleSendRequestFriend}
                            handleDeleteRequest={handleDeleteRequest}
                            handleRejectRequest={handleRejectRequest}
                            handleAcceptRequest={handleAcceptRequest}
                            handleSendSignal={handleSendSignal}
                            handleAddSearchHistory={handleAddSearchHistory}
                        />
                        {isAcceptRequestPopupVisible && (
                            <div className={s.popupAccept}>
                                <span className={s.popupTitle}>{user.userName}님과 친구가 되었어요!</span>
                                <span className={s.popupText}>내 친구에서 확인할 수 있어요</span>
                            </div>
                        )}
                        {isRefuseRequestPopupVisible && (
                            <div className={s.popupRefuse}>
                                <span className={s.popupTitle}>친구 요청을 거절했어요</span>
                            </div>
                        )}
                        {isWithdrawRequestPopupVisible && (
                            <div className={s.popupWithdraw}>
                                <span className={s.popupTitle}>친구 요청을 취소했어요</span>
                            </div>
                        )}
                        {isSendRequestPopupVisible && (
                            <div className={s.popupSendRequest}>
                                <span className={s.popupTitle}>친구 요청을 완료했어요!</span>
                                <span className={s.popupText}>요청 중인 친구에서 확인할 수 있어요</span>
                            </div>
                        )}
                    </div>
                    
                );
            })}
        </div>
    )
}

export default SearchResults;
