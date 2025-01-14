import skin01 from "../Character/face/skin/skin01.png"
import skin02 from "../Character/face/skin/skin02.png";
import skin03 from "../Character/face/skin/skin03.png";
import skin04 from "../Character/face/skin/skin04.png";
import skin05 from "../Character/face/skin/skin05.png";
import skin06 from "../Character/face/skin/skin06.png";
import skin07 from "../Character/face/skin/skin07.png";

import hair01 from "../Character/face/hair/hair01.png";
import hair02 from "../Character/face/hair/hair02.png";
import hair03 from "../Character/face/hair/hair03.png";
import hair04 from "../Character/face/hair/hair04.png";

import face01 from "../Character/face/face/face01.png";
import face02 from "../Character/face/face/face02.png";
import face03 from "../Character/face/face/face03.png";
import face04 from "../Character/face/face/face04.png";

export interface FaceItem {
  id: number;
  src: string;
  tags: string;
}

const images = {
  skin: {
    skin01,
    skin02,
    skin03,
    skin04,
    skin05,
    skin06,
    skin07,
  },
  hair: {
    hair01,
    hair02,
    hair03,
    hair04,
  },
  face: {
    face01,
    face02,
    face03,
    face04,
  },
};
// FaceImages 배열 생성
export const FaceImages: FaceItem[] = [
  ...Object.values(images.skin).map((src, index) => ({
    id: index + 1,
    src,
    tags: "피부",
  })),
  ...Object.values(images.hair).map((src, index) => ({
    id: index + 8,
    src,
    tags: "머리",
  })),
  ...Object.values(images.face).map((src, index) => ({
    id: index + 12,
    src,
    tags: "표정",
  })),
];

export const faceCategories = ["전체", "피부색", "머리", "표정"];