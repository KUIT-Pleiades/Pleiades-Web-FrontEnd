const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const acc1_01 = `${IMG_BASE_URL}acc1_01.png`;
const acc1_02 = `${IMG_BASE_URL}acc1_02.png`;
const acc2_01 = `${IMG_BASE_URL}acc2_01.png`;
const acc3_01 = `${IMG_BASE_URL}acc3_01.png`;
const acc4_01 = `${IMG_BASE_URL}acc4_01.png`;
const acc5_01 = `${IMG_BASE_URL}acc5_01.png`;

const fas1_01 = `${IMG_BASE_URL}fas1_01.png`;
const fas1_02 = `${IMG_BASE_URL}fas1_02.png`;
const fas1_03 = `${IMG_BASE_URL}fas1_03.png`;
const fas4_01 = `${IMG_BASE_URL}fas4_01.png`;
const fas6_01 = `${IMG_BASE_URL}fas6_01.png`;

// ** 세부카테고리 **
// acc 악세서리: 작게 포인트 주는 아이템
// >> 머리띠, 안경, 시계, 귀걸이, 선글라스 등
// fas 패션: 의상에 준하며 착장 전체에 영향을 줌
// >> 가방, 모자, 목도리 등
// etc 기타: 들고다니는 거
// >> 커피, 휴대폰, 풍선 등

// ** 코드 **
// 1: 머리에 쓰는 것
// 2: 눈에 쓰는 것
// 3: 귀에 걸치는 것
// 4: 목에 걸치는 것
// 5: 화면 왼쪽 손목
// 6: 화면 오른쪽 손목
// 7: 화면 왼쪽 손
// 8: 화면 오른쪽 손목

export interface Item {
  name: string;
  src: string;
  tags: string;
  code: string;
}

const images = {
  acc1_01,
  fas1_01,
  fas1_02,
  fas1_03,
  acc2_01,
  acc1_02,
  acc3_01,
  fas4_01,
  acc4_01,
  acc5_01,
  fas6_01,
};

export const ItemImages: Item[] = [
  ...Object.entries(images).map(([key, src]) => ({
    name: key,
    src,
    tags: key.slice(0, 3),
    code: key.slice(3, 4),
  })),
];
