import React from 'react';
import s from './StoneBox.module.scss';

import stone from "../../assets/market/stone.svg";

interface StoneBoxProps {
    stoneAmount: number;
}

const StoneBox: React.FC<StoneBoxProps> = ({ stoneAmount }) => {
    return (
        <div className={s.itemAssets}>
            <img className={s.stoneIcon} src={stone} alt="돌맹이" />
            <span className={s.stoneAmount}>{stoneAmount}</span>
        </div>
    );
};

export default StoneBox;