import React, { useState } from 'react';
import s from './SignalButton.module.scss';

import signal from '../../assets/Signal/signal.svg';
import onSignal from '../../assets/Signal/onSignal.svg';
import signalPopupStars from '../../assets/Signal/signalPopupStars.svg';

interface SignalButtonProps {
    onClickSignal: () => void;
    name: string;
}

const SignalButton: React.FC<SignalButtonProps> = ({onClickSignal, name}) => {
    const [isSignalPopupVisible, setIsSignalPopupVisible] = useState(false);
    const showSignalPopup = () => {
        setIsSignalPopupVisible(true);
        setTimeout(() => {
            setIsSignalPopupVisible(false);
        }, 1500);
    };

    return (
        <>
            {isSignalPopupVisible ? (
            <button className={s.onSignalButton}>
                <img src={onSignal} alt="onSignal" className={s.signalImg} />
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
            {isSignalPopupVisible && (
                <div className={s.signalPopup}>
                    <img src={signalPopupStars} alt='signalPopupStars' className={s.signalPopupStarsUp} />
                    {`${name}님을 쿡 찔렀어요!`}
                    <img src={signalPopupStars} alt='signalPopupStars' className={s.signalPopupStarsDown} />
                </div>
            )}
        </>
    )
}

export default SignalButton
