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
            {isRequestSend ? 
            (
                <button
                    className={s.requestButton}
                    onClick={() => {
                        onRequestFriend(id, true);
                        setIsRequestSend(false);
                    }}
                >
                    요청취소
                </button>
            ):(
                <button
                    className={s.requestButton}
                    onClick={() => {
                        onRequestFriend(id, false);
                        setIsRequestSend(true);
                    }}
                >
                    {isMyFriend ? '별 방문':'친구요청'}
                </button>
            )}
            
        </div>
    );
};

export default ShowSearchedUser;