import s from './MyItemSell.module.scss';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellItemModal from './component/SellItemModal';

import backArrow from '../../../assets/pleiadesBackArrow.svg';

import { mockFaceItems } from '../OfficialStore/MarketBottomSheet/MockData/mockFaceItem';
import { mockClothItems } from '../OfficialStore/MarketBottomSheet/MockData/mockClothItem';
import { mockBackgroundItems } from '../OfficialStore/MarketBottomSheet/MockData/mockBackgroundItem';

type CategoryType = 'face' | 'cloth' | 'background';

const MAIN_TABS: { key: CategoryType; label: string }[] = [
    { key: 'face', label: '얼굴' },
    { key: 'cloth', label: '의상' },
    { key: 'background', label: '배경' },
];

const SUB_TABS: Record<CategoryType, string[]> = {
    face: ['전체', '머리', '눈', '코', '입', '점'],
    cloth: ['전체', '상의', '하의', '세트', '신발', '악세서리'],
    background: ['전체', '별', '우주정거장'],
};

const TYPE_TO_SUBLABEL: Record<string, string> = {
    // face
    HAIR: '머리',
    EYES: '눈',
    NOSE: '코',
    MOUTH: '입',
    MOLE: '점',
    // cloth (의상)
    TOP: '상의',
    BOTTOM: '하의',
    SET: '세트',
    SHOES: '신발',
    // cloth (악세서리 묶음)
    EARS: '악세서리',
    EYESITEM: '악세서리',
    HEAD: '악세서리',
    NECK: '악세서리',
    LEFTWRIST: '악세서리',
    RIGHTWRIST: '악세서리',
    LEFTHAND: '악세서리',
    RIGHTHAND: '악세서리',
    // background
    STARBACKGROUND: '별',
    STATIONBACKGROUND: '우주정거장',
};

const SUBLABEL_TO_TYPES: Record<CategoryType, Record<string, string[]>> = {
    face: {
        전체: ['HAIR', 'EYES', 'NOSE', 'MOUTH', 'MOLE'],
        머리: ['HAIR'],
        눈: ['EYES'],
        코: ['NOSE'],
        입: ['MOUTH'],
        점: ['MOLE'],
    },
    cloth: {
        전체: ['TOP', 'BOTTOM', 'SET', 'SHOES', 'EARS', 'EYESITEM', 'HEAD', 'NECK', 'LEFTWRIST', 'RIGHTWRIST', 'LEFTHAND', 'RIGHTHAND'],
        상의: ['TOP'],
        하의: ['BOTTOM'],
        세트: ['SET'],
        신발: ['SHOES'],
        악세서리: ['EARS', 'EYESITEM', 'HEAD', 'NECK', 'LEFTWRIST', 'RIGHTWRIST', 'LEFTHAND', 'RIGHTHAND'],
    },
    background: {
        전체: ['STARBACKGROUND', 'STATIONBACKGROUND'],
        별: ['STARBACKGROUND'],
        우주정거장: ['STATIONBACKGROUND'],
    },
};

// 팀원 목업 타입 (원본)
type TeamItem = {
    id: number;
    name: string;           // 파일명
    description: string;
    type: string;           // EYES / TOP / STARBACKGROUND ...
    price: number;
    theme: string[];
    created_at: string;
};

// 화면 도메인 아이템
type DomainItem = {
    id: number;
    main: CategoryType;
    sub: string;       // 한글 서브 라벨
    image: string;     // IMG_BASE_URL + name
    raw: TeamItem;     // 원본 참조
};

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

function composeDomainItems(): DomainItem[] {
    const face = mockFaceItems.map((it): DomainItem => ({
        id: it.id,
        main: 'face',
        sub: TYPE_TO_SUBLABEL[it.type] ?? '전체',
        image: `${IMG_BASE_URL}${it.name}`,
        raw: it,
    }));
    const cloth = mockClothItems.map((it): DomainItem => ({
        id: it.id,
        main: 'cloth',
        sub: TYPE_TO_SUBLABEL[it.type] ?? '전체',
        image: `${IMG_BASE_URL}${it.name}`,
        raw: it,
    }));
    const background = mockBackgroundItems.map((it): DomainItem => ({
        id: it.id,
        main: 'background',
        sub: TYPE_TO_SUBLABEL[it.type] ?? '전체',
        image: `${IMG_BASE_URL}${it.name}`,
        raw: it,
    }));
    return [...face, ...cloth, ...background];
}

const MyItemSell: React.FC = () => {
    const navigate = useNavigate();

    const [mainTab, setMainTab] = useState<CategoryType>('face');
    const [subTab, setSubTab] = useState<string>('전체');
    const [selectedDomainItem, setSelectedDomainItem] = useState<DomainItem | null>(null);

    const [isSellItemModalVisible, setIsSellItemModalVisible] = useState(false);

    const handleCloseSellItemModal = () => {
        setIsSellItemModalVisible(false);
    };

    const items = useMemo(() => composeDomainItems(), []);

    const filtered = useMemo(() => {
        const allowedTypes = SUBLABEL_TO_TYPES[mainTab][subTab] ?? [];
        return items.filter((it) => {
            if (it.main !== mainTab) return false;
            if (subTab === '전체') return true;
            return allowedTypes.includes(it.raw.type);
        });
    }, [items, mainTab, subTab]);

    return (
        <div className={s.container}>
            <div className={s.header}>
                <img
                    src={backArrow}
                    alt='back arrow'
                    className={s.backArrow}
                    onClick={() => navigate(-1)}
                />
                <span className={s.headerTitle}>어떤 아이템을 팔아볼까요?</span>
            </div>

            {/* 메인 탭 (얼굴/의상/배경) */}
            <div className={s.mainTabs}>
                {MAIN_TABS.map(({ key, label }) => (
                    <div
                        key={key}
                        className={`${s.mainTabBtn} ${key === mainTab ? s.active : ''}`}
                        onClick={() => { setMainTab(key); setSubTab('전체'); }}
                    >
                        <span className={`${s.mainTabText} ${key === mainTab ? s.active : ''}`}>{label}</span>
                    </div>
                ))}
            </div>

            {/* 서브 탭 */}
            <div className={s.subTabs} role="tablist" aria-label={`${mainTab} 하위 카테고리`}>
                {SUB_TABS[mainTab].map((st) => (
                    <div
                        key={st}
                        role="tab"
                        aria-selected={st === subTab}
                        className={`${s.subTabBtn} ${st === subTab ? s.active : ''}`}
                        onClick={() => setSubTab(st)}
                    >
                        {st}
                    </div>
                ))}
            </div>

            {/* 아이템 그리드 */}
            <div className={s.grid}>
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        className={s.card}
                        onClick={() => {
                            setSelectedDomainItem(item);
                            setIsSellItemModalVisible(true);
                        }}
                    >
                        <img src={item.image} alt={item.raw.name} className={s.itemThumb} />
                    </div>
                ))}
            </div>

            {isSellItemModalVisible && selectedDomainItem && (
                <SellItemModal
                    itemName={selectedDomainItem.raw.description || String(selectedDomainItem.id)}
                    handleCloseSendSignalPopup={handleCloseSellItemModal}
                    image={selectedDomainItem.image}
                    itemId={selectedDomainItem.id}
                    itemPrice={selectedDomainItem.raw.price}
                />
            )}
        </div>
    );
};

export default MyItemSell;