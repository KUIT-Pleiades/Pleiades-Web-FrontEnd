const IMG_BASE_URL: string = import.meta.env.VITE_IMG_BASE_URL;

/**
 * 파일명에서 카테고리 폴더를 결정합니다.
 * @param name 파일명 (예: face_hair_1.png, fashion_top_1.png, bg_star_1.png)
 * @returns 폴더명 (face, fashion, background)
 */
export const getCategoryFolder = (name: string): string => {
  if (!name) return "face"; // null/undefined 체크
  if (name.startsWith("face_")) return "face";
  if (name.startsWith("bg_")) return "background";
  return "fashion";
};

/**
 * 타입에서 카테고리 폴더를 결정합니다. (Market API 응답용)
 * @param type 아이템 타입 (예: HAIR, TOP, STAR_BG)
 * @returns 폴더명 (face, fashion, background)
 */
export const getCategoryFolderByType = (type: string): string => {
  const faceTypes = ["HAIR", "EYES", "NOSE", "MOUTH", "MOLE"];
  const backgroundTypes = ["STAR_BG", "STATION_BG"];

  if (faceTypes.includes(type)) return "face";
  if (backgroundTypes.includes(type)) return "background";
  return "fashion";
};

/**
 * 원본 이미지 경로를 생성합니다.
 * @param name 파일명
 * @returns 전체 경로 (예: face/face_hair_1.png)
 */
export const getImagePath = (name: string): string => {
  if (!name) return "";
  const folder = getCategoryFolder(name);
  return `${folder}/${name}`;
};

/**
 * 타입 기반 원본 이미지 경로를 생성합니다. (Market API 응답용)
 * @param name 파일명
 * @param type 아이템 타입
 * @returns 전체 경로 (예: face/hair_1.png)
 */
export const getImagePathByType = (name: string, type: string): string => {
  const folder = getCategoryFolderByType(type);
  return `${folder}/${name}`;
};

/**
 * 썸네일 이미지 경로를 생성합니다.
 * @param name 파일명
 * @returns 썸네일 경로 (예: face/thumbnails/rec_face_hair_1.png)
 */
export const getThumbnailPath = (name: string): string => {
  if (!name) return "";
  const folder = getCategoryFolder(name);
  return `${folder}/thumbnails/rec_${name}`;
};

/**
 * 타입 기반 썸네일 이미지 경로를 생성합니다. (Market API 응답용)
 * @param name 파일명
 * @param type 아이템 타입
 * @returns 썸네일 경로 (예: face/thumbnails/rec_hair_1.png)
 */
export const getThumbnailPathByType = (name: string, type: string): string => {
  const folder = getCategoryFolderByType(type);
  return `${folder}/thumbnails/rec_${name}`;
};

/**
 * 전체 이미지 URL을 생성합니다.
 * @param name 파일명
 * @returns 전체 URL
 */
export const getFullImageUrl = (name: string): string => {
  return `${IMG_BASE_URL}${getImagePath(name)}`;
};

/**
 * 전체 썸네일 URL을 생성합니다.
 * @param name 파일명
 * @returns 전체 썸네일 URL
 */
export const getFullThumbnailUrl = (name: string): string => {
  return `${IMG_BASE_URL}${getThumbnailPath(name)}`;
};

/**
 * 배경 이미지 전체 URL을 생성합니다. (기존 getImage 함수 유지)
 * @param itemName 배경 파일명
 * @returns 전체 URL
 */
export function getImage(itemName: string): string {
  return `${IMG_BASE_URL}background/${itemName}`;
}

/**
 * 배경 썸네일 URL을 생성합니다.
 * @param itemName 배경 파일명
 * @returns 전체 썸네일 URL
 */
export function getBackgroundThumbnail(itemName: string): string {
  return `${IMG_BASE_URL}background/thumbnails/rec_${itemName}`;
}

// IMG_BASE_URL도 export (필요한 경우)
export { IMG_BASE_URL };
