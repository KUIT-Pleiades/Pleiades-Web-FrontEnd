import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./TransactionHistory.module.scss";
import backArrow from "../../../assets/pleiadesBackArrow.svg";
import plaedaesLogoPurple from "../../../assets/pleiadesLogoPurple.png";
import stoneIcon from "../../../assets/market/stone.svg";
import {
  PurchaseHistoryResponse,
  SaleHistoryResponse,
  PurchaseOwnership,
  SaleOwnership,
} from "../../../interfaces/Interfaces";
import { getPurchaseHistory, getSaleHistory } from "../../../api/marketApi";

import { IMG_BASE_URL, getThumbnailPath } from "../../../functions/getImage";

const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"sale" | "purchase">("purchase");
  const [purchaseData, setPurchaseData] = useState<PurchaseHistoryResponse>({
    totalCount: 0,
    purchases: [],
  });
  const [saleData, setSaleData] = useState<SaleHistoryResponse>({
    totalCount: 0,
    sales: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [purchases, sales] = await Promise.all([
          getPurchaseHistory(),
          getSaleHistory(),
        ]);
        setPurchaseData(purchases);
        setSaleData(sales);
      } catch (error) {
        console.error("거래 내역 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateDiscountRate = (
    originalPrice: number,
    discountedPrice: number
  ) => {
    if (originalPrice === 0) return 0;
    const rate = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.floor(rate);
  };

  const formatDate = (date: string) => {
    return date.replace(/-/g, ".");
  };

  const currentItems =
    activeTab === "purchase" ? purchaseData.purchases : saleData.sales;
  const currentCount =
    activeTab === "purchase" ? purchaseData.totalCount : saleData.totalCount;

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

        {/* 로딩 중 */}
        {isLoading ? (
          <div className={s.emptyState}>
            <p className={s.emptyTitle}>로딩 중...</p>
          </div>
        ) : currentItems.length > 0 ? (
          /* 아이템이 있을 때 */
          <div className={s.itemsList}>
            {currentItems.map((group) => (
              <div key={group.date} className={s.dateGroup}>
                <div className={s.dateHeader}>{formatDate(group.date)}</div>
                <div className={s.grid}>
                  {group.ownerships.map((ownership) => {
                    const soldPrice =
                      activeTab === "purchase"
                        ? (ownership as PurchaseOwnership).purchasedPrice
                        : (ownership as SaleOwnership).soldPrice;
                    const discountRate = calculateDiscountRate(
                      ownership.item.price,
                      soldPrice
                    );
                    const isOfficial =
                      activeTab === "purchase"
                        ? (ownership as PurchaseOwnership).isOfficial
                        : true;
                    return (
                      <div key={ownership.id} className={s.itemWrapper}>
                        <div className={s.cardWrapper}>
                          {discountRate > 0 && (
                            <div className={s.discountBadge}>
                              {discountRate}%
                            </div>
                          )}
                          <div className={s.card}>
                            <img
                              src={`${IMG_BASE_URL}${getThumbnailPath(ownership.item.name)}`}
                              alt={ownership.item.description}
                            />
                          </div>
                        </div>
                        <div className={s.itemName}>
                          {!isOfficial && (
                            <span className={s.usedBadge}>[중고] </span>
                          )}
                          <span>{ownership.item.description}</span>
                        </div>
                        <div className={s.itemPrice}>
                          <img src={stoneIcon} alt="stone" />
                          <span>{soldPrice.toLocaleString()}</span>
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
