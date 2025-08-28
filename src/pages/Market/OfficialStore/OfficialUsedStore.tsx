import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../../../store/useCharacterStore";
import s from "./OfficialUsedStore.module.scss";
import MarketBottomSheet from "./MarketBottomSheet/MarketBottomSheet";
import characterBackground from "../../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../../assets/btnImg/resetBtn.svg";
import addBagBtn from "../../../assets/btnImg/addBagBtn.svg";
import heartBtn from "../../../assets/btnImg/heartBtn.svg";
import redHeartBtn from "../../../assets/btnImg/redHeartBtn.svg";
import backBtn from "../../../assets/btnImg/backBtn.png";
import coin from "../../../assets/market/coin.svg";
import stone from "../../../assets/market/stone.svg";
import { UserInfo } from "../../../interfaces/Interfaces";
import AddToCartModal from "../../../modals/AddToCartModal/AddToCartModal";

// 일반 아이콘
import faceIcon from "../../../assets/market/face.svg";
import clothIcon from "../../../assets/market/cloth.svg";
import backgroundIcon from "../../../assets/market/background.svg";

// 흰색 아이콘
import faceWhiteIcon from "../../../assets/market/face_white.svg";
import clothWhiteIcon from "../../../assets/market/cloth_white.svg";
import backgroundWhiteIcon from "../../../assets/market/background_white.svg";

export type CategoryType = "face" | "cloth" | "background";

