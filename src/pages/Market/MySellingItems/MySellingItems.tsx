import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./MySellingItems.module.scss";
import backArrow from "../../../assets/pleiadesBackArrow.svg";
import stoneIcon from "../../../assets/market/stone.svg";
import addItemBtn from "../../../assets/btnImg/addItemBtn.png";
import itemSellDiscription from "../../../assets/btnImg/itemSellDiscription.png";
import plaedaesLogoPurple from "../../../assets/pleiadesLogoPurple.png";
import MySellingItemsModal from "../../../modals/MySellingItemsModal/MysellingItemsModal";
import { useToast } from "../../../components/Toast/useToast";

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

type SaleItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  discounted_price: number;
};

const MySellingItems: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [selectedItem, setSelectedItem] = useState<SaleItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const [saleItems, setSaleItems] = useState<SaleItem[]>([
    {
      id: 1234,
      name: "fashion_bottom_1.png",
      description: "레드파티 드레스",
      price: 100,
      discounted_price: 50,
    },
    {
      id: 1235,
      name: "fashion_bottom_2.png",
      description: "레드파티 드레스",
      price: 170,
      discounted_price: 20,
    },
    {
      id: 1236,
      name: "fashion_bottom_3.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 40,
    },
    {
      id: 1237,
      name: "fashion_bottom_4.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 40,
    },
    {
      id: 1238,
      name: "fashion_bottom_5.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 40,
    },
    {
      id: 1239,
      name: "fashion_bottom_6.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 2,
    },
    {
      id: 1240,
      name: "fashion_bottom_7.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 2,
    },
    {
      id: 1241,
      name: "fashion_bottom_8.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 2,
    },
    {
      id: 1242,
      name: "fashion_bottom_9.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 2,
    },
    {
      id: 1243,
      name: "fashion_bottom_7.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 2,
    },
    {
      id: 1244,
      name: "fashion_bottom_8.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 2,
    },
    {
      id: 1245,
      name: "fashion_bottom_9.png",
      description: "레드파티 드레스",
      price: 150,
      discounted_price: 2,
    },
  ]);

  const updateItemPrice = (itemId: number, newPrice: number) => {
    setSaleItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, discounted_price: newPrice }
          : item
      )
    );
    // 선택된 아이템도 업데이트
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem({ ...selectedItem, discounted_price: newPrice });
    }
  };

  const calculateDiscountRate = (price: number, discountedPrice: number) => {
    const rate = ((price - discountedPrice) / price) * 100;
    return Math.floor(rate);
  };

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
                <div key={item.id} className={s.itemWrapper}>
                  <div className={s.cardWrapper}>
                    {calculateDiscountRate(item.price, item.discounted_price) >
                      0 && (
                      <div className={s.discountBadge}>
                        {calculateDiscountRate(
                          item.price,
                          item.discounted_price
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
                        src={`${IMG_BASE_URL}${item.name}`}
                        alt={item.name}
                      />
                    </div>
                  </div>
                  <div className={s.itemName}>
                    <span>{item.description}</span>
                  </div>
                  <div className={s.itemPrice}>
                    <img src={stoneIcon} alt="stone" />
                    <span>{item.discounted_price}</span>
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
      <button className={s.floatingButton}>
        <img className={s.btnImg} src={addItemBtn} alt="add" />
      </button>

      {/* 모달 */}
      {isModalVisible && selectedItem && (
        <MySellingItemsModal
          item={selectedItem}
          onClose={handleCloseModal}
          showToast={showToast}
          onPriceChange={updateItemPrice}
        />
      )}

      {/* 토스트 메시지 */}
      <ToastContainer />
    </div>
  );
};

export default MySellingItems;
