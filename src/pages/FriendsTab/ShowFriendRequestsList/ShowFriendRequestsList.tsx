import React, { useState } from 'react';
import s from './ShowFriendRequestsList.module.scss';
import { OtherUser } from '../../../interfaces/Interfaces';

//image files
import profileImageSmall from '../../../assets/FriendsTab/profileImageSmall.png';
import acceptFriendPopupSpacecraft from '../../../assets/FriendsTab/acceptFriendPopupSpacecraft.svg';

interface ShowFriendRequestsListProps {
    otherUser: OtherUser;
}

const ShowFriendRequestsList: React.FC<ShowFriendRequestsListProps> = ({ otherUser }) => {
  const [isAcceptFriendPopupVisible, setIsAcceptFriendPopupVisible] = useState(false);

  const showAcceptFriendPopup = () => {
    setIsAcceptFriendPopupVisible(true);
    setTimeout(() => {
      setIsAcceptFriendPopupVisible(false);
    }, 1500);
  };
  
  return (
    <div className={s.container}>

      <div className={s.userInfoContainer}>
        {/*============= 프로필 사진 =============*/}
        <div className={s.profileImage}>
          <img src={profileImageSmall} alt="profileImageSmall" width={34} height={34}/>
        </div>
        {/*============= 이름, ID =============*/}
        <div className={s.nameId}>
          <p>{otherUser.Name}</p>
          <p>@{otherUser.Id}</p>
        </div>
      </div>
      
      {/*============= 버튼 =============*/}
      <div className={s.buttonContainer}>
        <button
          className={s.acceptButton}
          onClick={() => {
            showAcceptFriendPopup();
          }}
        >수락</button>

        <button
          className={s.declineButton}
        >거절</button>
      </div>
      {isAcceptFriendPopupVisible && (
        <>
          <img src={acceptFriendPopupSpacecraft} alt='acceptFriendPopupSpacecraft' className={s.acceptFriendPopupSpacecraft} />
          <div className={s.acceptFriendPopup}>
            {`${otherUser.Name} 님과 친구가 되었어요!`}
          </div>
        </>
      )}
    </div>
  )
}

export default ShowFriendRequestsList;
