import skin01 from "../Character/face/skin/skin01.png"
import skin02 from "../Character/face/skin/skin02.png";
import skin03 from "../Character/face/skin/skin03.png";
import skin04 from "../Character/face/skin/skin04.png";
import skin05 from "../Character/face/skin/skin05.png";
import skin06 from "../Character/face/skin/skin06.png";
import skin07 from "../Character/face/skin/skin07.png";

import hair01 from "../Character/face/hair/hair01.png";
import hair02 from "../Character/face/hair/hair02.png";

import face01 from "../Character/face/face/face01.png";
import face02 from "../Character/face/face/face02.png";

export interface FaceItem {
  id: number;
  src: string;
  tags: string;
}

export const FaceImages: FaceItem[] = [
  {
    id: 1,
    src: skin01,
    tags: "피부"
  },
  {
    id: 2,
    src: skin02,
    tags: "피부"
  },
  {
    id: 3,
    src: skin03,
    tags: "피부"
  },
  {
    id: 4,
    src: skin04,
    tags: "피부"
  },
  {
    id: 5,
    src: skin05,
    tags: "피부"
  },
  {
    id: 6,
    src: skin06,
    tags: "피부"
  },
  {
    id: 7,
    src: skin07,
    tags: "피부"
  },
  {
    id: 8,
    src: hair01,
    tags: "머리"
  },
  {
    id: 9,
    src: hair02,
    tags: "머리"
  },
  {
    id: 10,
    src: face01,
    tags: "표정"
  },
  {
    id: 11,
    src: face02,
    tags: "표정"
  }
]


export const faceCategories = ["전체", "피부색", "머리", "표정"];