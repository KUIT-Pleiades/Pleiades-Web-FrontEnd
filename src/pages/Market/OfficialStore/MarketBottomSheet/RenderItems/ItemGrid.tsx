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

// 할인율 계산
const calculateDiscountRate = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice === 0) return 0;
  const rate = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.floor(rate);
};

interface Item {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  discounted_price?: number;
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

// 타입에 따른 아이템 스타일 클래스 반환
const getItemClassName = (type: string, customClassName?: string): string => {
  if (customClassName) return customClassName;
  const backgroundTypes = ["STAR_BG", "STATION_BG"];
  if (backgroundTypes.includes(type)) return s.backgroundItem;
  return s.item;
};

const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  likedItems,
  onItemSelect,
  itemClassName,
}) => {
  return (
    <div className={s.gridItems}>
      {items.map((item) => {
        const discountRate = item.discounted_price
          ? calculateDiscountRate(item.price, item.discounted_price)
          : 0;

        return (
          <div
            key={item.id}
            className={s.itemWrapper}
            onClick={() =>
              onItemSelect(
                item.id,
                item.name,
                item.description,
                item.discounted_price ?? item.price,
                item.type
              )
            }
          >
            {discountRate > 0 && (
              <div className={s.discountBadge}>{discountRate}%</div>
            )}
            <div className={getItemClassName(item.type, itemClassName)}>
              <img src={`${IMG_BASE_URL}${getThumbnailPath(item.name, item.type)}`} alt={item.name} />
              {likedItems.has(item.id) && (
                <div className={s.heartIconContainer}>
                  <img src={heartIcon} alt="liked" />
                </div>
              )}
            </div>
            <div className={s.itemPrice}>
              <img src={stoneIcon} alt="stone" />
              {item.discounted_price ?? item.price}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemGrid;
