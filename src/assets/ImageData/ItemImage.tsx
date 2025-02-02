import acc1_01 from "../Character/item/head/headItem01.png";
import fas1_01 from "../Character/item/head/headItem02.png";
import fas1_02 from "../Character/item/head/headItem03.png";
import acc1_03 from "../Character/item/head/headItem04.png";
import fas1_03 from "../Character/item/head/headItem05.png";

import acc2_01 from "../Character/item/face/faceItem01.png";

import acc3_01 from "../Character/item/ear/earItem01.png";

import fas4_01 from "../Character/item/neck/neckItem01.png";
import acc4_01 from "../Character/item/neck/neckItem02.png";

import acc5_01 from "../Character/item/hand/handItem01.png";
import fas7_01 from "../Character/item/hand/bag01.png"; //왼손

// const acc1_01 = "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/acc1_01.png";

// const fas1_01 =
//   "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/fas1_01.png";


// const fas1_02 =
//   "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/fas1_02.png";



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
  acc2_01,
  fas1_03,
  acc1_03,
  acc3_01,
  fas4_01,
  acc4_01,
  acc5_01,
  fas7_01,
};

export const ItemImages: Item[] = [
  ...Object.entries(images).map(([key, src]) => ({
    name: key,
    src,
    tags: key.slice(0,3),
    code: key.slice(3,4)
  }))
]; 

