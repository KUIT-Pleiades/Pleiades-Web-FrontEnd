import React, { useState } from 'react';
import s from './ShowMyFriendsList.module.scss';
import { OtherUser } from '../../../../interfaces/Interfaces';

import profileImageSmall from '../../../../assets/profileImageSmall.png';
import goStationSmall from '../../../../assets/goStationSmall.svg';
import poke from '../../../../assets/poke.svg';
import pokePopupStars from '../../../../assets/pokePopupStars.svg';

import VisitStationModal from '../VisitStationModal/VisitStationModal';

interface ShowMyFriendsListProps {
    otherUser: OtherUser;
}

const ShowMyFriendsList: React.FC<ShowMyFriendsListProps> = ({ otherUser }) => {
  const [isVisitStationModalOpen, setIsVisitStationModalOpen] = useState(false);
  const [isPokePopupVisible, setIsPokePopupVisible] = useState(false);

    const handleOpenModal = () => setIsVisitStationModalOpen(true);
    const handleCloseModal = () => setIsVisitStationModalOpen(false);
    const handleConfirm = () => {
        console.log("네! 갈래요 선택");
        handleCloseModal();
    };
    const handleCancel = () => {
        console.log("안 갈래요 선택");
        handleCloseModal();
    };

    const showPokePopup = () => {
      setIsPokePopupVisible(true);
      setTimeout(() => {
        setIsPokePopupVisible(false);
      }, 1500000000);
    };

  return (
    <div className={s.container}>
      <div className={s.profileImage}>
        <img src={profileImageSmall} alt="profileImageSmall" />
      </div>
      <div className={s.nameId}>
        <p>{otherUser.Name}</p>
        <p>@{otherUser.Id}</p>
      </div>
      <div className={s.buttonContainer}>
        <button className={s.goStationButton} onClick={handleOpenModal}>
          <img src={goStationSmall} alt="goStationSmall" />
        </button>
        <button className={s.pokeButton} onClick={showPokePopup}>
          <img src={poke} alt="poke" />
        </button>
      </div>
      {isVisitStationModalOpen && (
        <VisitStationModal
          username={otherUser.Name}
          userId={otherUser.Id}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleCloseModal}
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
