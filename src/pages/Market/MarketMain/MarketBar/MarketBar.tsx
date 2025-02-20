import s from "./MarketBar.module.scss";
import coinImg from "../../../../assets/market/coin.svg";
import stoneImg from "../../../../assets/market/stone.svg";

interface MarketBarProps {
  coinBalance: number;
  stoneBalance: number;
}

export default function MarketBar({ coinBalance, stoneBalance }: MarketBarProps) {
  return (
    <div className={s.marketBarContainer}>
      <div className={s.assets}>
        <div className={s.item}>
          <img src={coinImg} alt="coin" />
          <p className={s.balance}>{coinBalance}</p>
        </div>
        <div className={s.item}>
          <img src={stoneImg} alt="stone" />
          <p className={s.balance}>{stoneBalance}</p>
        </div>
      </div>
    </div>
  );
}
