import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './FriendsTab.module.scss';
import { useCharacterStore } from '../../store/useCharacterStore';
import ShowTotalFriendsList from './ShowTotalFriendsList/ShowTotalFriendsList';
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';
import { axiosRequest } from '../../functions/axiosRequest';
import Pending from '../PageManagement/Pending';
import { Social } from '../../interfaces/Interfaces';
import pleiadesLogo from '../../assets/FriendsTab/pleiadesLogoNoFriends.png';
import backArrow from '../../assets/FriendsTab/backArrow.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SendSignalModal from '../../components/Signal/SendSignalModal';
import ReceiveSignalModal from '../../components/Signal/ReceivedSignalModal';
import { useSignalManager } from '../../components/Signal/useSignalManager';

// 🔧 axios 응답 구조에 맞게 response.data 리턴
const getFriendsList = async (): Promise<Social> => {
  const response = await axiosRequest<Social>("/friends", "GET", null);
  return response?.data ?? { received: [], friend: [], sent: [] }; // ✅ .data로 접근
};

const FriendsTab: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userInfo } = useCharacterStore();
  const userName = userInfo.userName || "플레이아데스";

  const { data: friendsData = { received: [], friend: [], sent: [] }, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriendsList,
  });

  const [hasNoFriend, setHasNoFriend] = useState(false);

  const {
    signalTo,
    signalImageIndex,
    isSendSignalPopupVisible,
    isReceiveSignalPopupVisible,
    signalsQueue,
    currentSignalIndex,
    sendSignal,
    closeSendSignalPopup,
    closeReceiveSignalPopup,
  } = useSignalManager();

  
  const handleDeleteFriend = async (friendId: string) => {
    const res = await axiosRequest(`/friends/requests/${friendId}`, "DELETE", null);
    if (res) queryClient.invalidateQueries({ queryKey: ["friends"] });
  };
  
  const handleAcceptRequest = async (friendId: string) => {
    const res = await axiosRequest(`/friends/requests/${friendId}`, "PATCH", { status: "ACCEPTED" });
    if (res) queryClient.invalidateQueries({ queryKey: ["friends"] });
  };
  
  const handleRejectRequest = async (friendId: string) => {
    const res = await axiosRequest(`/friends/requests/${friendId}`, "PATCH", { status: "REJECTED" });
    if (res) queryClient.invalidateQueries({ queryKey: ["friends"] });
  };
  
  const handleDeleteRequest = async (friendId: string) => {
    const res = await axiosRequest(`/friends/requests/${friendId}`, "DELETE", null);
    if (res) queryClient.invalidateQueries({ queryKey: ["friends"] });
  };

  useEffect(() => {
    setHasNoFriend(
      friendsData.friend.length === 0 &&
      friendsData.received.length === 0 &&
      friendsData.sent.length === 0
    );
  }, [friendsData]);

  return (
    <div className={s.container}>
      {isLoading && <Pending />}
      <div className={s.headContainer}>
        <button className={s.backButton} onClick={() => navigate("/home")}>
          <img src={backArrow} alt="backArrow" />
        </button>
        <div className={s.title}>
          <span className={s.titleName}>{userName}</span>
          <span className={s.titleText}>님의 친구목록</span>
        </div>
      </div>

      <div onClick={() => navigate("/searchusers")} className={s.searchBarContainer}>
        <SearchUsersBar />
      </div>

      <div className={s.totalFriendsListContainer}>
        <ShowTotalFriendsList
          friendsData={friendsData}
          handleDeleteFriend={handleDeleteFriend}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
          handleDeleteRequest={handleDeleteRequest}
          handleSendSignal={sendSignal}
        />
      </div>

      {hasNoFriend && (
        <div className={s.noFriend}>
          <p className={s.noFriendFirstText}>아직 친구가 없어요...</p>
          <p className={s.noFriendSecondText}>ID를 검색해 친구를 추가해 보세요!</p>
          <img src={pleiadesLogo} alt="pleiadesLogo" width={176} />
        </div>
      )}

      {isSendSignalPopupVisible && (
        <SendSignalModal
          username={signalTo}
          handleCloseSendSignalPopup={closeSendSignalPopup}
          imageIndex={signalImageIndex}
        />
      )}

      {isReceiveSignalPopupVisible && signalsQueue.length > 0 && (
        <ReceiveSignalModal
          username={signalsQueue[currentSignalIndex].userName}
          handleCloseReceiveSignalPopup={closeReceiveSignalPopup}
          imageIndex={signalsQueue[currentSignalIndex].imageIndex}
        />
      )}
    </div>
  );
};

export default FriendsTab;