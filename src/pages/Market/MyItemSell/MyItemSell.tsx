import s from './MyItemSell.module.scss';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellItemModal from './component/SellItemModal';

import backArrow from '../../../assets/pleiadesBackArrow.svg';

type ItemCategory = 'face' | 'fashion' | 'background';

// 아이템 상세 정보 DTO
interface ItemDetailDto {
    id: number;
    name: string;        // 파일명 (ex: face_hair_1.png)
    description: string; // 표시 이름 (ex: 단발머리)
    price: number;
    category: ItemCategory;
    type: string;        // HAIR, TOP, STARBACKGROUND ...
}

// [New] 소유권(Ownership) DTO
interface OwnershipDto {
    id: number;          // 소유권 ID (판매 시 사용)
    item: ItemDetailDto; // 아이템 상세 정보
}

// API 응답 타입 정의
// interface MyItemsResponseDto {
//     ownerships: OwnershipDto[];
// }

// 목업 데이터 (Ownership 구조 적용)
const mockMyItems: OwnershipDto[] = [
    // -------------------------------------------------------------------------
    // [Face Items]
    // -------------------------------------------------------------------------
    { id: 1001, item: { id: 1234, name: "face_eyes_1.png", description: "파란눈", price: 100, category: 'face', type: "EYES" } },
    { id: 1002, item: { id: 1235, name: "face_eyes_2.png", description: "초록눈", price: 150, category: 'face', type: "EYES" } },
    { id: 1003, item: { id: 2234, name: "face_nose_1.png", description: "작은코", price: 80, category: 'face', type: "NOSE" } },
    { id: 1004, item: { id: 3234, name: "face_mouth_1.png", description: "미소입", price: 110, category: 'face', type: "MOUTH" } },
    { id: 1005, item: { id: 3235, name: "face_mouth_2.png", description: "도톰입술", price: 120, category: 'face', type: "MOUTH" } },
    { id: 1006, item: { id: 4234, name: "face_mole_1.png", description: "왼쪽볼점", price: 60, category: 'face', type: "MOLE" } },
    { id: 1007, item: { id: 5234, name: "face_hair_1.png", description: "단발머리", price: 200, category: 'face', type: "HAIR" } },
    { id: 1008, item: { id: 5235, name: "face_hair_2.png", description: "긴생머리", price: 210, category: 'face', type: "HAIR" } },
    { id: 1009, item: { id: 5236, name: "face_hair_3.png", description: "곱슬머리", price: 220, category: 'face', type: "HAIR" } },

    // -------------------------------------------------------------------------
    // [Fashion Items] category: 'fashion'으로 변경
    // -------------------------------------------------------------------------
    { id: 2001, item: { id: 6001, name: "fashion_top_1.png", description: "기본 반팔 티셔츠", price: 120, category: 'fashion', type: "TOP" } },
    { id: 2002, item: { id: 6002, name: "fashion_top_2.png", description: "스트라이프 셔츠", price: 180, category: 'fashion', type: "TOP" } },
    { id: 2003, item: { id: 7001, name: "fashion_bottom_1.png", description: "편안한 청바지", price: 220, category: 'fashion', type: "BOTTOM" } },
    { id: 2004, item: { id: 7002, name: "fashion_bottom_2.png", description: "검정 슬랙스", price: 190, category: 'fashion', type: "BOTTOM" } },
    { id: 2005, item: { id: 8001, name: "fashion_set_1.png", description: "하늘색 원피스 세트", price: 450, category: 'fashion', type: "SET" } },
    { id: 2006, item: { id: 9001, name: "fashion_shoes_1.png", description: "기본 스니커즈", price: 150, category: 'fashion', type: "SHOES" } },
    { id: 2007, item: { id: 10001, name: "fashion_acc_ears_1.png", description: "베이지 버킷햇", price: 80, category: 'fashion', type: "EARS" } },
    { id: 2008, item: { id: 10002, name: "fashion_acc_head_1.png", description: "동그란 안경", price: 60, category: 'fashion', type: "HEAD" } },
    { id: 2009, item: { id: 10003, name: "fashion_acc_neck_1.png", description: "진주 목걸이", price: 120, category: 'fashion', type: "NECK" } },
    { id: 2010, item: { id: 10004, name: "fashion_acc_leftWrist_1.png", description: "실버 체인 팔찌", price: 95, category: 'fashion', type: "LEFTWRIST" } },
    { id: 2011, item: { id: 10006, name: "fashion_acc_leftHand_1.png", description: "심플한 은반지", price: 70, category: 'fashion', type: "LEFTHAND" } },
    { id: 2012, item: { id: 10007, name: "fashion_acc_leftHand_2.png", description: "골드 너클 링", price: 85, category: 'fashion', type: "LEFTHAND" } },
    { id: 2013, item: { id: 10008, name: "fashion_acc_eyes_1.png", description: "블랙 선글라스", price: 130, category: 'fashion', type: "EYESITEM" } },

    // -------------------------------------------------------------------------
    // [Background Items]
    // -------------------------------------------------------------------------
    { id: 3001, item: { id: 10001, name: "bg_star_1.png", description: "보라빛 우주 배경", price: 300, category: 'background', type: "STARBACKGROUND" } },
    { id: 3002, item: { id: 10002, name: "bg_star_2.png", description: "푸른 별자리 배경", price: 320, category: 'background', type: "STATIONBACKGROUND" } },
    { id: 3003, item: { id: 10003, name: "bg_star_3.png", description: "노을빛 행성 배경", price: 350, category: 'background', type: "STATIONBACKGROUND" } },
];

