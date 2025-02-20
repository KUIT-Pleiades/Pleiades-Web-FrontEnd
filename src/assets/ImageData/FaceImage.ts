const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const skinURLs: Record<string, string> = {};
for (let i = 1; i < 8; i++) {
  const num = i.toString().padStart(2, "0");
  skinURLs[`skin_${num}`] = `${IMG_BASE_URL}skin_${num}.png`;
}

const hairURLs: Record<string, string> = {};
for (let i = 1; i < 24; i++) {
  const num = i.toString().padStart(2, "0");
  hairURLs[`hair_${num}`] = `${IMG_BASE_URL}hair_${num}.png`;
}

const faceURLs: Record<string, string> = {};
for (let i = 1; i < 20; i++) {
  const num = i.toString().padStart(2, "0");
  faceURLs[`face_${num}`] = `${IMG_BASE_URL}face_${num}.png`;
}

export interface FaceItem {
  name: string;
  src: string;
  tags: string;
}

const images = {
  skin: skinURLs,
  hair: hairURLs,
  face: faceURLs,
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
