import React from 'react';
import s from './AssetBox.module.scss';

import coin from "../../../assets/market/coin.svg";
import stone from "../../../assets/market/stone.svg";

interface AssetBoxProps {
    coinAmount: number;
    stoneAmount: number;
}

const AssetBox: React.FC<AssetBoxProps> = ({ coinAmount, stoneAmount }) => {
    return (
        <div className={s.itemAssets}>
            <div className={s.asset}>
                <img src={coin} alt="코인" />
                <span>{coinAmount}</span>
                <img src={stone} alt="돌맹이" />
                <span>{stoneAmount}</span>
            </div>
        </div>
    );
};

export default AssetBox;