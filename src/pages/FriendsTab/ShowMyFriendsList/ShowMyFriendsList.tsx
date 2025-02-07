import React, { useState } from 'react';
import s from './ShowMyFriendsList.module.scss';
import { OtherUser } from '../../../interfaces/Interfaces';

// components
import DeleteFriendModal from '../../../components/DeleteFriendModal/DeleteFriendModal';

//image files
import profileImageSmall from '../../../assets/FriendsTab/profileImageSmall.png';
import deleteFriendsButton from '../../../assets/FriendsTab/deleteFriendsButton.svg';
import SignalButton from '../../../components/SignalButton/SignalButton';

interface ShowMyFriendsListProps {
    otherUser: OtherUser;
    handleDeleteFriend: (id: string) => void;
    onActionFriendId: string;
    setOnActionFriendId: (friendId: string) => void;
}

const ShowMyFriendsList: React.FC<ShowMyFriendsListProps> = ({ otherUser, handleDeleteFriend, onActionFriendId, setOnActionFriendId }) => {
  const [isDeleteFriendModalOpen, setIsDeleteFriendModalOpen] = useState(false);

  const handleGoStation = () => {
    //go to station
  }

  const handleOpenDeleteFriendModal = () => setIsDeleteFriendModalOpen(true);
  const handleCloseDeleteFriendModal = () => setIsDeleteFriendModalOpen(false);
  const handleDelete = (id: string) => {
    handleDeleteFriend(id);
    handleCloseDeleteFriendModal();
    setOnActionFriendId("");
  };
  const handleDeleteCancel = () => {
    handleCloseDeleteFriendModal();
    setOnActionFriendId("");
  };

  const handleSignal = (id: string) => {
    console.log('signal', id);
  };

  const RenderButtons = () => {
    if (onActionFriendId === otherUser.Id) {
      return (
        <button
          className={s.showDeleteFriendModalButton}
          onClick={handleOpenDeleteFriendModal}
        >친구 삭제</button>
      );
    }
    return (
      <SignalButton
        onClickSignal={() => handleSignal(otherUser.Id)}
        name={otherUser.Name}
      />
    );
  };

  return (
    <div className={s.container}>

      <div
        className={s.userInfoContainer}
        onClick={handleGoStation}
      >
        {/*============= 프로필 사진 =============*/}
        <div className={s.profileImage}>
          <img src={profileImageSmall} alt="profileImageSmall" />
        </div>
        {/*============= 이름, ID =============*/}
        <div className={s.nameId}>
          <p>{otherUser.Name}</p>
          <p>@{otherUser.Id}</p>
        </div>
      </div>
      <div className={s.emptySpace} onClick={handleGoStation} />
      {/*============= 버튼 =============*/}
      <div className={s.buttonContainer}>
        
        <RenderButtons />

        <button
          className={s.deleteFriendsButton}
          onClick={() => {
            if (onActionFriendId === otherUser.Id) {
              setOnActionFriendId("");
            }else{
              setOnActionFriendId(otherUser.Id);
            }
          }}>
          <img src={deleteFriendsButton} alt='deleteFriendsButton' />
        </button>
      </div>
      {isDeleteFriendModalOpen && (
        <DeleteFriendModal
          username={otherUser.Name}
          userId={otherUser.Id}
          onClose={handleDeleteCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default ShowMyFriendsList;
