import React from "react";
import s from "../MarketBottomSheet.module.scss";
import stoneIcon from "../../../../../assets/market/stone.svg";
import heartIcon from "../../../../../assets/Icon/redHeart.svg";

const IMG_BASE_URL: string = import.meta.env.VITE_IMG_BASE_URL;

// 타입에 따른 폴더 경로 반환
const getCategoryFolder = (type: string): string => {
  const faceTypes = ["HAIR", "EYES", "NOSE", "MOUTH", "MOLE"];
  const backgroundTypes = ["STAR_BG", "STATION_BG"];

  if (faceTypes.includes(type)) return "face";
  if (backgroundTypes.includes(type)) return "background";
  return "fashion";
};

// 썸네일 경로 생성
const getThumbnailPath = (name: string, type: string): string => {
  const folder = getCategoryFolder(type);
  return `${folder}/thumbnails/rec_${name}`;
};

interface Item {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
}

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
  itemClassName?: string;
}

const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  likedItems,
  onItemSelect,
  itemClassName = s.item,
}) => {
  return (
    <div className={s.gridItems}>
      {items.map((item) => (
        <div
          key={item.id}
          // 2. onClick에서 onItemSelect 호출 시 모든 인자를 전달하도록 수정합니다.
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
            <img src={`${IMG_BASE_URL}${getThumbnailPath(item.name, item.type)}`} alt={item.name} />
            {likedItems.has(item.id) && (
              <div className={s.heartIconContainer}>
                <img src={heartIcon} alt="liked" />
              </div>
            )}
          </div>
          <div className={s.itemPrice}>
            <img src={stoneIcon} alt="stone" />
            {item.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;
