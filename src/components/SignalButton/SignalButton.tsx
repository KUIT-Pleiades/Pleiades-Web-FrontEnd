import React, { useState } from 'react';
import s from './SignalButton.module.scss';

import signal from '../../assets/Signal/signalIcon.png';

interface SignalButtonProps {
    onClickSignal: () => void;
}

const SignalButton: React.FC<SignalButtonProps> = ({ onClickSignal }) => {
    const [isSignalPopupVisible, setIsSignalPopupVisible] = useState(false);

    const showSignalPopup = () => {
        setIsSignalPopupVisible(true);
        setTimeout(() => {
            setIsSignalPopupVisible(false);
        }, 1000);
    };

    return (
        <button
            className={`${s.signalButton} ${isSignalPopupVisible ? s.on : ''}`}
            onClick={() => {
                if (!isSignalPopupVisible) { // 연속 클릭 방지
                    showSignalPopup();
                    onClickSignal();
                }
            }}
        >
            <img 
                src={signal} 
                alt="signal" 
                className={s.signalImg} 
            />
        </button>
    );
};

export default SignalButton;
