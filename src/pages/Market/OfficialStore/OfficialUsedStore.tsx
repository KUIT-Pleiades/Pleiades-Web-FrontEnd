import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../../../store/useCharacterStore";
import s from "./OfficialUsedStore.module.scss";
import MarketBottomSheet from "./MarketBottomSheet/MarketBottomSheet";
import characterBackground from "../../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../../assets/btnImg/resetBtn.svg";
import addBagBtn from "../../../assets/btnImg/addBagBtn.png";
import heartBtn from "../../../assets/btnImg/heartBtn.png";
import redHeartBtn from "../../../assets/btnImg/redHeartBtn.svg";
import backBtn from "../../../assets/btnImg/backBtn.png";
import { UserInfo } from "../../../interfaces/Interfaces";
import { useToast } from "../../../components/Toast/useToast";
import {
  getOfficialFaceItems,
  getOfficialClothItems,
  getOfficialBackgroundItems,
  postWishlistItem,
  deleteWishlistItem,
  purchaseOfficialItem,
  searchOfficialItems,
  SearchResponse,
} from "../../../api/marketApi";
import {
  getUsedFaceItems,
  getUsedClothItems,
  getUsedBackgroundItems,
  postUsedWishlistItem,
  deleteUsedWishlistItem,
  purchaseUsedItem,
} from "../../../api/usedMarketApi";
import AddToCartModal from "../../../modals/AddToCartModal/AddToCartModal";
import { getImagePath } from "../../../functions/getImage";

// 일반 아이콘
import faceIcon from "../../../assets/market/face.svg";
import clothIcon from "../../../assets/market/cloth.svg";
import backgroundIcon from "../../../assets/market/background.svg";

// 흰색 아이콘
import faceWhiteIcon from "../../../assets/market/face_white.svg";
import clothWhiteIcon from "../../../assets/market/cloth_white.svg";
import backgroundWhiteIcon from "../../../assets/market/background_white.svg";
import StoneBox from "../../../components/Stone/StoneBox";
import CompleteCartModal from "../../../modals/AddToCartModal/CompleteCartModal";

export type CategoryType = "face" | "cloth" | "background";

