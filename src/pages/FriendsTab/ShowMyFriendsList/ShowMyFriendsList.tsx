import React, { useState } from 'react';
import s from './ShowMyFriendsList.module.scss';
import { OtherUser } from '../../../interfaces/Interfaces';

// components
import VisitStationModal from '../VisitStationModal/VisitStationModal';
//import DeleteFriendModal from ...

//image files
import profileImageSmall from '../../../assets/FriendsTab/profileImageSmall.png';
import goStationSmall from '../../../assets/FriendsTab/goStationSmall.svg';
import poke from '../../../assets/FriendsTab/poke.svg';
import pokePopupStars from '../../../assets/FriendsTab/pokePopupStars.svg';
import deleteFriendsButton from '../../../assets/FriendsTab/deleteFriendsButton.svg';
import DeleteFriendModal from '../DeleteFriendModal/DeleteFriendModal';

interface ShowMyFriendsListProps {
    otherUser: OtherUser;
    handleDeleteFriend: () => void;
}

const ShowMyFriendsList: React.FC<ShowMyFriendsListProps> = ({ otherUser, handleDeleteFriend }) => {
  const [isVisitStationModalOpen, setIsVisitStationModalOpen] = useState(false);
  const [isDeleteFriendModalOpen, setIsDeleteFriendModalOpen] = useState(false);
  const [isPokePopupVisible, setIsPokePopupVisible] = useState(false);

    const handleOpenVisitStationModal = () => setIsVisitStationModalOpen(true);
    const handleCloseVisitStationModal = () => setIsVisitStationModalOpen(false);
    const handleConfirm = () => {
        //console.log("네! 갈래요 선택");
        handleCloseVisitStationModal();
    };
    const handleCancel = () => {
        //console.log("안 갈래요 선택");
        handleCloseVisitStationModal();
    };

    const handleOpenDeleteFriendModal = () => setIsDeleteFriendModalOpen(true);
    const handleCloseDeleteFriendModal = () => setIsDeleteFriendModalOpen(false);
    const handleDelete = () => {
      handleDeleteFriend();
      handleCloseDeleteFriendModal();
    };
    const handleDeleteCancel = () => {
      //console.log("안 갈래요 선택");
      handleCloseDeleteFriendModal();
    };

    const showPokePopup = () => {
      setIsPokePopupVisible(true);
      setTimeout(() => {
        setIsPokePopupVisible(false);
      }, 1500);
    };

  return (
    <div className={s.container}>

      <div className={s.userInfoContainer}>
        {/*============= 프로필 사진 =============*/}
        <div className={s.profileImage}>
          <img src={profileImageSmall} alt="profileImageSmall" width={34} />
        </div>
        {/*============= 이름, ID =============*/}
        <div className={s.nameId}>
          <p>{otherUser.Name}</p>
          <p>@{otherUser.Id}</p>
        </div>
      </div>
      {/*============= 버튼 =============*/}
      <div className={s.buttonContainer}>
        <button className={s.goStationButton} onClick={handleOpenVisitStationModal}>
          <img src={goStationSmall} alt="goStationSmall" />
        </button>
        <button className={s.pokeButton} onClick={showPokePopup}>
          <img src={poke} alt="poke" />
        </button>
        <button className={s.deleteFriendsButton} onClick={handleOpenDeleteFriendModal}>
          <img src={deleteFriendsButton} alt='deleteFriendsButton' />
        </button>
      </div>
      {isVisitStationModalOpen && (
        <VisitStationModal
          username={otherUser.Name}
          userId={otherUser.Id}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleCloseVisitStationModal}
        />
      )}
      {isDeleteFriendModalOpen && (
        <DeleteFriendModal
          username={otherUser.Name}
          onClose={handleDeleteCancel}
          onDelete={handleDelete}
        />
      )}
      {isPokePopupVisible && (
        <>
          <img src={pokePopupStars} alt='pokePopupStars' className={s.pokePopupStars} />
          <div className={s.pokePopup}>
            {`${otherUser.Name} 님을 쿡 찔렀어요!`}
          </div>
        </>
      )}
    </div>
  )
}

export default ShowMyFriendsList;
