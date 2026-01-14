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
        <>
            {isSignalPopupVisible ? (
            <button className={s.onSignalButton}>
                <img src={signal} alt="onSignal" className={s.signalImg} />
            </button>
            ) : (
            <button
                className={s.signalButton}
                onClick={() => {
                showSignalPopup();
                onClickSignal();
                }}
            >
                <img src={signal} alt="signal" className={s.signalImg} />
            </button>
            )}
        </>
    )
}

export default SignalButton;
