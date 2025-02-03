//import skin01 from "../Character/face/skin/skin01.png";
const skin_01 =
  "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/skin_01.png";
const skin_02 =
  "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/skin_02.png";
const skin_03 =
  "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/skin_03.png";
const skin_04 =
  "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/skin_04.png";
const skin_05 =
  "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/skin_05.png";
const skin_06 =
  "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/skin_06.png";
const skin_07 =
  "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/skin_07.png";
// import skin02 from "../Character/face/skin/skin02.png";
// import skin03 from "../Character/face/skin/skin03.png";
// import skin04 from "../Character/face/skin/skin04.png";
// import skin05 from "../Character/face/skin/skin05.png";
// import skin06 from "../Character/face/skin/skin06.png";
// import skin07 from "../Character/face/skin/skin07.png";

//import hair01 from "../Character/face/hair/hair01.png";
const hair_01 =
  "https://gateway.pinata.cloud/ipfs/bafybeigoq2wasnxjcmt7ricrmrp6jju5mui5rcigqj4o3sv6k23ch7rzhi/hair_01.png";
import hair_02 from "../Character/face/hair/hair02.png";
import hair_03 from "../Character/face/hair/hair03.png";
import hair_04 from "../Character/face/hair/hair04.png";
import hair_05 from "../Character/face/hair/hair05.png";
import hair_06 from "../Character/face/hair/hair06.png";
import hair_07 from "../Character/face/hair/hair07.png";
import hair_08 from "../Character/face/hair/hair08.png";
import hair_09 from "../Character/face/hair/hair09.png";

import face_01 from "../Character/face/face/face01.png";
import face_02 from "../Character/face/face/face02.png";
import face_03 from "../Character/face/face/face03.png";
import face_04 from "../Character/face/face/face04.png";
import face_05 from "../Character/face/face/face05.png";
import face_06 from "../Character/face/face/face06.png";
import face_07 from "../Character/face/face/face07.png";
import face_08 from "../Character/face/face/face08.png";
import face_09 from "../Character/face/face/face09.png";

export interface FaceItem {
  name: string;
  src: string;
  tags: string;
}

const images = {
  skin: {
    skin_01,
    skin_02,
    skin_03,
    skin_04,
    skin_05,
    skin_06,
    skin_07,
  },
  hair: {
    hair_01,
    hair_02,
    hair_03,
    hair_04,
    hair_05,
    hair_06,
    hair_07,
    hair_08,
    hair_09,
  },
  face: {
    face_01,
    face_02,
    face_03,
    face_04,
    face_05,
    face_06,
    face_07,
    face_08,
    face_09,
  },
};
// FaceImages 배열 생성
export const FaceImages: FaceItem[] = [
  ...Object.entries(images.skin).map(([key, src]) => ({
    name: key,
    src,
    tags: "피부",
  })),
  ...Object.entries(images.hair).map(([key, src]) => ({
    name: key,
    src,
    tags: "머리",
  })),
  ...Object.entries(images.face).map(([key, src]) => ({
    name: key,
    src,
    tags: "얼굴",
  })),
];

//export const faceCategories = ["전체", "피부색", "머리", "표정"];
