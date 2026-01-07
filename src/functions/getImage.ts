export function getImage(itemName: string) {
  const PINATA_ENDPOINT = import.meta.env.VITE_IMG_BASE_URL;
  const requestPoint = `${PINATA_ENDPOINT}${itemName}`;
  return requestPoint;
}
