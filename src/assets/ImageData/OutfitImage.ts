const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const topURLs: Record<string, string> = {};
for (let i = 1; i < 13; i++) {
  const num = i.toString().padStart(2, "0");
  topURLs[`top_${num}`] = `${IMG_BASE_URL}top_${num}.png`;
}

const bottomURLs: Record<string, string> = {};
for (let i = 1; i < 17; i++) {
  const num = i.toString().padStart(2, "0");
  bottomURLs[`bottom_${num}`] = `${IMG_BASE_URL}bottom_${num}.png`;
}

const shoesURLs: Record<string, string> = {};
for (let i = 1; i < 10; i++) {
  const num = i.toString().padStart(2, "0");
  shoesURLs[`shoes_${num}`] = `${IMG_BASE_URL}shoes_${num}.png`;
}

export interface OutfitItem {
  name: string;
  src: string;
  tags: string;
}

const images = {
  top: topURLs,
  bottom: bottomURLs,
  shoes: shoesURLs,
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
