import headItem01 from "../Character/item/head/headItem01.png";
import headItem02 from "../Character/item/head/headItem02.png";
import headItem03 from "../Character/item/head/headItem03.png";
import headItem04 from "../Character/item/head/headItem04.png";
import headItem05 from "../Character/item/head/headItem05.png";

import faceItem01 from "../Character/item/face/faceItem01.png";

import earItem01 from "../Character/item/ear/earItem01.png";

import neckItem01 from "../Character/item/neck/neckItem01.png";
import neckItem02 from "../Character/item/neck/neckItem02.png";

import handItem01 from "../Character/item/hand/handItem01.png";
import bag01 from "../Character/item/hand/bag01.png";


export interface Item {
  name: string;
  src: string;
  tags: string;
}

const images = {
  head: {
    headItem01,
    headItem02,
    headItem03,
    headItem04,
    headItem05,
  },
  face: {
    faceItem01,
  },
  ear: {
    earItem01,
  },
  neck: {
    neckItem01,
    neckItem02,
  },
  hand: {
    handItem01,
    bag01,
  },
};

export const ItemImages: Item[] = [
  ...Object.entries(images.head).map(([key, src]) => ({
    name: key,
    src,
    tags: "머리",
  })),
  ...Object.entries(images.face).map(([key, src]) => ({
    name: key,
    src,
    tags: "얼굴",
  })),
  ...Object.entries(images.ear).map(([key, src]) => ({
    name: key,
    src,
    tags: "귀",
  })),
  ...Object.entries(images.neck).map(([key, src]) => ({
    name: key,
    src,
    tags: "목",
  })),
  ...Object.entries(images.hand).map(([key, src]) => ({
    name: key,
    src,
    tags: "손",
  })),
];