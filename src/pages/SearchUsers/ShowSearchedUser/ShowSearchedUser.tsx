import React from 'react';
import s from './ShowSearchedUser.module.scss';

// 인터페이스 정의
interface SearchedUserProps {
    id: string;
    name: string;
    profileImage?: string;
    isFriend: boolean;
    isRequested: boolean;
    isReceivedRequest: boolean;
    onRequestFriend: (id: string, isCancelRequest: boolean) => void;
}

const ShowSearchedUser: React.FC<SearchedUserProps> = ({
    id,
    name,
    profileImage,
    isFriend,
    isRequested,
    isReceivedRequest,
    onRequestFriend
}) => {
    // const [isRequestSend, setIsRequestSend] = useState(false);
    // const [isCompleteRequestPopupVisible, setIsCompleteRequestPopupVisible] = useState(false);

    // const showCompleteRequestPopup = () => {
    //     setIsCompleteRequestPopupVisible(true);
    //     setTimeout(() => {
    //         setIsCompleteRequestPopupVisible(false);
    //       }, 1500);
    // };

    // const RenderButtons = () => {
    //     if(isMyFriend) {
    //         return (
    //             <button className={s.requestButton}>별 방문</button>
    //         )
    //     }else{
    //         if(isRequestSend) {
    //             return (
    //                 <button
    //                     className={s.cancelRequestButton}
    //                     onClick={() => {
    //                         onRequestFriend(id, true);
    //                         setIsRequestSend(false); }} >
    //                     요청취소
    //                 </button>
    //             )
    //         } else {
    //             return (
    //                 <button
    //                     className={s.requestButton}
    //                     onClick={() => {
    //                         onRequestFriend(id, false);
    //                         setIsRequestSend(true);
    //                         showCompleteRequestPopup(); }} >
    //                     친구요청
    //                 </button>
    //             )
    //         }
    //     }
    // }

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
            {isFriend ? ( // 친구인 경우
                <button className={s.visitStarButton}>
                    별 방문
                </button>
            ) : isRequested ? ( // 내가 요청 보낸 경우
                <button className={s.cancelRequestButton} onClick={() => onRequestFriend(id, true)}>
                    요청 취소
                </button>
            ) : isReceivedRequest ? ( // 상대방이 요청 보낸 경우
                <button className={s.acceptRequestButton} onClick={() => onRequestFriend(id, false)}>
                    친구 요청 수락
                </button>
            ) : ( // 아무 관계 아닌 경우
                <button className={s.requestButton} onClick={() => onRequestFriend(id, false)}>
                    친구 요청
                </button>
            )}
        </div>
        // <div className={s.userContainer}>
        //     <div className={s.profileSection}>
        //         <div className={s.profileImageContainer}>
        //             <img
        //                 src={profileImage}
        //                 alt={`${name}'s profile`}
        //                 className={s.profileImage}
        //             />
        //         </div>
        //         <div className={s.userInfo}>
        //             <p className={s.userName}>{name}</p>
        //             <p className={s.userId}>(@{id})</p>
        //         </div>
        //     </div>
        //     <RenderButtons />
        //     {isCompleteRequestPopupVisible && (
        //         <div className={s.completeRequestPopup}>
        //             <p className={s.completeRequestPopupTitle}>친구 요청을 완료했어요!</p>
        //             <p className={s.completeRequestPopupText}>요청 중인 친구에서 확인할 수 있어요</p>
        //         </div>
        //     )}
        // </div>
    );
};

export default ShowSearchedUser;