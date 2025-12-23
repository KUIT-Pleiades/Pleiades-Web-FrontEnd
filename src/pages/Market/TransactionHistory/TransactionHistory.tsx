import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./TransactionHistory.module.scss";
import backArrow from "../../../assets/pleiadesBackArrow.svg";
import plaedaesLogoPurple from "../../../assets/pleiadesLogoPurple.png";
import stoneIcon from "../../../assets/market/stone.svg";
import {
  PurchaseHistoryResponse,
  SaleHistoryResponse,
} from "../../../interfaces/Interfaces";

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"sale" | "purchase">("purchase");

  // TODO: 실제 API 데이터로 교체 필요
  const mockPurchaseData: PurchaseHistoryResponse = {
    totalCount: 3,
    purchases: [
      {
        date: "2025.01.15",
        items: [
          {
            transactionId: 1,
            id: 101,
            name: "fashion_top_5.png",
            description: "화이트 크롭 티셔츠",
            originalPrice: 150,
            price: 150,
            isOfficial: true,
          },
          {
            transactionId: 2,
            id: 102,
            name: "fashion_bottom_9.png",
            description: "연청 스키니진",
            originalPrice: 250,
            price: 200,
            isOfficial: false,
          },
        ],
      },
      {
        date: "2025.01.10",
        items: [
          {
            transactionId: 3,
            id: 103,
            name: "face_hair_3.png",
            description: "긴 생머리",
            originalPrice: 100,
            price: 100,
            isOfficial: true,
          },
        ],
      },
    ],
  };

  const mockSaleData: SaleHistoryResponse = {
    totalCount: 0,
    sales: [],
  };

  const calculateDiscountRate = (
    originalPrice: number,
    discountedPrice: number
  ) => {
    if (originalPrice === 0) return 0;
    const rate = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.floor(rate);
  };

  const currentItems =
    activeTab === "purchase" ? mockPurchaseData.purchases : mockSaleData.sales;
  const currentCount =
    activeTab === "purchase"
      ? mockPurchaseData.totalCount
      : mockSaleData.totalCount;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img
          src={backArrow}
          alt="back arrow"
          className={s.backArrow}
          onClick={() => navigate(-1)}
        />
        <span className={s.headerTitle}>거래 내역</span>
      </div>
      <div className={s.content}>
        <div className={s.tabContainer}>
          <button
            className={`${s.tab} ${activeTab === "sale" ? s.active : ""}`}
            onClick={() => setActiveTab("sale")}
          >
            판매 내역
          </button>
          <button
            className={`${s.tab} ${activeTab === "purchase" ? s.active : ""}`}
            onClick={() => setActiveTab("purchase")}
          >
            구매 내역
          </button>
        </div>

        {/* 거래 개수 표시 */}
        <div className={s.countContainer}>
          <span className={s.countText}>
            {activeTab === "purchase" ? "구매완료" : "판매완료"}({currentCount})
          </span>
        </div>

        {/* 아이템이 있을 때 */}
        {currentItems.length > 0 ? (
          <div className={s.itemsList}>
            {currentItems.map((group) => (
              <div key={group.date} className={s.dateGroup}>
                <div className={s.dateHeader}>{group.date}</div>
                <div className={s.grid}>
                  {group.items.map((item) => {
                    const discountRate = calculateDiscountRate(
                      item.originalPrice,
                      item.price
                    );
                    return (
                      <div key={item.transactionId} className={s.itemWrapper}>
                        <div className={s.cardWrapper}>
                          {discountRate > 0 && (
                            <div className={s.discountBadge}>
                              {discountRate}%
                            </div>
                          )}
                          <div className={s.card}>
                            <img
                              src={`${IMG_BASE_URL}${item.name}`}
                              alt={item.description}
                            />
                          </div>
                        </div>
                        <div className={s.itemName}>
                          {!item.isOfficial && (
                            <span className={s.usedBadge}>[중고] </span>
                          )}
                          <span>{item.description}</span>
                        </div>
                        <div className={s.itemPrice}>
                          <img src={stoneIcon} alt="stone" />
                          <span>{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 아이템이 없을 때 - Empty State */
          <div className={s.emptyState}>
            <p className={s.emptyTitle}>
              {activeTab === "purchase"
                ? "구매 내역이 없어요.."
                : "판매 내역이 없어요.."}
            </p>
            <p className={s.emptyDescription}>
              {activeTab === "purchase"
                ? "마켓에서 아이템을 구매해보세요!"
                : "내 아이템을 판매해보세요!"}
            </p>
            <img className={s.logo} src={plaedaesLogoPurple} alt="로고" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
