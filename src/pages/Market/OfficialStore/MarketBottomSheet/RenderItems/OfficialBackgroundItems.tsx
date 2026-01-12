import React from "react";
import ItemGrid from "./ItemGrid";
import { useOfficialBackgroundItems } from "../../../../../hooks/queries/useOfficialBackgroundItems";
import s from "../MarketBottomSheet.module.scss";

interface ItemProps {
  activeTheme: string;
  activeSubTab: string;
  onItemSelect: (
    id: number,
    name: string,
    description: string,
    price: number,
    type: string
  ) => void;
  likedItems: Set<number>;
}

const OfficialBackgroundItems: React.FC<ItemProps> = ({
  activeTheme,
  activeSubTab,
  onItemSelect,
  likedItems,
}) => {
  const { data, isLoading, isError, error } = useOfficialBackgroundItems();

  if (isLoading) {
    return <div>공식몰 아이템을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (!data || !data.items || !data.wishlist) {
    return <div>아이템 데이터를 받아오지 못했습니다.</div>;
  }

  const typeMap: { [key: string]: string } = {
    별: "STAR_BG",
    우주정거장: "STATION_BG",
  };

  const filteredItems = data.items.filter((item) => {
    if (activeTheme === "좋아요") {
      return likedItems.has(item.id);
    }
    const themeMatch =
      activeTheme === "추천" || item.theme.includes(activeTheme);
    const typeMatch =
      activeSubTab === "전체" || item.type === typeMap[activeSubTab];
    return themeMatch && typeMatch;
  });

  return (
    <ItemGrid
      items={filteredItems}
      likedItems={likedItems}
      onItemSelect={onItemSelect}
      itemClassName={s.backgroundItem} // 배경 아이템용 스타일 클래스 전달
    />
  );
};

export default OfficialBackgroundItems;
