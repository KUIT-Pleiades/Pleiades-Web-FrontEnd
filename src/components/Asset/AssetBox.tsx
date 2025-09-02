import React from 'react';
import s from './AssetBox.module.scss';

import coin from "../../assets/market/coin.svg";
import stone from "../../assets/market/stone.svg";

interface AssetBoxProps {
    coinAmount: number;
    stoneAmount: number;
}

const AssetBox: React.FC<AssetBoxProps> = ({ coinAmount, stoneAmount }) => {
    return (
        <div className={s.itemAssets}>
            <img className={s.coinIcon} src={coin} alt="코인" />
            <span className={s.coinAmount}>{coinAmount}</span>
            <img className={s.stoneIcon} src={stone} alt="돌맹이" />
            <span className={s.stoneAmount}>{stoneAmount}</span>
        </div>
    );
};

export default AssetBox;