export default function OfficialUsedStore() {
  const [activeTab, setActiveTab] = useState("official");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("face");
  const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);
  const [likedItems, setLikedItems] = useState(new Set<number>());
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { userInfo } = useCharacterStore();
  const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

  const [initialUserInfo] = useState<UserInfo>(() => structuredClone(userInfo)); // 초기 상태값을 복사하여 사용

  // 미리보기 상태 (캐릭터 프리뷰용)
  const [tryOnUserInfo, setTryOnUserInfo] = useState<UserInfo>(() =>
    structuredClone(userInfo)
  );

  const isWearingSet = !!tryOnUserInfo.outfit.set;

  const [selectedItem, setSelectedItem] = useState<{
    id: number | null;
    name: string;
    description: string;
    price: number;
    type: string;
  }>({
    id: null,
    name: "",
    description: "",
    price: 0,
    type: "",
  });

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
  };

  const handleItemSelect = (
    id: number,
    name: string,
    description: string,
    price: number,
    type: string
  ) => {
    setSelectedItem({ id, name, description, price, type });

    setTryOnUserInfo((prev) => {
      const newState = structuredClone(prev);

      switch (type) {
        // 얼굴 아이템
        case "HAIR":
          newState.face.hair = name;
          break;
        case "EYES": // 얼굴 파츠 '눈'
          newState.face.eyes = name;
          break;
        case "NOSE":
          newState.face.nose = name;
          break;
        case "MOUTH":
          newState.face.mouth = name;
          break;
        case "MOLE":
          newState.face.mole = name;
          break;

        // 의상 아이템
        case "TOP":
          newState.outfit.top = name;
          newState.outfit.set = "";
          // 👇 직전에 세트 의상을 입고 있었는지 확인
          if (prev.outfit.set) {
            // 세트를 입고 있었다면 -> 초기 하의로 복구
            newState.outfit.bottom = initialUserInfo.outfit.bottom;
          }
          // 세트를 안 입고 있었다면 -> 기존 하의를 그대로 유지 (아무것도 안 함)
          break;
        case "BOTTOM":
          newState.outfit.bottom = name;
          newState.outfit.set = "";
          // 👇 직전에 세트 의상을 입고 있었는지 확인
          if (prev.outfit.set) {
            // 세트를 입고 있었다면 -> 초기 상의로 복구
            newState.outfit.top = initialUserInfo.outfit.top;
          }
          // 세트를 안 입고 있었다면 -> 기존 상의를 그대로 유지 (아무것도 안 함)
          break;
        case "SET":
          newState.outfit.set = name;
          newState.outfit.top = "";
          newState.outfit.bottom = "";
          break;
        case "SHOES":
          newState.outfit.shoes = name;
          break;

        // 악세서리 아이템
        case "EYESITEM": // ✨ 악세서리 '눈' 아이템 처리
          newState.item.eyes_item = name;
          break;
        case "EARS":
          newState.item.ears = name;
          break;
        case "HEAD":
          newState.item.head = name;
          break;
        case "NECK":
          newState.item.neck = name;
          break;
        case "LEFTWRIST":
          newState.item.leftWrist = name;
          break;
        case "RIGHTWRIST":
          newState.item.rightWrist = name;
          break;
        case "LEFTHAND":
          newState.item.leftHand = name;
          break;
        case "RIGHTHAND":
          newState.item.rightHand = name;
          break;

        // 배경 아이템
        case "STARBACKGROUND":
        case "STATIONBACKGROUND":
          newState.starBackground = name;
          break;
      }

      return newState;
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (activeCategory !== "background") {
      setIsSheetCollapsed(false);
    }
  }, [activeCategory]);

  const handleContentClick = () => {
    if (activeCategory === "background") {
      setIsSheetCollapsed(!isSheetCollapsed);
    }
  };

  const handleReset = () => {
    setTryOnUserInfo(structuredClone(initialUserInfo));
    setSelectedItem({
      id: null,
      name: "",
      description: "",
      price: 0,
      type: "",
    });
  };

  const handleAddToCartClick = () => {
    if (selectedItem.id !== null) {
      setCartModalOpen(true);
    }
  };

  const handleConfirmAddToCart = () => {
    // Add item to cart logic here
    console.log("Item added to cart:", selectedItem);
    setCartModalOpen(false);
  };

  return (
    <div className={s.container}>
      {isCartModalOpen && (
        <AddToCartModal
          item={selectedItem}
          onConfirm={handleConfirmAddToCart}
          onCancel={() => setCartModalOpen(false)}
        />
      )}
      <div className={s.header}>
        <button className={s.backButton} onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </button>
        <div className={s.tabGroup}>
          <button
            onClick={() => setActiveTab("official")}
            className={activeTab === "official" ? s.active : ""}
          >
            공식몰
          </button>
          <button
            onClick={() => setActiveTab("used")}
            className={activeTab === "used" ? s.active : ""}
          >
            중고몰
          </button>
        </div>
      </div>
      <div
        className={s.content}
        style={{
          height: isSheetCollapsed ? "91dvh" : "",
          backgroundImage:
            activeCategory === "background" && tryOnUserInfo.starBackground
              ? `url(${IMG_BASE_URL}${tryOnUserInfo.starBackground})`
              : "none", // 배경 이미지가 없을 때는 'none'으로 설정
        }}
      >
        <div className={s.itemInfoBar}>
          <div
            className={s.itemName}
            style={{
              visibility: selectedItem.description ? "visible" : "hidden",
            }}
          >
            <p>{selectedItem.description}</p>
          </div>

          <div className={s.itemAssets}>
            <div className={s.asset}>
              <img src={coin} alt="코인" />
              <span>5</span>
              <img src={stone} alt="돌맹이" />
              <span>312</span>
            </div>
          </div>
        </div>
        <div className={s.characterContainer} onClick={handleContentClick}>
          <img
            className={s.characterBackground}
            src={characterBackground}
            alt="캐릭터후광"
          />
          <img
            className={s.characterSkin}
            src={`${IMG_BASE_URL}${tryOnUserInfo.face.skinColor}`}
            alt="skin"
          />
          <img
            className={s.characterEyes}
            src={`${IMG_BASE_URL}${tryOnUserInfo.face.eyes}`}
            alt="eyes"
          />
          <img
            className={s.characterNose}
            src={`${IMG_BASE_URL}${tryOnUserInfo.face.nose}`}
            alt="nose"
          />
          <img
            className={s.characterMouth}
            src={`${IMG_BASE_URL}${tryOnUserInfo.face.mouth}`}
            alt="mouth"
          />
          {userInfo.face.mole && (
            <img
              className={s.characterMole}
              src={`${IMG_BASE_URL}${tryOnUserInfo.face.mole}`}
              alt="mole"
            />
          )}
          <img
            className={s.characterHair}
            src={`${IMG_BASE_URL}${tryOnUserInfo.face.hair}`}
            alt="hair"
          />
          {!isWearingSet && (
            <>
              <img
                className={s.characterTop}
                src={`${IMG_BASE_URL}${tryOnUserInfo.outfit.top}`}
                alt="top"
              />
              <img
                className={s.characterBottom}
                src={`${IMG_BASE_URL}${tryOnUserInfo.outfit.bottom}`}
                alt="bottom"
              />
            </>
          )}
          {isWearingSet && (
            <img
              className={s.characterSet}
              src={`${IMG_BASE_URL}${tryOnUserInfo.outfit.set}`}
              alt="set"
            />
          )}
          <img
            className={s.characterShoes}
            src={`${IMG_BASE_URL}${tryOnUserInfo.outfit.shoes}`}
            alt="shoes"
          />
          {Object.entries(tryOnUserInfo.item).map(([part, src]) => {
            if (!src) return null;
            return (
              <img
                key={part}
                className={s[part]}
                src={`${IMG_BASE_URL}${src}`}
                alt={part}
              />
            );
          })}
          <div className={s.categoryTab}>
            <button
              className={`${s.faceTab} ${
                activeCategory === "face" ? s.activeCategory : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCategory("face");
              }}
            >
              <img
                src={activeCategory === "face" ? faceWhiteIcon : faceIcon}
                alt="얼굴 카테고리"
              />
            </button>
            <button
              className={`${s.clothTab} ${
                activeCategory === "cloth" ? s.activeCategory : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCategory("cloth");
              }}
            >
              <img
                src={activeCategory === "cloth" ? clothWhiteIcon : clothIcon}
                alt="의상 카테고리"
              />
            </button>
            <button
              className={`${s.backgroundTab} ${
                activeCategory === "background" ? s.activeCategory : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCategory("background");
              }}
            >
              <img
                src={
                  activeCategory === "background"
                    ? backgroundWhiteIcon
                    : backgroundIcon
                }
                alt="배경 카테고리"
              />
            </button>
          </div>
          <div className={s.buttonContainer}>
            <img
              className={s.resetBtn}
              src={resetBtn}
              alt="리셋 버튼"
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
            />
            <img
              className={s.addBagBtn}
              src={addBagBtn}
              alt="장바구니 버튼"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCartClick();
              }}
            />
            <img
              className={s.heartBtn}
              src={
                selectedItem.id !== null && likedItems.has(selectedItem.id)
                  ? redHeartBtn
                  : heartBtn
              }
              alt="좋아요 버튼"
              onClick={(e) => {
                e.stopPropagation();
                if (selectedItem.id !== null) {
                  setLikedItems((prevLikedItems) => {
                    const newLikedItems = new Set(prevLikedItems);
                    if (newLikedItems.has(selectedItem.id!)) {
                      newLikedItems.delete(selectedItem.id!);
                    } else {
                      newLikedItems.add(selectedItem.id!);
                    }
                    return newLikedItems;
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
      <MarketBottomSheet
        activeTab={activeTab}
        activeCategory={activeCategory}
        isCollapsed={isSheetCollapsed}
        onItemSelect={handleItemSelect}
				likedItems={likedItems}
				isSearching={isSearching}
				onSearchToggle={handleSearchToggle}
      />
    </div>
  );
}
