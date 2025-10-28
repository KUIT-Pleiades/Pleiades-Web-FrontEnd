import React, { useState } from "react";
import s from "./SellItemModal.module.scss";
import { useNavigate } from "react-router-dom";

// image files
import close from '../../../../assets/Signal/close.svg';
import stone from "../../../../assets/market/stone.svg";

interface SellItemModalProps {
    itemName: string;
    handleCloseSendSignalPopup: () => void;
    image: string;
    // 임시 GET API 경로가 {item_id}를 사용하므로 선택적으로 전달
    itemId?: number;
    itemPrice: number;
}

type Mode = 'view' | 'form' | 'success';

const SellItemModal: React.FC<SellItemModalProps> = ({
    itemName,
    handleCloseSendSignalPopup,
    image,
    itemId,
    itemPrice,
}) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<Mode>('view');
    const [inputPrice, setInputPrice] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [finalPrice, setFinalPrice] = useState<number | null>(null);

    // [change] 할인 적용 시 officialPrice 사용
    const applyDiscount = (pct: number) => {
        if (itemPrice == null) return;
        const v = Math.max(1, Math.floor(itemPrice * (1 - pct)));
        setInputPrice(String(v));
    };

    const onChangePrice: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const onlyNum = e.target.value.replace(/[^\d]/g, '');
        setInputPrice(onlyNum);
    };

    const handleClickCheckMarket = () => {
        navigate(`/market/my-item-price-check?name=${encodeURIComponent(itemName)}&id=${itemId ?? ''}`);
    };

    const handleSellClick = async () => {
        if (mode === 'view') {
            setMode('form');
            return;
        }
        if (!inputPrice || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const res = await postSellItem({ name: itemName, price: Number(inputPrice) });
            if (res?.ok) {
                setFinalPrice(Number(inputPrice));
                setMode('success');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const sellButtonEnabled = mode === 'view' || (!!inputPrice && !isSubmitting);

    return (
        <div className={s.modalOverlay}>
            <div className={`${s.modal} ${mode === 'form' ? s.isForm : ''} ${mode === 'success' ? s.isSuccess : ''}`}>
                <button
                    className={s.modalClose}
                    onClick={handleCloseSendSignalPopup}
                >
                    <img src={close} alt="close" />
                </button>

                <div className={s.textArea}>
                    {mode === 'success' ? (
                        <>
                            <span className={s.successTitle}>판매글을 등록했어요!</span>
                            <span className={s.itemNameTextSuccess}>{itemName}</span>
                        </>
                    ) : (
                        <span className={s.itemNameText}>{itemName}</span>
                    )}
                </div>

                <div className={s.imageContainer}>
                    <img
                        src={image}
                        alt="item image"
                        className={s.itemImg}
                    />
                </div>

                {mode !== 'success' ? (
                    <>
                        <div className={s.priceArea}>
                            <span className={s.priceText}>공식몰 가격</span>
                            <img src={stone} alt="stone" className={s.stoneIcon} />
                            <span className={s.priceValue}>{itemPrice}</span>
                        </div>

                        {mode === 'form' && (
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
                                    <button type="button" className={s.helperBtn} onClick={() => applyDiscount(0.10)}>-10%</button>
                                    <button type="button" className={s.helperBtn} onClick={() => applyDiscount(0.20)}>-20%</button>
                                    <button type="button" className={s.helperBtn} onClick={() => applyDiscount(0.30)}>-30%</button>
                                </div>
                            </div>
                        )}

                        <div className={s.buttonArea}>
                            {
                                mode === 'view' ? (
                                    <div
                                        className={s.checkMarketPriceBtn}
                                        onClick={handleClickCheckMarket}
                                    >
                                        <span className={s.btnText}>시세확인</span>
                                    </div>
                                ) : null
                            }

                            <div
                                className={`${s.sellBtn} ${sellButtonEnabled ? s.sellBtnPrimary : s.sellBtnDisabled}`}
                                onClick={sellButtonEnabled ? handleSellClick : undefined}
                                aria-disabled={!sellButtonEnabled}
                            >
                                <span className={s.btnText}>{mode === 'view' ? '판매하기' : (isSubmitting ? '등록 중...' : '판매하기')}</span>
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
                                    handleCloseSendSignalPopup();
                                    navigate('/market/my-item-selling');
                                }}
                            >
                                <span className={s.btnText}>내 상품 관리</span>
                            </div>
                            <div
                                className={`${s.sellBtn} ${s.sellBtnPrimary}`}
                                onClick={() => {
                                    handleCloseSendSignalPopup();
                                    navigate('/market/my-item-sell');
                                }}
                            >
                                <span className={s.btnText}>계속 판매하기</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SellItemModal;

// 데모용 POST API (실 서버 연동 시 교체)
async function postSellItem({ name, price }: { name: string; price: number }) {
    if (!name || price <= 0) {
        return null;
    }
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
}