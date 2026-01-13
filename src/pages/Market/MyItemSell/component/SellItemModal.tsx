import React, { useState } from "react";
import s from "./SellItemModal.module.scss";
import { useNavigate } from "react-router-dom";
import { postSellItem } from "../../../../api/usedMarketApi";

// image files
import close from '../../../../assets/Signal/close.svg';
import stone from "../../../../assets/market/stone.svg";

interface SellItemModalProps {
    itemName: string;
    handleCloseSendSignalPopup: () => void;
    image: string;
    ownershipId: number;
    itemId: number;
    itemPrice: number;
    onSellSuccess: () => void;
}

type Mode = 'view' | 'form' | 'success';

import { IMG_BASE_URL, getImagePath } from '../../../../functions/getImage';

const SellItemModal: React.FC<SellItemModalProps> = ({
    itemName,
    handleCloseSendSignalPopup,
    image,
    ownershipId,
    itemId,
    itemPrice,
    onSellSuccess,
}) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<Mode>('view');
    const [inputPrice, setInputPrice] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [finalPrice, setFinalPrice] = useState<number | null>(null);

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
        navigate(`/market/my-item-price-check?name=${encodeURIComponent(itemName)}&id=${itemId ?? ''}&img=${image}`);
    };

    const handleSellClick = async () => {
        if (mode === 'view') {
            setMode('form');
            return;
        }
        if (!inputPrice || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const result = await postSellItem(ownershipId, Number(inputPrice));
            
            if (result) {
                console.log("판매 등록 성공, Listing ID:", result.listingId);
                setFinalPrice(Number(inputPrice));
                setMode('success');
                onSellSuccess();
            } else {
                alert("판매 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error('판매 등록 중 오류 발생:', error);
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
                        src={`${IMG_BASE_URL}${getImagePath(image)}`}
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
                                    //navigate('/market/my-item-sell');
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