// File: src/components/Toast/Toast.tsx
import React from 'react';
import s from './Toast.module.scss';
// [add] acceptFriendPopupSpacecraft 아이콘 임포트
import acceptFriendPopupSpacecraft from '../../assets/FriendsTab/acceptFriendPopupSpacecraft.svg';

// [add] showIcon, width prop 추가
interface ToastProps {
    message: string;
    showIcon?: boolean;
    width?: string;
}

const Toast: React.FC<ToastProps> = ({ message, showIcon = false, width = "72%" }) => {
    return (
        <div className={s.toastRoot} style={{ width }}>
            <div className={s.toastBody}>
                {showIcon && (
                    <img
                        src={acceptFriendPopupSpacecraft}
                        alt="acceptFriendPopupSpacecraft"
                        className={s.toastIconUp}
                    />
                )}
                {message}
                {showIcon && (
                    <img
                        src={acceptFriendPopupSpacecraft}
                        alt="acceptFriendPopupSpacecraft"
                        className={s.toastIconDown}
                    />
                )}
            </div>
        </div>
    );
};

export default Toast;