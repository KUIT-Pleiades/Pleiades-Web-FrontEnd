const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const background_01 = `${IMG_BASE_URL}background_01.png`;
const background_02 = `${IMG_BASE_URL}background_02.png`;
const background_03 = `${IMG_BASE_URL}background_03.png`;
const background_04 = `${IMG_BASE_URL}background_04.png`;
const background_05 = `${IMG_BASE_URL}background_05.png`;

export interface starBackImg {
  name: string;
  src: string;
}

const images = {
  starBack: {
    background_01,
    background_02,
    background_03,
    background_04,
    background_05,
  },
};

export const starBackImages: starBackImg[] = [
  ...Object.entries(images.starBack).map(([keyof, src]) => ({
    name: keyof,
    src,
  })),
];
