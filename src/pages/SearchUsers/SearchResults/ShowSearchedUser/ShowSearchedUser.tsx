import React, { useState } from 'react';
import s from './ShowSearchedUser.module.scss';

// image files
import deleteFriendsButton from '../../../../assets/SearchUsers/deleteFriendsButton.svg';
import DeleteFriendModal from '../../../../components/DeleteFriendModal/DeleteFriendModal';
import SignalButton from '../../../../components/SignalButton/SignalButton';

// 인터페이스 정의
interface SearchedUserProps {
    id: string;
    name: string;
    profileImage?: string;
    isFriend: boolean;
    isRequested: boolean;
    isReceivedRequest: boolean;
    handleSendRequestFriend: (id: string) => void;
    handleWithdrawRequestFriend: (id: string) => void;
    handleRefuseRequestFriend: (id: string) => void;
    handlePoke: (id: string) => void;
    handleDeleteFriend: (id: string) => void;
}

const ShowSearchedUser: React.FC<SearchedUserProps> = ({
    id,
    name,
    profileImage,
    isFriend,
    isRequested,
    isReceivedRequest,
    handleSendRequestFriend,
    handleWithdrawRequestFriend,
    handleRefuseRequestFriend,
    handlePoke,
    handleDeleteFriend,
}) => {
    const [showDeleteFriendButton, setShowDeleteFriendButton] = useState(false);
    const [isDeleteFriendModalOpen, setIsDeleteFriendModalOpen] = useState(false);

    const [isAcceptRequestPopupVisible, setIsAcceptRequestPopupVisible] = useState(false);
    const [isRefuseRequestPopupVisible, setIsRefuseRequestPopupVisible] = useState(false);
    const [isWithdrawRequestPopupVisible, setIsWithdrawRequestPopupVisible] = useState(false);
    const [isSendRequestPopupVisible, setIsSendRequestPopupVisible] = useState(false);

    const showAcceptRequestPopup = () => {
        setIsAcceptRequestPopupVisible(true);
        setTimeout(() => {
            setIsAcceptRequestPopupVisible(false);
        }, 1500);
    };
    const showRefuseRequestPopup = () => {
        setIsRefuseRequestPopupVisible(true);
        setTimeout(() => {
            setIsRefuseRequestPopupVisible(false);
        }, 1500);
    };
    const showWithdrawRequestPopup = () => {
        setIsWithdrawRequestPopupVisible(true);
        setTimeout(() => {
            setIsWithdrawRequestPopupVisible(false);
        }, 1500);
    };
    const showSendRequestPopup = () => {
        setIsSendRequestPopupVisible(true);
        setTimeout(() => {
            setIsSendRequestPopupVisible(false);
        }, 1500);
    };

    const RenderButton = () => {
        if (isFriend) {
            return (
                <div className={s.buttonContainer}>
                    {showDeleteFriendButton ? (
                        <button className={s.showDeleteFriendModalButton} onClick={() => setIsDeleteFriendModalOpen(true)}>
                            친구 삭제
                        </button>
                    ):(
                        <SignalButton
                            onClickSignal={() => handlePoke(id)}
                            name={name}
                        />
                    )}
                    <button
                        className={s.deleteFriendsButton}
                        onClick={() => {
                            setShowDeleteFriendButton(!showDeleteFriendButton);
                        }}
                    >
                        <img src={deleteFriendsButton} alt='deleteFriendsButton' />
                    </button>
                </div>
            )
        } else if (isRequested) {
            return (
                <button
                    className={s.withdrawRequestButton}
                    onClick={() => {
                        handleWithdrawRequestFriend(id);
                        showWithdrawRequestPopup();
                    }}
                >
                    요청 취소
                </button>
            );
        } else if (isReceivedRequest) {
            return (
                <div className={s.buttonContainer}>
                    <button
                        className={s.acceptRequestButton}
                        onClick={() => {
                            handleSendRequestFriend(id);
                            showAcceptRequestPopup();
                        }}
                    >
                        수락
                    </button>
                    <button
                        className={s.refuseRequestButton}
                        onClick={() => {
                            handleRefuseRequestFriend(id);
                            showRefuseRequestPopup();
                        }}
                    >
                        거절
                    </button>
                </div>
            );
        } else {
            return (
                <button
                    className={s.sendRequestButton}
                    onClick={() => {
                        handleSendRequestFriend(id);
                        showSendRequestPopup();
                    }}
                >
                    친구 요청
                </button>
            );
        }
    }

    return (
        <div className={s.userContainer}>
            <div className={s.profileSection}>
                <div className={s.profileImageContainer}>
                    <img src={profileImage} alt={`${name}'s profile`} className={s.profileImage} />
                </div>
                <div className={s.userInfo}>
                    <p className={s.userName}>{name}</p>
                    <p className={s.userId}>@{id}</p>
                </div>
            </div>

            {/* 버튼 UI */}
            <RenderButton />
            {isDeleteFriendModalOpen && (
                <DeleteFriendModal
                    username={name}
                    userId={id}
                    onClose={() => setIsDeleteFriendModalOpen(false)}
                    onDelete={handleDeleteFriend}
                />
            )}
            {isAcceptRequestPopupVisible && (
                <div className={s.popupAccept}>
                    <span className={s.popupTitle}>{name}님과 친구가 되었어요!</span>
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
};

export default ShowSearchedUser;