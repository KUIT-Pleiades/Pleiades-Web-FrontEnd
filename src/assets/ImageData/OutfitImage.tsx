const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const top_01 = `${IMG_BASE_URL}top_01.png`;
const top_02 = `${IMG_BASE_URL}top_02.png`;
const top_03 = `${IMG_BASE_URL}top_03.png`;
const top_04 = `${IMG_BASE_URL}top_04.png`;
const top_05 = `${IMG_BASE_URL}top_05.png`;
const top_06 = `${IMG_BASE_URL}top_06.png`;
const top_07 = `${IMG_BASE_URL}top_07.png`;
const top_08 = `${IMG_BASE_URL}top_08.png`;
const top_09 = `${IMG_BASE_URL}top_09.png`;


const bottom_01 = `${IMG_BASE_URL}bottom_01.png`;
const bottom_02 = `${IMG_BASE_URL}bottom_02.png`;
const bottom_03 = `${IMG_BASE_URL}bottom_03.png`;
const bottom_04 = `${IMG_BASE_URL}bottom_04.png`;
const bottom_05 = `${IMG_BASE_URL}bottom_05.png`;
const bottom_06 = `${IMG_BASE_URL}bottom_06.png`;
const bottom_07 = `${IMG_BASE_URL}bottom_07.png`;
const bottom_08 = `${IMG_BASE_URL}bottom_08.png`;

const shoes_01 = `${IMG_BASE_URL}shoes_01.png`;
const shoes_02 = `${IMG_BASE_URL}shoes_02.png`;
const shoes_03 = `${IMG_BASE_URL}shoes_03.png`;
const shoes_04 = `${IMG_BASE_URL}shoes_04.png`;
const shoes_05 = `${IMG_BASE_URL}shoes_05.png`;
const shoes_06 = `${IMG_BASE_URL}shoes_06.png`;
const shoes_07 = `${IMG_BASE_URL}shoes_07.png`;
const shoes_08 = `${IMG_BASE_URL}shoes_08.png`;
const shoes_09 = `${IMG_BASE_URL}shoes_09.png`;



export interface OutfitItem {
  name: string;
  src: string;
  tags: string;
}

const images = {
  top: {
    top_01,
    top_02,
    top_03,
    top_04,
    top_05,
    top_06,
    top_07,
    top_08,
    top_09,
  },
  bottom: {
    bottom_01,
    bottom_02,
    bottom_03,
    bottom_04,
    bottom_05,
    bottom_06,
    bottom_07,
    bottom_08,
  },
  shoes: {
    shoes_01,
    shoes_02,
    shoes_03,
    shoes_04,
    shoes_05,
    shoes_06,
    shoes_07,
    shoes_08,
    shoes_09,
  },
};

export const OutfitImages: OutfitItem[] = [
  ...Object.entries(images.top).map(([key, src]) => ({
    name: key,
    src,
    tags: "상의",
  })),
  ...Object.entries(images.bottom).map(([key, src]) => ({
    name: key,
    src,
    tags: "하의",
  })),
  ...Object.entries(images.shoes).map(([key, src]) => ({
    name: key,
    src,
    tags: "신발",
  })),
];

export const outfitCategories = ["전체", "상의", "하의", "신발"];
