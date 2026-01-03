import React, { useState, useMemo } from "react";
import s from "./MySellingItemsModal.module.scss";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import { MyListing } from "../../interfaces/Interfaces";
import { deleteListing, updateListingPrice } from "../../api/usedMarketApi";

// image files
import close from "../../assets/Signal/close.svg";
import stone from "../../assets/market/stone.svg";
import menuBtn from "../../assets/btnImg/menuBtn.png";
import deleteBtn from "../../assets/btnImg/deleteBtn.svg";

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

interface MySellingItemsModalProps {
  item: MyListing;
  onClose: () => void;
  showToast: (message: string, withIcon?: boolean, width?: string) => void;
  onPriceChange: (listingId: number, newPrice: number) => void;
  onDelete: (listingId: number) => void;
}

type Mode = "view" | "form" | "success";

const MySellingItemsModal: React.FC<MySellingItemsModalProps> = ({
  item,
  onClose,
  showToast,
  onPriceChange,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("view");
  const [inputPrice, setInputPrice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 모달 내부에서 필요한 값들 계산
  const imageUrl = useMemo(() => `${IMG_BASE_URL}${item.listingItem.name}`, [item.listingItem.name]);

  // 할인율 계산: form 모드일 때는 inputPrice 기준, view 모드일 때는 finalPrice 또는 기존 가격 기준
  const discountRate = useMemo(() => {
    const basePrice = item.listingItem.price;
    let currentPrice: number;

    if (mode === "form" && inputPrice) {
      currentPrice = Number(inputPrice);
    } else {
      currentPrice = finalPrice !== null ? finalPrice : item.listingPrice;
    }

    if (currentPrice <= 0 || basePrice <= 0) return 0;

    const rate = ((basePrice - currentPrice) / basePrice) * 100;
    return Math.floor(rate);
  }, [item.listingItem.price, item.listingPrice, mode, inputPrice, finalPrice]);

  // [change] 할인 적용 시 현재 판매가격 사용
  const applyDiscount = (pct: number) => {
    const v = Math.max(1, Math.floor(item.listingPrice * (1 - pct)));
    setInputPrice(String(v));
  };

  const onChangePrice: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const onlyNum = e.target.value.replace(/[^\d]/g, "");
    setInputPrice(onlyNum);
  };

  const handleClickCheckMarket = () => {
    navigate(
      `/market/my-item-price-check?name=${encodeURIComponent(
        item.listingItem.description
      )}&id=${item.listingItem.id}&img=${item.listingItem.name}`
    );
  };

  const handleSellClick = async () => {
    if (mode === "view") {
      setMode("form");
      return;
    }
    if (!inputPrice || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await updateListingPrice(item.listingId, Number(inputPrice));
      const newPrice = Number(inputPrice);
      setFinalPrice(newPrice);
      onPriceChange(item.listingId, newPrice);
      setMode("view");
      showToast("금액 변경을 완료했어요!", false, "200px");
    } catch (error) {
      console.error("금액 변경 실패:", error);
      showToast("금액 변경에 실패했어요");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sellButtonEnabled = mode === "view" || (!!inputPrice && !isSubmitting);

  const handleDelete = async () => {
    try {
      await deleteListing(item.listingId);
      setShowDeleteModal(false);
      onDelete(item.listingId);
      onClose();
      setTimeout(() => {
        showToast("판매글을 삭제했어요");
      }, 100);
    } catch (error) {
      console.error("삭제 실패:", error);
      setShowDeleteModal(false);
      showToast("삭제에 실패했어요");
    }
  };

  return (
    <>
      <div className={s.modalOverlay}>
        <div
          className={`${s.modal} ${mode === "form" ? s.isForm : ""}`}
        >
          <button className={s.modalClose} onClick={onClose}>
            <img src={close} alt="close" />
          </button>

          <div className={s.textArea}>
            <div className={s.titleRow}>
              <span className={s.itemNameText}>{item.listingItem.description}</span>
              {mode === "view" && (
                <div className={s.menuBtnWrapper}>
                  <img
                    src={menuBtn}
                    alt="menu"
                    className={s.menuBtn}
                    onClick={() => setShowDeleteBtn(!showDeleteBtn)}
                  />
                  {showDeleteBtn && (
                    <button
                      className={s.deleteBtn}
                      onClick={() => {
                        setShowDeleteModal(true);
                        setShowDeleteBtn(false);
                      }}
                    >
                      <img src={deleteBtn} alt="" />
                      <span>삭제</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={s.imageContainer}>
            {discountRate > 0 && (
              <div className={s.discountBadge}>{discountRate}%</div>
            )}
            <img src={imageUrl} alt="item image" className={s.itemImg} />
          </div>

          <div className={s.priceArea}>
            <span className={s.priceText}>현재 판매 가격</span>
            <img src={stone} alt="stone" className={s.stoneIcon} />
            <span className={s.priceValue}>
              {finalPrice !== null ? finalPrice : item.listingPrice}
            </span>
          </div>

          {mode === "form" && (
            <div className={s.formArea}>
              <input
                className={s.inputBox}
                placeholder="판매할 가격을 입력하세요"
                inputMode="numeric"
                value={inputPrice}
                onChange={onChangePrice}
              />

              <div className={s.divider}></div>

              <div className={s.helperRow}>
                <button
                  type="button"
                  className={s.helperBtn}
                  onClick={() => applyDiscount(0.1)}
                >
                  -10%
                </button>
                <button
                  type="button"
                  className={s.helperBtn}
                  onClick={() => applyDiscount(0.2)}
                >
                  -20%
                </button>
                <button
                  type="button"
                  className={s.helperBtn}
                  onClick={() => applyDiscount(0.3)}
                >
                  -30%
                </button>
              </div>
            </div>
          )}

          <div className={s.buttonArea}>
            {mode === "view" ? (
              <div
                className={s.checkMarketPriceBtn}
                onClick={handleClickCheckMarket}
              >
                <span className={s.btnText}>시세확인</span>
              </div>
            ) : null}

            <div
              className={`${s.sellBtn} ${
                sellButtonEnabled ? s.sellBtnPrimary : s.sellBtnDisabled
              }`}
              onClick={sellButtonEnabled ? handleSellClick : undefined}
              aria-disabled={!sellButtonEnabled}
            >
              <span className={s.btnText}>
                {mode === "view"
                  ? "금액 변경"
                  : isSubmitting
                  ? "변경 중..."
                  : "변경하기"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default MySellingItemsModal;
