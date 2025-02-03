const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const skin_01 = `${IMG_BASE_URL}skin_01.png`;
const skin_02 = `${IMG_BASE_URL}skin_02.png`;
const skin_03 = `${IMG_BASE_URL}skin_03.png`;
const skin_04 = `${IMG_BASE_URL}skin_04.png`;
const skin_05 = `${IMG_BASE_URL}skin_05.png`;
const skin_06 = `${IMG_BASE_URL}skin_06.png`;
const skin_07 = `${IMG_BASE_URL}skin_07.png`;
// import skin02 from "../Character/face/skin/skin02.png";
// import skin03 from "../Character/face/skin/skin03.png";
// import skin04 from "../Character/face/skin/skin04.png";
// import skin05 from "../Character/face/skin/skin05.png";
// import skin06 from "../Character/face/skin/skin06.png";
// import skin07 from "../Character/face/skin/skin07.png";

//import hair01 from "../Character/face/hair/hair01.png";
const hair_01 = `${IMG_BASE_URL}hair_01.png`;
const hair_02 = `${IMG_BASE_URL}hair_02.png`;
const hair_03 = `${IMG_BASE_URL}hair_03.png`;
const hair_04 = `${IMG_BASE_URL}hair_04.png`;
const hair_05 = `${IMG_BASE_URL}hair_05.png`;
const hair_06 = `${IMG_BASE_URL}hair_06.png`;
const hair_07 = `${IMG_BASE_URL}hair_07.png`;
const hair_08 = `${IMG_BASE_URL}hair_08.png`;
const hair_09 = `${IMG_BASE_URL}hair_09.png`;


const face_01 = `${IMG_BASE_URL}face_01.png`;
const face_02 = `${IMG_BASE_URL}face_02.png`;
const face_03 = `${IMG_BASE_URL}face_03.png`;
const face_04 = `${IMG_BASE_URL}face_04.png`;
const face_05 = `${IMG_BASE_URL}face_05.png`;
const face_06 = `${IMG_BASE_URL}face_06.png`;
const face_07 = `${IMG_BASE_URL}face_07.png`;
const face_08 = `${IMG_BASE_URL}face_08.png`;
const face_09 = `${IMG_BASE_URL}face_09.png`;


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
