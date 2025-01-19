import React, { useState } from 'react';
import s from './ShowSearchedUser.module.scss';

// 인터페이스 정의
interface SearchedUserProps {
    id: string;
    name: string;
    profileImage?: string; // 프로필 이미지는 선택 사항으로 설정
    onRequestFriend: (id: string, isCancelRequest: boolean) => void;
    isMyFriend: boolean;
}

const ShowSearchedUser: React.FC<SearchedUserProps> = ({
    id,
    name,
    profileImage,
    onRequestFriend,
    isMyFriend,
}) => {
    const [isRequestSend, setIsRequestSend] = useState(false);
    const [isCompleteRequestPopupVisible, setIsCompleteRequestPopupVisible] = useState(false);

    const showCompleteRequestPopup = () => {
        setIsCompleteRequestPopupVisible(true);
        setTimeout(() => {
            setIsCompleteRequestPopupVisible(false);
          }, 1500);
    };

    const RenderButtons = () => {
        if(isMyFriend) {
            return (
                <button className={s.requestButton}>별 방문</button>
            )
        }else{
            if(isRequestSend) {
                return (
                    <button
                        className={s.cancelRequestButton}
                        onClick={() => {
                            onRequestFriend(id, true);
                            setIsRequestSend(false); }} >
                        요청취소
                    </button>
                )
            } else {
                return (
                    <button
                        className={s.requestButton}
                        onClick={() => {
                            onRequestFriend(id, false);
                            setIsRequestSend(true);
                            showCompleteRequestPopup(); }} >
                        친구요청
                    </button>
                )
            }
        }
    }

    return (
        <div className={s.userContainer}>
            <div className={s.profileSection}>
                <div className={s.profileImageContainer}>
                    <img
                        src={profileImage}
                        alt={`${name}'s profile`}
                        className={s.profileImage}
                    />
                </div>
                <div className={s.userInfo}>
                    <p className={s.userName}>{name}</p>
                    <p className={s.userId}>(@{id})</p>
                </div>
            </div>
            <RenderButtons />
            {isCompleteRequestPopupVisible && (
                <div className={s.completeRequestPopup}>
                    <p className={s.completeRequestPopupTitle}>친구 요청을 완료했어요!</p>
                    <p className={s.completeRequestPopupText}>요청 중인 친구에서 확인할 수 있어요</p>
                </div>
            )}
        </div>
    );
};

export default ShowSearchedUser;