export default function OfficialUsedStore() {
  const [activeTab, setActiveTab] = useState("official");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("face");
  const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);
  const [officialLikedItems, setOfficialLikedItems] = useState(
    new Set<number>()
  );
  const [usedLikedItems, setUsedLikedItems] = useState(new Set<number>());
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isCompleteCartModalOpen, setCompleteCartModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false); // 검색창 포커스 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  ); // 검색 결과
  const [isSearchLoading, setIsSearchLoading] = useState(false); // 검색 로딩 상태

  const { userInfo, fetchUserStone } = useCharacterStore();
  const { showToast, ToastContainer } = useToast();
  const IMG_BASE_URL: string = import.meta.env.VITE_IMG_BASE_URL;

  const [initialUserInfo, setInitialUserInfo] = useState<UserInfo>(() =>
    structuredClone(userInfo)
  ); // 초기 상태값을 복사하여 사용

  // 미리보기 상태 (캐릭터 프리뷰용)
  const [tryOnUserInfo, setTryOnUserInfo] = useState<UserInfo>(() =>
    structuredClone(userInfo)
  );

  useEffect(() => {
    fetchUserStone();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const [
          officialFaceResponse,
          officialClothResponse,
          officialBackgroundResponse,
          usedFaceResponse,
          usedClothResponse,
          usedBackgroundResponse,
        ] = await Promise.all([
          getOfficialFaceItems(),
          getOfficialClothItems(),
          getOfficialBackgroundItems(),
          getUsedFaceItems(),
          getUsedClothItems(),
          getUsedBackgroundItems(),
        ]);

        // 공식몰과 중고몰 위시리스트를 분리해서 저장
        const officialWishlist = [
          ...officialFaceResponse.wishlist,
          ...officialClothResponse.wishlist,
          ...officialBackgroundResponse.wishlist,
        ];

        const usedWishlist = [
          ...usedFaceResponse.wishlist,
          ...usedClothResponse.wishlist,
          ...usedBackgroundResponse.wishlist,
        ];

        setOfficialLikedItems(new Set(officialWishlist));
        setUsedLikedItems(new Set(usedWishlist));
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  // Store의 userInfo가 변경될 때 미리보기 캐릭터 정보와 초기값 정보를 동기화합니다.
  useEffect(() => {
    const clonedUserInfo = structuredClone(userInfo);
    setInitialUserInfo(clonedUserInfo);
    setTryOnUserInfo(clonedUserInfo);
  }, [userInfo]);

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

  const reverseSearch = () => {
    setIsSearching(!isSearching);
    setFocusSearch(false);
    // 검색 모드 종료 시 검색 결과 초기화
    if (isSearching) {
      setSearchQuery("");
      setSearchResults(null);
    }
  };

  const focusSearchInput = () => {
    setFocusSearch(true);
  };

  // 검색 실행 함수
  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    if (activeTab === "official") {
      setIsSearchLoading(true);
      try {
        const results = await searchOfficialItems(query);
        setSearchResults(results);
        // 검색 결과의 wishlist를 officialLikedItems에 병합
        if (results.wishlist && results.wishlist.length > 0) {
          setOfficialLikedItems((prev) => {
            const newSet = new Set(prev);
            results.wishlist.forEach((id) => newSet.add(id));
            return newSet;
          });
        }
      } catch (error) {
        console.error("검색 실패:", error);
        setSearchResults(null);
      } finally {
        setIsSearchLoading(false);
      }
    }
    // TODO: 중고몰 검색 API 연결
  };

  // 타입에 따른 폴더 경로 반환
  const getCategoryFolder = (type: string): string => {
    const faceTypes = ["HAIR", "EYES", "NOSE", "MOUTH", "MOLE"];
    const backgroundTypes = ["STAR_BG", "STATION_BG"];

    if (faceTypes.includes(type)) return "face";
    if (backgroundTypes.includes(type)) return "background";
    return "fashion";
  };

  const handleItemSelect = (
    id: number,
    name: string,
    description: string,
    price: number,
    type: string
  ) => {
    setSelectedItem({ id, name, description, price, type });

    // 검색 모드에서 아이템 선택 시 fullscreen만 해제 (캐릭터 프리뷰 보이도록)
    if (focusSearch) {
      setFocusSearch(false);
    }

    // 폴더 경로를 포함한 전체 경로 생성
    const fullPath = `${getCategoryFolder(type)}/${name}`;

    setTryOnUserInfo((prev) => {
      const newState = structuredClone(prev);

      switch (type) {
        // 얼굴 아이템
        case "HAIR":
          newState.face.hair = fullPath;
          break;
        case "EYES": // 얼굴 파츠 '눈'
          newState.face.eyes = fullPath;
          break;
        case "NOSE":
          newState.face.nose = fullPath;
          break;
        case "MOUTH":
          newState.face.mouth = fullPath;
          break;
        case "MOLE":
          newState.face.mole = fullPath;
          break;

        // 의상 아이템
        case "TOP":
          newState.outfit.top = fullPath;
          newState.outfit.set = "";
          // 👇 직전에 세트 의상을 입고 있었는지 확인
          if (prev.outfit.set) {
            // 세트를 입고 있었다면 -> 초기 하의로 복구
            newState.outfit.bottom = initialUserInfo.outfit.bottom;
          }
          // 세트를 안 입고 있었다면 -> 기존 하의를 그대로 유지 (아무것도 안 함)
          break;
        case "BOTTOM":
          newState.outfit.bottom = fullPath;
          newState.outfit.set = "";
          // 👇 직전에 세트 의상을 입고 있었는지 확인
          if (prev.outfit.set) {
            // 세트를 입고 있었다면 -> 초기 상의로 복구
            newState.outfit.top = initialUserInfo.outfit.top;
          }
          // 세트를 안 입고 있었다면 -> 기존 상의를 그대로 유지 (아무것도 안 함)
          break;
        case "SET":
          newState.outfit.set = fullPath;
          newState.outfit.top = "";
          newState.outfit.bottom = "";
          break;
        case "SHOES":
          newState.outfit.shoes = fullPath;
          break;

        // 악세서리 아이템
        case "EYES_ITEM": // ✨ 악세서리 '눈' 아이템 처리
          newState.item.eyes_item = fullPath;
          break;
        case "EARS":
          newState.item.ears = fullPath;
          break;
        case "HEAD":
          newState.item.head = fullPath;
          break;
        case "NECK":
          newState.item.neck = fullPath;
          break;
        case "LEFT_WRIST":
          newState.item.leftWrist = fullPath;
          break;
        case "RIGHT_WRIST":
          newState.item.rightWrist = fullPath;
          break;
        case "LEFT_HAND":
          newState.item.leftHand = fullPath;
          break;
        case "RIGHT_HAND":
          newState.item.rightHand = fullPath;
          break;

        // 배경 아이템
        case "STAR_BG":
        case "STATION_BG":
          newState.starBackground = fullPath;
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

  const handleConfirmAddToCart = async () => {
    if (selectedItem.id === null) return;

    try {
      if (activeTab === "official") {
        const response = await purchaseOfficialItem(selectedItem.id);
        if (response.ownershipId) {
          setCartModalOpen(false);
          setCompleteCartModalOpen(true);
          fetchUserStone();
        } else {
          setCartModalOpen(false);
          showToast(response.message);
        }
      } else {
        const response = await purchaseUsedItem(selectedItem.id);
        if (response.ownershipId) {
          setCartModalOpen(false);
          setCompleteCartModalOpen(true);
          fetchUserStone();
        } else {
          setCartModalOpen(false);
          showToast(response.message);
        }
      }
    } catch (error) {
      console.error("구매 실패:", error);
      setCartModalOpen(false);
      if (error instanceof Error) {
        showToast(error.message);
      } else {
        showToast("구매에 실패했습니다.");
      }
    }
  };

  const handleCompleteCart = () => {
    // 구매 완료 후 처리 로직
    setCompleteCartModalOpen(false);
  };

  const handleGoToCustom = () => {
    navigate("/home/charactersetting");
  };

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
    setSelectedItem({
      // 미리보기(tryOnUserInfo)는 건드리지 않습니다.
      id: null,
      name: "",
      description: "",
      price: 0,
      type: "",
    });
  };

  return (
    <div className={s.container}>
      <ToastContainer />
      {isCartModalOpen && (
        <AddToCartModal
          item={selectedItem}
          onConfirm={handleConfirmAddToCart}
          onCancel={() => setCartModalOpen(false)}
        />
      )}
      {isCompleteCartModalOpen && (
        <CompleteCartModal
          item={selectedItem}
          onConfirm={handleCompleteCart}
          onCustom={handleGoToCustom}
          onCancel={() => setCompleteCartModalOpen(false)}
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
              ? `url(${IMG_BASE_URL}${getImagePath(
                  tryOnUserInfo.starBackground
                )})`
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
            <StoneBox stoneAmount={userInfo.stone || 0} />
          </div>
        </div>
        <div className={s.characterContainer} onClick={handleContentClick}>
          <img
            className={s.characterBackground}
            src={characterBackground}
            alt="캐릭터후광"
          />
          {tryOnUserInfo.face.skinColor && (
            <img
              className={s.characterSkin}
              src={`${IMG_BASE_URL}${getImagePath(
                tryOnUserInfo.face.skinColor
              )}`}
              alt="skin"
            />
          )}
          {tryOnUserInfo.face.eyes && (
            <img
              className={s.characterEyes}
              src={`${IMG_BASE_URL}${getImagePath(tryOnUserInfo.face.eyes)}`}
              alt="eyes"
            />
          )}
          {tryOnUserInfo.face.nose && (
            <img
              className={s.characterNose}
              src={`${IMG_BASE_URL}${getImagePath(tryOnUserInfo.face.nose)}`}
              alt="nose"
            />
          )}
          {tryOnUserInfo.face.mouth && (
            <img
              className={s.characterMouth}
              src={`${IMG_BASE_URL}${getImagePath(tryOnUserInfo.face.mouth)}`}
              alt="mouth"
            />
          )}
          {tryOnUserInfo.face.mole && (
            <img
              className={s.characterMole}
              src={`${IMG_BASE_URL}${getImagePath(tryOnUserInfo.face.mole)}`}
              alt="mole"
            />
          )}
          {tryOnUserInfo.face.hair && (
            <img
              className={s.characterHair}
              src={`${IMG_BASE_URL}${getImagePath(tryOnUserInfo.face.hair)}`}
              alt="hair"
            />
          )}
          {!isWearingSet && (
            <>
              {tryOnUserInfo.outfit.top && (
                <img
                  className={s.characterTop}
                  src={`${IMG_BASE_URL}${getImagePath(
                    tryOnUserInfo.outfit.top
                  )}`}
                  alt="top"
                />
              )}
              {tryOnUserInfo.outfit.bottom && (
                <img
                  className={s.characterBottom}
                  src={`${IMG_BASE_URL}${getImagePath(
                    tryOnUserInfo.outfit.bottom
                  )}`}
                  alt="bottom"
                />
              )}
            </>
          )}
          {isWearingSet && (
            <img
              className={s.characterSet}
              src={`${IMG_BASE_URL}${getImagePath(tryOnUserInfo.outfit.set)}`}
              alt="set"
            />
          )}
          {tryOnUserInfo.outfit.shoes && (
            <img
              className={s.characterShoes}
              src={`${IMG_BASE_URL}${getImagePath(tryOnUserInfo.outfit.shoes)}`}
              alt="shoes"
            />
          )}
          {Object.entries(tryOnUserInfo.item).map(([part, src]) => {
            if (!src) return null;
            return (
              <img
                key={part}
                className={s[part]}
                src={`${IMG_BASE_URL}${getImagePath(src)}`}
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
                handleCategoryChange("face");
                //setActiveCategory("face");
              }}
            >
              <img
                className={s.faceIcon}
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
                handleCategoryChange("cloth");
                //setActiveCategory("cloth");
              }}
            >
              <img
                className={s.clothIcon}
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
                handleCategoryChange("background");
                //setActiveCategory("background");
              }}
            >
              <img
                className={s.backgroundIcon}
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
                selectedItem.id !== null &&
                (activeTab === "official"
                  ? officialLikedItems.has(selectedItem.id)
                  : usedLikedItems.has(selectedItem.id))
                  ? redHeartBtn
                  : heartBtn
              }
              alt="좋아요 버튼"
              onClick={async (e) => {
                e.stopPropagation();
                if (selectedItem.id === null) return;

                const itemId = selectedItem.id;
                const currentLikedItems =
                  activeTab === "official"
                    ? officialLikedItems
                    : usedLikedItems;
                const setCurrentLikedItems =
                  activeTab === "official"
                    ? setOfficialLikedItems
                    : setUsedLikedItems;
                const isLiked = currentLikedItems.has(itemId);

                // 낙관적 업데이트: UI 먼저 변경
                setCurrentLikedItems((prev) => {
                  const newSet = new Set(prev);
                  if (isLiked) {
                    newSet.delete(itemId);
                  } else {
                    newSet.add(itemId);
                  }
                  return newSet;
                });

                try {
                  // API 호출
                  if (activeTab === "official") {
                    if (isLiked) {
                      await deleteWishlistItem(itemId);
                    } else {
                      await postWishlistItem(itemId);
                    }
                  } else {
                    if (isLiked) {
                      await deleteUsedWishlistItem(itemId);
                    } else {
                      await postUsedWishlistItem(itemId);
                    }
                  }
                } catch (error) {
                  console.error("찜 목록 업데이트 실패:", error);
                  // 롤백: API 실패 시 원래 상태로 복구
                  setCurrentLikedItems((prev) => {
                    const newSet = new Set(prev);
                    if (isLiked) {
                      newSet.add(itemId);
                    } else {
                      newSet.delete(itemId);
                    }
                    return newSet;
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
        likedItems={
          activeTab === "official" ? officialLikedItems : usedLikedItems
        }
        isSearching={isSearching}
        reverseSearch={reverseSearch}
        isFocus={focusSearch}
        setFocus={focusSearchInput}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        searchResults={searchResults}
        isSearchLoading={isSearchLoading}
      />
    </div>
  );
}
