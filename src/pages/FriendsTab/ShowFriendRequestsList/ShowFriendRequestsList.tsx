import React from 'react';
import s from './ShowFriendRequestsList.module.scss';
import { OtherUser } from '../../../interfaces/Interfaces';
import { useToast } from '../../../components/Toast/useToast';

//image files
// import acceptFriendPopupSpacecraft from '../../../assets/FriendsTab/acceptFriendPopupSpacecraft.svg';

interface ShowFriendRequestsListProps {
  otherUser: OtherUser;
  handleAcceptRequest: (friendId: string) => void;
  handleRejectRequest: (friendId: string) => void;
}

const ShowFriendRequestsList: React.FC<ShowFriendRequestsListProps> = ({
  otherUser,
  handleAcceptRequest,
  handleRejectRequest
}) => {
  // const [isAcceptFriendPopupVisible, setIsAcceptFriendPopupVisible] = useState(false);
  // const [isRefuseFriendPopupVisible, setIsRefuseFriendPopupVisible] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const showAcceptFriendPopup = () => {
    showToast(`${otherUser.userName}님과 친구가 되었어요!`, true);
    setTimeout(() => {
      handleAcceptRequest(otherUser.userId);
    }, 1000);
  };
  
  const showRefuseFriendPopup = () => {
    showToast(`${otherUser.userName}님 요청을 거절했어요`);
    setTimeout(() => {
      handleRejectRequest(otherUser.userId);
    }, 1000);
  };
  
  return (
    <div className={s.container}>
      <div className={s.userInfoContainer}>
        {/*============= 프로필 사진 =============*/}
        <div className={s.profileImageContainer}>
          <img src={otherUser.profile} alt={`${otherUser.userName}의 프로필 이미지`} className={s.profileImage} />
        </div>
        {/*============= 이름, ID =============*/}
        <div className={s.nameId}>
          <p>{otherUser.userName}</p>
          <p>@{otherUser.userId}</p>
        </div>
      </div>
      
      {/*============= 버튼 =============*/}
      <div className={s.buttonContainer}>
        <button
          className={s.acceptButton}
          onClick={() => {
            //handleAcceptRequest(otherUser.userId);
            showAcceptFriendPopup();
          }}
        >수락</button>

        <button
          className={s.declineButton}
          onClick={() => {
            // handleRejectRequest(otherUser.userId);
            showRefuseFriendPopup();
          }}
        >거절</button>
      </div>
      {/* {isAcceptFriendPopupVisible && (
          <div className={s.acceptFriendPopup}>
            <img src={acceptFriendPopupSpacecraft} alt='acceptFriendPopupSpacecraft' className={s.acceptFriendPopupSpacecraftUp} />
            {`${otherUser.userName}님과 친구가 되었어요!`}
            <img src={acceptFriendPopupSpacecraft} alt='acceptFriendPopupSpacecraft' className={s.acceptFriendPopupSpacecraftDown} />
          </div>
      )}
      {isRefuseFriendPopupVisible && (
        <div className={s.refuseFriendPopup}>
          {`${otherUser.userName}님 요청을 거절했어요`}
        </div>
      )} */}
      <ToastContainer />
    </div>
  )
}

export default ShowFriendRequestsList;
