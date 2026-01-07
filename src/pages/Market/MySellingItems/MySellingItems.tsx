import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./MySellingItems.module.scss";
import backArrow from "../../../assets/pleiadesBackArrow.svg";
import stoneIcon from "../../../assets/market/stone.svg";
import addItemBtn from "../../../assets/btnImg/addItemBtn.png";
import itemSellDiscription from "../../../assets/btnImg/itemSellDiscription.png";
import plaedaesLogoPurple from "../../../assets/pleiadesLogoPurple.png";
import MySellingItemsModal from "../../../modals/MySellingItemsModal/MysellingItemsModal";
import { useToast } from "../../../components/Toast/useToast";
import { getMyListings } from "../../../api/usedMarketApi";
import { MyListing } from "../../../interfaces/Interfaces";

const IMG_BASE_URL: string = import.meta.env.VITE_IMG_BASE_URL;

const MySellingItems: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [selectedItem, setSelectedItem] = useState<MyListing | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saleItems, setSaleItems] = useState<MyListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const data = await getMyListings();
        setSaleItems(data.listings);
      } catch (error) {
        console.error("판매 중인 아이템 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  const updateItemPrice = (listingId: number, newPrice: number) => {
    setSaleItems((prevItems) =>
      prevItems.map((item) =>
        item.listingId === listingId
          ? { ...item, listingPrice: newPrice }
          : item
      )
    );
    // 선택된 아이템도 업데이트
    if (selectedItem && selectedItem.listingId === listingId) {
      setSelectedItem({ ...selectedItem, listingPrice: newPrice });
    }
  };

  const handleDeleteItem = (listingId: number) => {
    setSaleItems((prevItems) =>
      prevItems.filter((item) => item.listingId !== listingId)
    );
  };

  const calculateDiscountRate = (originalPrice: number, listingPrice: number) => {
    const rate = ((originalPrice - listingPrice) / originalPrice) * 100;
    return Math.floor(rate);
  };

  if (isLoading) {
    return (
      <div className={s.container}>
        <div className={s.header}>
          <img
            src={backArrow}
            alt="back arrow"
            className={s.backArrow}
            onClick={() => navigate(-1)}
          />
          <span className={s.headerTitle}>판매 중인 아이템</span>
        </div>
        <div className={s.content}>
          <div>불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img
          src={backArrow}
          alt="back arrow"
          className={s.backArrow}
          onClick={() => navigate(-1)}
        />
        <span className={s.headerTitle}>판매 중인 아이템</span>
      </div>
      <div className={s.content}>
        <div className={s.contentHeader}>
          <span>판매 중인 아이템 ({saleItems.length})</span>
        </div>
        {/* 아이템이 있을 때 */}
        {saleItems.length > 0 ? (
          <div className={s.itemsList}>
            <div className={s.grid}>
              {saleItems.map((item) => (
                <div key={item.listingId} className={s.itemWrapper}>
                  <div className={s.cardWrapper}>
                    {calculateDiscountRate(item.listingItem.price, item.listingPrice) >
                      0 && (
                      <div className={s.discountBadge}>
                        {calculateDiscountRate(
                          item.listingItem.price,
                          item.listingPrice
                        )}
                        %
                      </div>
                    )}
                    <div
                      className={s.card}
                      onClick={() => {
                        setSelectedItem(item);
                        setIsModalVisible(true);
                      }}
                    >
                      <img
                        src={`${IMG_BASE_URL}${item.listingItem.name}`}
                        alt={item.listingItem.name}
                      />
                    </div>
                  </div>
                  <div className={s.itemName}>
                    <span>{item.listingItem.description}</span>
                  </div>
                  <div className={s.itemPrice}>
                    <img src={stoneIcon} alt="stone" />
                    <span>{item.listingPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 아이템이 없을 때 - Empty State */
          <div className={s.emptyState}>
            <p className={s.emptyTitle}>판매 중인 아이템이 없어요..</p>
            <p className={s.emptyDescription}>내 아이템을 판매해보세요!</p>
            <img className={s.logo} src={plaedaesLogoPurple} alt="로고" />
          </div>
        )}
      </div>

      {/* 플로팅 버튼 추가 */}
      <img className={s.descirption} src={itemSellDiscription} alt="itemSell" />
      <button
        className={s.floatingButton}
        onClick={() => navigate("/market/my-item-sell")}
      >
        <img className={s.btnImg} src={addItemBtn} alt="add" />
      </button>

      {/* 모달 */}
      {isModalVisible && selectedItem && (
        <MySellingItemsModal
          item={selectedItem}
          onClose={handleCloseModal}
          showToast={showToast}
          onPriceChange={updateItemPrice}
          onDelete={handleDeleteItem}
        />
      )}

      {/* 토스트 메시지 */}
      <ToastContainer />
    </div>
  );
};

export default MySellingItems;
