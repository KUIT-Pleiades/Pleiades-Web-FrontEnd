import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './FriendsTab.module.scss';
import { useCharacterStore } from '../../store/useCharacterStore';
import ShowTotalFriendsList from './ShowTotalFriendsList/ShowTotalFriendsList';
import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';
import { axiosRequest } from '../../functions/axiosRequest'; // axiosRequest는 구조 변경 없이 그대로 사용
import SendSignalPopup from './SendSignalPopup/SendSignalPopup';
import ReceiveSignalPopup from './ReceiveSignalPopup/ReceiveSignalPopup';
import Pending from '../PageManagement/Pending';
import { SignalFrom, Social } from '../../interfaces/Interfaces';
// 이미지 파일
import pleiadesLogo from '../../assets/FriendsTab/pleiadesLogoNoFriends.png';
import backArrow from '../../assets/FriendsTab/backArrow.svg';

import { useQuery, useQueryClient } from '@tanstack/react-query';

// axiosRequest를 이용하여 친구 목록 데이터를 불러오는 함수
const getFriendsList = async (): Promise<Social> => {
  const response = await axiosRequest<Social>("/friends", "GET", null);
  return response ? response : { received: [], friend: [], sent: [] };
};

const FriendsTab: React.FC = () => {
  const navigate = useNavigate();
  // Tanstack Query를 이용해 친구 목록 데이터를 가져오고, 데이터가 없을 경우 기본값 할당
  const { data: friendsData = { received: [], friend: [], sent: [] }, isLoading } = useQuery<Social>({
    queryKey: ["friends"],
    queryFn: getFriendsList,
  });
  // queryClient를 이용해 데이터 변경시 캐시 무효화로 재요청 처리
  const queryClient = useQueryClient();
  
  const { userInfo } = useCharacterStore();
  const userName = userInfo.userName || "플레이아데스";
  
  // 친구 목록이 없는지 여부를 판단하는 state
  const [hasNoFriend, setHasNoFriend] = useState<boolean>(false);
  
  // 시그널 전송 관련 state
  const [signalTo, setSignalTo] = useState<string>("");
  const [signalImageIndex, setSignalImageIndex] = useState<number>(0);
  const [isSendSignalPopupVisible, setIsSendSignalPopupVisible] = useState<boolean>(false);
  
  // 시그널 수신 관련 state
  const [signalsQueue, setSignalsQueue] = useState<SignalFrom[]>([]);
  const [currentSignalIndex, setCurrentSignalIndex] = useState<number>(0);
  const [isReceiveSignalPopupVisible, setIsReceiveSignalPopupVisible] = useState<boolean>(false);
  
  // 시그널 전송 팝업을 여는 함수
  const handleOpenSendSignalPopup = (friendName: string) => {
    setSignalTo(friendName);
    setIsSendSignalPopupVisible(true);
  };
  
  // 시그널 전송 팝업을 닫는 함수
  const handleCloseSendSignalPopup = () => {
    setIsSendSignalPopupVisible(false);
    setSignalTo("");
  };
  
  // 친구 삭제 또는 친구 요청 삭제 함수
  const handleDeleteFriend = async (friendId: string) => {
    const response = await axiosRequest<{ message: string }>(
      `/friends/requests/${friendId}`,
      "DELETE",
      null
    );
    if (response) {
      console.log("친구 삭제 완료. 응답: ", response);
      // 데이터 변경 후 캐시 무효화로 최신 데이터를 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ["friends"]});
    } else {
      console.error("친구 삭제 실패");
    }
  };
  
  // 친구 요청 수락 함수
  const handleAcceptRequest = async (friendId: string) => {
    const response = await axiosRequest<{ message: string }>(
      `/friends/requests/${friendId}`,
      "PATCH",
      { status: "ACCEPTED" }
    );
    if (response) {
      console.log("친구 요청 수락:", response.message);
      queryClient.invalidateQueries({ queryKey: ["friends"]}); // 수락 후 데이터 새로고침
    } else {
      console.error("친구 요청 수락 실패");
    }
  };
  
  // 친구 요청 거절 함수
  const handleRejectRequest = async (friendId: string) => {
    const response = await axiosRequest<{ message: string }>(
      `/friends/requests/${friendId}`,
      "PATCH",
      { status: "REJECTED" }
    );
    if (response) {
      console.log("친구 요청 거절:", response.message);
      queryClient.invalidateQueries({ queryKey: ["friends"]});
    } else {
      console.error("친구 요청 거절 실패");
    }
  };
  
  // 보낸 친구 요청 취소 함수
  const handleDeleteRequest = async (friendId: string) => {
    const response = await axiosRequest<{ message: string }>(
      `/friends/requests/${friendId}`,
      "DELETE",
      null
    );
    if (response) {
      console.log("요청 삭제 완료. 응답 메시지: ", response);
      queryClient.invalidateQueries({ queryKey: ["friends"]});
    } else {
      console.error("친구 요청 취소 실패");
    }
  };
  
  // 친구에게 시그널 보내기 함수 (랜덤 이미지 인덱스 선택)
  const handleSendSignal = async (friendId: string, friendName: string) => {
    const randomIndex = Math.floor(Math.random() * 3); // 0 ~ 2 사이의 랜덤 숫자
    setSignalImageIndex(() => {
      console.log("랜덤 이미지 인덱스 선택:", randomIndex);
      // 시그널 전송 API 호출
      sendSignalRequest(friendId, friendName, randomIndex);
      return randomIndex;
    });
  };
  
  // 시그널 전송 API 호출 함수
  const sendSignalRequest = async (friendId: string, friendName: string, imageIndex: number) => {
    console.log("시그널 전송. 대상:", friendId, "이미지 인덱스:", imageIndex);
    try {
      const response = await axiosRequest<{ message: string }>('/friends/signals', "POST", {
        receiverId: friendId,
        imageIndex: imageIndex,
      });
      if (response) {
        console.log("시그널 전송 응답:", response.message);
        // 성공 또는 이미 전송된 경우 팝업 표시
        if (response.message === "Signal sent successfully" || response.message === "You already sent a signal") {
          handleOpenSendSignalPopup(friendName);
        } else if (response.message === "Invalid or expired token") {
          navigate("/login");
        }
      } else {
        console.error("시그널 전송 실패");
      }
    } catch (error) {
      console.error("시그널 전송 중 오류:", error);
    }
  };
  
  // 시그널 수신 함수 (받은 시그널이 있을 경우 팝업 표시)
  const handleReceiveSignal = async () => {
    try {
      const response = await axiosRequest<{ signals: SignalFrom[] }>('/friends/signals', 'GET', null);
      if (response && response.signals.length > 0) {
        console.log("받은 시그널 목록:", response.signals);
        setSignalsQueue(response.signals);
        setCurrentSignalIndex(0);
        setIsReceiveSignalPopupVisible(true);
      }
    } catch (error) {
      console.error("시그널 수신 실패:", error);
    }
  };
  
  // 현재 표시 중인 시그널 삭제 후 다음 시그널로 넘어가는 함수
  const handleDeleteSignal = async () => {
    if (signalsQueue.length === 0) return;
    const currentSignal = signalsQueue[currentSignalIndex];
    try {
      const response = await axiosRequest<{ message: string }>(
        `/friends/signals/${currentSignal.userId}`,
        "DELETE",
        null
      );
      if (response) {
        console.log("시그널 삭제 완료:", response.message);
        const nextIndex = currentSignalIndex + 1;
        if (nextIndex < signalsQueue.length) {
          setCurrentSignalIndex(nextIndex);
        } else {
          // 모든 시그널 처리 후 팝업 닫기
          setIsReceiveSignalPopupVisible(false);
          setSignalsQueue([]);
        }
      }
    } catch (error) {
      console.error("시그널 삭제 실패:", error);
    }
  };
  
  // friendsData가 변경될 때 친구가 없는지 여부를 판단하여 상태 업데이트
  useEffect(() => {
    if (friendsData && friendsData.friend.length === 0 && friendsData.received.length === 0 && friendsData.sent.length === 0) {
      setHasNoFriend(true);
    } else {
      setHasNoFriend(false);
    }
  }, [friendsData]);
  useEffect(() => {
    handleReceiveSignal();
  }, []);
  
  return (
    <div className={s.container}>
      {isLoading && <Pending />}
      {/* 제목 영역: 뒤로가기 버튼과 사용자 이름 표시 */}
      <div className={s.headContainer}>
        <button className={s.backButton} onClick={() => navigate("/home")}>
          <img src={backArrow} alt="backArrow" />
        </button>
        <div className={s.title}>
          <span className={s.titleName}>{userName}</span>
          <span className={s.titleText}>님의 친구목록</span>
        </div>
      </div>
      {/* 검색창 영역 */}
      <div onClick={() => navigate("/searchusers")} className={s.searchBarContainer}>
        <SearchUsersBar />
      </div>
      {/* 친구 목록 표시 영역 */}
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
      {/* 친구가 없을 경우 안내 메시지와 이미지 표시 */}
      {hasNoFriend && (
        <div className={s.noFriend}>
          <p className={s.noFriendFirstText}>아직 친구가 없어요...</p>
          <p className={s.noFriendSecondText}>ID를 검색해 친구를 추가해 보세요!</p>
          <img src={pleiadesLogo} alt="pleiadesLogo" width={176} />
        </div>
      )}
      {/* 시그널 전송 팝업 */}
      {isSendSignalPopupVisible && (
        <SendSignalPopup
          username={signalTo}
          handleCloseSendSignalPopup={handleCloseSendSignalPopup}
          imageIndex={signalImageIndex}
        />
      )}
      {/* 시그널 수신 팝업 */}
      {isReceiveSignalPopupVisible && signalsQueue.length > 0 && (
        <ReceiveSignalPopup
          username={signalsQueue[currentSignalIndex].userName}
          handleCloseReceiveSignalPopup={handleDeleteSignal}
          imageIndex={signalsQueue[currentSignalIndex].imageIndex}
        />
      )}
    </div>
  );
};

export default FriendsTab;