import React, { useState } from 'react';
import s from './ShowSearchedUser.module.scss';

// image files
import deleteFriendsButton from '../../../../assets/SearchUsers/deleteFriendsButton.svg';

// conponents
import DeleteFriendModal from '../../../../components/DeleteFriendModal/DeleteFriendModal';
import SignalButton from '../../../../components/SignalButton/SignalButton';

// 인터페이스 정의
interface User {
    userId: string;
    userName: string;
    profile: string;
    status: "FRIEND" | "RECEIVED" | "SENT" | "JUSTHUMAN";
}
interface SearchedUserProps {
    user: User;
    handleSendRequestFriend: (friendId: string) => void;
    handleDeleteRequest: (friendId: string, type: "REQUEST" | "FRIEND") => void;
    handleRejectRequest: (friendId: string) => void;
    handleSendSignal: (friendId: string) => void;
    handleAcceptRequest: (friendId: string) => void;
    handleAddSearchHistory: (searchedId: string) => void;
}

const ShowSearchedUser: React.FC<SearchedUserProps> = ({
    user,
    handleSendRequestFriend,
    handleDeleteRequest,
    handleRejectRequest,
    handleAcceptRequest,
    handleSendSignal,
    handleAddSearchHistory,
}) => {
    const [showDeleteFriendButton, setShowDeleteFriendButton] = useState(false);
    const [isDeleteFriendModalOpen, setIsDeleteFriendModalOpen] = useState(false);
    // console.log('showsearchedUser rander. randering: ',user.userName);
    // console.log('user status: ',user.status);

    const renderButton = () => {
        switch (user.status) {
            case "FRIEND":
                return (
                    <div className={s.buttonContainer}>
                        {showDeleteFriendButton ? (
                            <button
                                className={s.showDeleteFriendModalButton}
                                onClick={() => {
                                    setIsDeleteFriendModalOpen(true);
                                    handleAddSearchHistory(user.userId);
                                }}
                            >
                                친구 삭제
                            </button>
                        ) : (
                            <SignalButton
                                onClickSignal={() => {
                                    handleSendSignal(user.userId);
                                    handleAddSearchHistory(user.userId);
                                }}
                                name={user.userName}
                            />
                        )}
                        <button
                            className={s.deleteFriendsButton}
                            onClick={() => setShowDeleteFriendButton(!showDeleteFriendButton)}
                        >
                            <img src={deleteFriendsButton} alt='deleteFriendsButton' />
                        </button>
                    </div>
                );

            case "SENT":
                return (
                    <button
                        className={s.withdrawRequestButton}
                        onClick={() => {
                            handleDeleteRequest(user.userId, "REQUEST");
                            handleAddSearchHistory(user.userId);
                        }}
                    >
                        요청 취소
                    </button>
                );

            case "RECEIVED":
                return (
                    <div className={s.buttonContainer}>
                        <button
                            className={s.acceptRequestButton}
                            onClick={() => {
                                handleAcceptRequest(user.userId);
                                handleAddSearchHistory(user.userId);
                            }}
                        >
                            수락
                        </button>
                        <button
                            className={s.refuseRequestButton}
                            onClick={() => {
                                handleRejectRequest(user.userId);
                                handleAddSearchHistory(user.userId);
                            }}
                        >
                            거절
                        </button>
                    </div>
                );

            case "JUSTHUMAN":
            default:
                return (
                    <button
                        className={s.sendRequestButton}
                        onClick={() => {
                            handleSendRequestFriend(user.userId);
                            handleAddSearchHistory(user.userId);
                        }}
                    >
                        친구 요청
                    </button>
                );
        }
    };

    return (
        <div className={s.userContainer}>
            <div className={s.profileSection}>
                <div className={s.profileImageContainer}>
                    <img src={user.profile} alt={`${user.userName}'s profile`} className={s.profileImage} />
                </div>
                <div className={s.userInfo}>
                    <p className={s.userName}>{user.userName}</p>
                    <p className={s.userId}>@{user.userId}</p>
                </div>
            </div>

            {/* 버튼 UI */}
            {renderButton()}
            {isDeleteFriendModalOpen && (
                <DeleteFriendModal
                    username={user.userName}
                    userId={user.userId}
                    onClose={() => {
                        setIsDeleteFriendModalOpen(false);
                    }}
                    onDelete={() => {
                        handleDeleteRequest(user.userId, "FRIEND");
                    }}
                />
            )}
        </div>
    );
};

export default ShowSearchedUser;