const MAIN_TABS: { key: ItemCategory; label: string }[] = [
    { key: 'face', label: '얼굴' },
    { key: 'fashion', label: '의상' }, // [Change] cloth -> fashion
    { key: 'background', label: '배경' },
];

const SUB_TABS: Record<ItemCategory, string[]> = {
    face: ['전체', '머리', '눈', '코', '입', '점'],
    fashion: ['전체', '상의', '하의', '세트', '신발', '악세서리'], // [Change] cloth -> fashion
    background: ['전체', '별', '우주정거장'],
};

// UI Sub Label -> API Types (필터링용)
const SUBLABEL_TO_TYPES: Record<ItemCategory, Record<string, string[]>> = {
    face: {
        전체: ['HAIR', 'EYES', 'NOSE', 'MOUTH', 'MOLE'],
        머리: ['HAIR'],
        눈: ['EYES'],
        코: ['NOSE'],
        입: ['MOUTH'],
        점: ['MOLE'],
    },
    fashion: { // [Change] cloth -> fashion
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

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT || '';

// 이제 적용할 내 아이템 DTO 구성
//   {
//     id: 5236,
//     name: "face_hair_3.png",
//     description: "곱슬머리",
//     price: 220,
//     category: 'face',
//     // 'face' | 'cloth' | 'background',
//     type: 'HAIR'
//     // facd -> 'HAIR', 'EYES', 'NOSE', 'MOUTH', 'MOLE'
//     // cloth -> 'TOP', 'BOTTOM', 'SET', 'SHOES', 'EARS', 'EYESITEM', 'HEAD', 'NECK', 'LEFTWRIST', 'RIGHTWRIST', 'LEFTHAND', 'RIGHTHAND'
//     // background -> 'STARBACKGROUND', 'STATIONBACKGROUND'
//   }

// {
// 	ownerships: [
//         {
//             id: 1234,
//             item: {
//                     id: 5236,
//                     name: "face_hair_3.png",
//                     description: "곱슬머리",
//                     price: 220,
//                     category: 'face' | 'fashion' | 'background',
//                     type: 'HAIR'
//             }
//         },
// 	]
// }

const MyItemSell: React.FC = () => {
    const navigate = useNavigate();

    const [mainTab, setMainTab] = useState<ItemCategory>('face');
    const [subTab, setSubTab] = useState<string>('전체');

    // const [myItems, setMyItems] = useState<OwnershipDto[]>([]); // 서버 데이터 상태

    const [selectedOwnership, setSelectedOwnership] = useState<OwnershipDto | null>(null);

    const [isSellItemModalVisible, setIsSellItemModalVisible] = useState(false);

    // // 내 아이템 목록 불러오기
    // const fetchMyItems = async () => {
    //     try {
    //         const response = await axiosRequest<MyItemsResponseDto>('/api/v1/store/my-items', 'GET', null);
    //         if (response.status === 200) {
    //             setMyItems(response.data.ownerships);
    //         } else {
    //             console.error('아이템 목록 불러오기 실패:', response.message);
    //         }
    //     } catch (error) {
    //         console.error('API 요청 중 오류 발생:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchMyItems();
    // }, []);

    const handleCloseSellItemModal = () => {
        setIsSellItemModalVisible(false);
    };

    // 판매 성공 시 호출될 함수 (목록 갱신)
    const handleSellSuccess = () => {
        // fetchMyItems(); 
    };

    // 필터링 로직
    const filtered = useMemo(() => {
        const allowedTypes = SUBLABEL_TO_TYPES[mainTab][subTab] ?? [];
        
        return mockMyItems.filter((ownership) => {
            const item = ownership.item;
            
            // 1. 메인 카테고리 체크
            if (item.category !== mainTab) return false;
            
            // 2. 서브 탭 체크 ('전체'인 경우 해당 메인 카테고리의 모든 타입 허용)
            if (subTab === '전체') return true;
            
            // 3. 선택된 서브 탭에 해당하는 타입인지 체크
            return allowedTypes.includes(item.type);
        });
    }, [mainTab, subTab]);

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
                {filtered.map((ownership) => (
                    <div
                        key={ownership.id}
                        className={s.card}
                        onClick={() => {
                            setSelectedOwnership(ownership);
                            setIsSellItemModalVisible(true);
                        }}
                    >
                        {/* 이미지 경로 조합: ownership.item.name 사용 */}
                        <img 
                            src={`${IMG_BASE_URL}${ownership.item.name}`} 
                            alt={ownership.item.description} 
                            className={s.itemThumb} 
                        />
                    </div>
                ))}
            </div>

            {/* 판매 모달 */}
            {isSellItemModalVisible && selectedOwnership && (
                <SellItemModal
                    itemName={selectedOwnership.item.description}
                    handleCloseSendSignalPopup={handleCloseSellItemModal}
                    image={`${IMG_BASE_URL}${selectedOwnership.item.name}`}
                    ownershipId={selectedOwnership.id}
                    itemId={selectedOwnership.item.id}
                    itemPrice={selectedOwnership.item.price}
                    onSellSuccess={handleSellSuccess}
                />
            )}
        </div>
    );
};

export default MyItemSell;