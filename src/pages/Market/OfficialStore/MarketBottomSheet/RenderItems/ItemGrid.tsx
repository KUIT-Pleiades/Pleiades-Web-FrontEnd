import React from "react";
import s from "../MarketBottomSheet.module.scss";
import stone from "../../../../../assets/market/stone.svg";
import heartBtn from "../../../../../assets/Icon/redHeart.svg";

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

// 컴포넌트가 받을 아이템의 타입을 정의합니다.
// mockData의 아이템 타입과 호환되도록 만듭니다.
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
}

// ItemGrid 컴포넌트가 받을 props 타입을 정의합니다.
interface ItemGridProps {
  items: Item[];
  likedItems: Set<number>;
  onItemSelect: (
    id: number,
    name: string,
    description: string,
    price: number,
    type: string
  ) => void;
  // 배경 아이템은 스타일이 다르므로, className을 props로 받아 유연하게 대처합니다.
  itemClassName?: string;
}

const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  likedItems,
  onItemSelect,
  itemClassName = s.item, // 기본값은 s.item으로 설정
}) => {
  return (
    <div className={s.gridItems}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() =>
            onItemSelect(
              item.id,
              item.name,
              item.description,
              item.price,
              item.type
            )
          }
        >
          <div className={itemClassName}>
            <img src={`${IMG_BASE_URL}${item.name}`} alt={item.name} />
            {likedItems.has(item.id) && (
              <div className={s.heartIconContainer}>
                <img src={heartBtn} alt="liked" />
              </div>
            )}
          </div>
          <div className={s.itemPrice}>
            <img src={stone} alt="stone" />
            {item.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;
