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
import hair05 from "../Character/face/hair/hair05.png";
import hair06 from "../Character/face/hair/hair06.png";
import hair07 from "../Character/face/hair/hair07.png";
import hair08 from "../Character/face/hair/hair08.png";

import face01 from "../Character/face/face/face01.png";
import face02 from "../Character/face/face/face02.png";
import face03 from "../Character/face/face/face03.png";
import face04 from "../Character/face/face/face04.png";
import face05 from "../Character/face/face/face05.png";
import face06 from "../Character/face/face/face06.png";
import face07 from "../Character/face/face/face07.png";
import face08 from "../Character/face/face/face08.png";

export interface FaceItem {
  name: string;
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
    hair05,
    hair06,
    hair07,
    hair08,
  },
  face: {
    face01,
    face02,
    face03,
    face04,
    face05,
    face06,
    face07,
    face08,
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
    tags: "표정",
  })),
];

//export const faceCategories = ["전체", "피부색", "머리", "표정"];