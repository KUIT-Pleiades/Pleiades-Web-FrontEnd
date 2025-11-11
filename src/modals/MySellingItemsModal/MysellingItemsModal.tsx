import React, { useState, useMemo } from "react";
import s from "./MySellingItemsModal.module.scss";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

// image files
import close from "../../assets/Signal/close.svg";
import stone from "../../assets/market/stone.svg";
import menuBtn from "../../assets/btnImg/menuBtn.png";
import deleteBtn from "../../assets/btnImg/deleteBtn.svg";

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

type SaleItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  discounted_price: number;
};

interface MySellingItemsModalProps {
  item: SaleItem;
  onClose: () => void;
  showToast: (message: string, withIcon?: boolean) => void;
}

type Mode = "view" | "form" | "success";

const MySellingItemsModal: React.FC<MySellingItemsModalProps> = ({
  item,
  onClose,
  showToast,
}) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("view");
  const [inputPrice, setInputPrice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 모달 내부에서 필요한 값들 계산
  const imageUrl = useMemo(() => `${IMG_BASE_URL}${item.name}`, [item.name]);
  const discountRate = useMemo(() => {
    const rate = ((item.price - item.discounted_price) / item.price) * 100;
    return Math.floor(rate);
  }, [item.price, item.discounted_price]);

  // [change] 할인 적용 시 현재 판매가격 사용
  const applyDiscount = (pct: number) => {
    const v = Math.max(1, Math.floor(item.discounted_price * (1 - pct)));
    setInputPrice(String(v));
  };

  const onChangePrice: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const onlyNum = e.target.value.replace(/[^\d]/g, "");
    setInputPrice(onlyNum);
  };

  const handleClickCheckMarket = () => {
    navigate(
      `/market/my-item-price-check?name=${encodeURIComponent(
        item.description
      )}&id=${item.id}`
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
      const res = await postSellItem({
        name: item.description,
        price: Number(inputPrice),
      });
      if (res?.ok) {
        setFinalPrice(Number(inputPrice));
        setMode("success");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const sellButtonEnabled = mode === "view" || (!!inputPrice && !isSubmitting);

  const handleDelete = async () => {
    // 실제 삭제 API 호출
    console.log("삭제 요청:", item.id);
    setShowDeleteModal(false);

    // 모달을 먼저 닫고 토스트 표시
    onClose();
    setTimeout(() => {
      showToast("판매글을 삭제했어요");
    }, 100);
  };

  return (
    <>
      <div className={s.modalOverlay}>
        <div
          className={`${s.modal} ${mode === "form" ? s.isForm : ""} ${
            mode === "success" ? s.isSuccess : ""
          }`}
        >
          <button className={s.modalClose} onClick={onClose}>
            <img src={close} alt="close" />
          </button>

          <div className={s.textArea}>
            {mode === "success" ? (
              <>
                <span className={s.successTitle}>금액 변경을 완료했어요!</span>
                <span className={s.itemNameTextSuccess}>
                  {item.description}
                </span>
              </>
            ) : (
              <div className={s.titleRow}>
                <span className={s.itemNameText}>{item.description}</span>
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
            )}
          </div>

          <div className={s.imageContainer}>
            {discountRate > 0 && (
              <div className={s.discountBadge}>{discountRate}%</div>
            )}
            <img src={imageUrl} alt="item image" className={s.itemImg} />
          </div>

          {mode !== "success" ? (
            <>
              <div className={s.priceArea}>
                <span className={s.priceText}>현재 판매 가격</span>
                <img src={stone} alt="stone" className={s.stoneIcon} />
                <span className={s.priceValue}>{item.discounted_price}</span>
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
                      ? "등록 중..."
                      : "판매하기"}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={s.successInfoBox}>
                <div className={s.successPriceRow}>
                  <span className={s.successPriceLabel}>판매 가격</span>
                  <img src={stone} alt="stone" className={s.stoneIcon} />
                  <span className={s.successPriceValue}>{finalPrice}</span>
                </div>
              </div>

              <div className={s.buttonArea}>
                <div
                  className={s.checkMarketPriceBtn}
                  onClick={() => {
                    onClose();
                    navigate("/market/my-item-selling");
                  }}
                >
                  <span className={s.btnText}>내 상품 관리</span>
                </div>
                <div
                  className={`${s.sellBtn} ${s.sellBtnPrimary}`}
                  onClick={() => {
                    onClose();
                    navigate("/market/my-item-sell");
                  }}
                >
                  <span className={s.btnText}>계속 판매하기</span>
                </div>
              </div>
            </>
          )}
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

// 데모용 POST API (실 서버 연동 시 교체)
async function postSellItem({ name, price }: { name: string; price: number }) {
  if (!name || price <= 0) {
    return null;
  }
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}
