import React, { useState } from 'react';
import s from './ShowMyFriendsList.module.scss';
import { OtherUser } from '../../../interfaces/Interfaces';

// components
import DeleteFriendModal from '../DeleteFriendModal/DeleteFriendModal';

//image files
import profileImageSmall from '../../../assets/FriendsTab/profileImageSmall.png';
import poke from '../../../assets/FriendsTab/poke.svg';
import onPoke from '../../../assets/FriendsTab/onPoke.svg';
import pokePopupStars from '../../../assets/FriendsTab/pokePopupStars.svg';
import deleteFriendsButton from '../../../assets/FriendsTab/deleteFriendsButton.svg';

interface ShowMyFriendsListProps {
    otherUser: OtherUser;
    handleDeleteFriend: () => void;
    onActionFriendId: string;
    setOnActionFriendId: (friendId: string) => void;
}

const ShowMyFriendsList: React.FC<ShowMyFriendsListProps> = ({ otherUser, handleDeleteFriend, onActionFriendId, setOnActionFriendId }) => {
  const [isDeleteFriendModalOpen, setIsDeleteFriendModalOpen] = useState(false);
  const [isPokePopupVisible, setIsPokePopupVisible] = useState(false);

  const handleGoStation = () => {
    //go to station
  }

  const handleOpenDeleteFriendModal = () => setIsDeleteFriendModalOpen(true);
  const handleCloseDeleteFriendModal = () => setIsDeleteFriendModalOpen(false);
  const handleDelete = () => {
    handleDeleteFriend();
    handleCloseDeleteFriendModal();
    setOnActionFriendId("");
  };
  const handleDeleteCancel = () => {
    handleCloseDeleteFriendModal();
    setOnActionFriendId("");
  };

  const showPokePopup = () => {
    setIsPokePopupVisible(true);
    setTimeout(() => {
      setIsPokePopupVisible(false);
      setOnActionFriendId("");
    }, 1500);
  };

  const RenderButtons = () => {
    if (onActionFriendId === otherUser.Id && !isPokePopupVisible) {
      return (
        <button
          className={s.showDeleteFriendModalButton}
          onClick={handleOpenDeleteFriendModal}
        >친구 삭제</button>
      );
    }
    return (
      <>
        {isPokePopupVisible ? (
          <button className={s.onPokeButton}>
            <img src={onPoke} alt="onPoke" className={s.pokeImg} />
          </button>
        ) : (
          <button
            className={s.pokeButton}
            onClick={() => {
              showPokePopup();
              setOnActionFriendId(otherUser.Id);
            }}
          >
            <img src={poke} alt="poke" className={s.pokeImg} />
          </button>
        )}
      </>
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
            setOnActionFriendId(otherUser.Id);
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
      {isPokePopupVisible && (
        <div className={s.pokePopup}>
          <img src={pokePopupStars} alt='pokePopupStars' className={s.pokePopupStarsUp} />
          {`${otherUser.Name}님을 쿡 찔렀어요!`}
          <img src={pokePopupStars} alt='pokePopupStars' className={s.pokePopupStarsDown} />
        </div>
      )}
    </div>
  )
}

export default ShowMyFriendsList;
