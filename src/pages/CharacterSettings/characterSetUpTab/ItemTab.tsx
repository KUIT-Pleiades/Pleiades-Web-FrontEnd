import { useState, useCallback, useMemo, useEffect } from "react";
import { ItemImages, Item } from "../../../assets/ImageData/ItemImage";
import { useCharacterStore } from "../../../store/useCharacterStore";
import s from "./characterSetUptab.module.scss";
import { imgTabProps } from "./FaceTab";

// 스타일 객체 분리
const imageStyles: { [key: string]: React.CSSProperties } = {
  acc1_01: { transform: "scale(2)", paddingTop: "35%", paddingRight: "40%" },
  fas1_01: { transform: "scale(1.5)", paddingTop: "33%", paddingRight: "20%" },
  fas1_02: { transform: "scale(1.5)", paddingTop: "33%", paddingRight: "20%" },
  acc2_01: { transform: "scale(1.5)", paddingTop: "15%" },
  fas1_03: { transform: "scale(1.5)", paddingTop: "22%" },
  acc1_03: { transform: "scale(1.8)", paddingTop: "30%" },
  acc1_02: { transform: "scale(1.8)", paddingTop: "30%" },
  acc3_01: { transform: "scale(2)", paddingTop: "10%" },
  fas4_01: { transform: "scale(2)", paddingBottom: "40%" },
  acc4_01: { transform: "scale(4)", paddingBottom: "15%" },
  acc5_01: { transform: "scale(5)", paddingBottom: "39%", paddingLeft: "21%" },
  fas6_01: { transform: "scale(2)", paddingBottom: "40%", paddingLeft: "20%" },
};

// 아이템 매핑 객체 분리
const itemMap: { [key: string]: string } = {
  "1": "head",
  "2": "eyes",
  "3": "ears",
  "4": "neck",
  "5": "leftWrist",
  "6": "rightWrist",
  "7": "leftHand",
  "8": "rightHand",
};

const ItemTab = ({ increaseLoadCount }: imgTabProps) => {
  const [itemTab, setItemTab] = useState("전체");
  const [count, setCount] = useState(0);
  const { userInfo, updateUserInfo } = useCharacterStore();

  // 미리 분류된 이미지 캐싱
  const filteredItemImages = useMemo(() => {
    if (itemTab === "전체") {
      return ItemImages;
    }
    return ItemImages.filter((image) => image.tags === itemTab);
  }, [itemTab]);

  useEffect(() => {
    const NUM_OF_IMG = filteredItemImages.length;

    filteredItemImages.forEach(({ src }) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        setCount(count + 1);
        if (count === NUM_OF_IMG) {
          increaseLoadCount();
        }
      };

      img.onerror = () => {
        console.log(`${src} load failed`);
        setCount(count + 1);
        if (count === NUM_OF_IMG) {
          increaseLoadCount();
        }
      };
    });
  }, [count, filteredItemImages, increaseLoadCount]);

  // 아이템 착용 여부 확인 함수
  const isItemEquipped = useCallback(
    (image: Item) => {
      const itemKey = itemMap[image.code];
      if (!itemKey) return false;
      return (
        image.name === userInfo.item[itemKey as keyof typeof userInfo.item]
      );
    },
    [userInfo]
  );

  // 아이템 클릭 핸들러 단순화
  const handleImageClick = useCallback(
    (image: Item) => {
      const itemKey = itemMap[image.code];
      if (!itemKey) return;

      const isEquipped = isItemEquipped(image);

      updateUserInfo({
        item: {
          ...userInfo.item,
          [itemKey]: isEquipped ? "" : image.name, // 객체 대신 직접 문자열 저장
        },
      });
    },
    [userInfo.item, updateUserInfo, isItemEquipped]
  );

  return (
    <div className={s.tabContainer}>
      <div className={s.tab}>
        <button
          onClick={() => setItemTab("전체")}
          className={`${itemTab === "전체" ? s.active : ""}`}
        >
          전체
        </button>
        <button
          onClick={() => setItemTab("acc")}
          className={`${itemTab === "acc" ? s.active : ""}`}
        >
          악세서리
        </button>
        <button
          onClick={() => setItemTab("fas")}
          className={`${itemTab === "fas" ? s.active : ""}`}
        >
          패션
        </button>
        <button
          onClick={() => setItemTab("etc")}
          className={`${itemTab === "etc" ? s.active : ""}`}
        >
          기타
        </button>
      </div>
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {filteredItemImages.map((image) => (
            <div
              key={image.name}
              className={`${s.item} ${isItemEquipped(image) ? s.selected : ""}`}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.src}
                alt={`${image.tags} 이미지`}
                style={imageStyles[image.name] || {}}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemTab;
