export const loadImage = (imgsrc: string, callbackfunc: () => void) => {
  const img = new Image();
  img.src = imgsrc;

  img.onload = () => {
    callbackfunc();
  };

  img.onerror = () => {
    console.log(`${imgsrc} load failed`);
    callbackfunc();
  };
};
