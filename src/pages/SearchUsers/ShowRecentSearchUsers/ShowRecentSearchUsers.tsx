import React from 'react';
import s from './ShowRecentSearchUsers.module.scss';

import recentSearchUserRemove from '../../../assets/SearchUsers/recentSearchUserRemove.svg';

interface RecentSearchUserProps {
  id: string;
  name: string;
  profileImage?: string;
  onRemove: (id: string) => void;
  onClick: (id: string) => void;
}

const ShowRecentSearchUsers: React.FC<RecentSearchUserProps> = ({ id, name, profileImage, onRemove, onClick }) => {
  return (
    <div className={s.userContainer} onClick={() => onClick(id)}>
      {/* 프로필 이미지 */}
      <div className={s.profileImageContainer}>
        <img src={profileImage} alt={`${name}'s profile`} className={s.profileImage} />
      </div>

      {/* 사용자 정보 */}
      <div className={s.userInfo}>
        <p className={s.userName}>{name}</p>
        <p className={s.userId}>@{id}</p>
      </div>

      {/* 삭제 버튼 */}
      <button onClick={(e) => {
        e.stopPropagation(); // 부모 클릭 이벤트 방지
        onRemove(id);
        console.log('Remove button clicked');
      }} className={s.removeButton}>
        <img src={recentSearchUserRemove} alt='remove' />
      </button>
    </div>
  );
};

export default ShowRecentSearchUsers;