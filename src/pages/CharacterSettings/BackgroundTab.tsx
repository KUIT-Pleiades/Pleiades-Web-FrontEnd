import { useCallback, useEffect, useState } from "react";
import {
  starBackImages,
  starBackImg,
} from "../../assets/ImageData/BackgroundImage";
import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./backgroundTab.module.scss";
import { imgTabProps } from "./characterSetUpTab/FaceTab";

const BackgroundTab = ({ increaseLoadCount }: imgTabProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const NUM_OF_IMG = starBackImages.length;
    starBackImages.forEach(({ src }) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        setCount(count + 1);
        if (count === NUM_OF_IMG) {
          increaseLoadCount();
        }
      };

      img.onerror = () => {
        console.log(`${src} load failed`);
        setCount(count + 1);
        if (count === NUM_OF_IMG) {
          increaseLoadCount();
        }
      };
    });
  }, [count, increaseLoadCount]);

  const handleImageClick = useCallback(
    (image: starBackImg) => {
      updateUserInfo({
        starBackground: image.starBackground,
      });
    },
    [updateUserInfo]
  );

  return (
    <div className={s.tabContainer}>
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {starBackImages.slice(0, 4).map((image, idx) => (
            <div
              key={idx}
              className={`${s.item} ${
                image.starBackground === userInfo.starBackground
                  ? s.selected
                  : ""
              }`}
              onClick={() => handleImageClick(image)}
            >
              <img src={image.src} alt={`${image.starBackground} 이미지`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundTab;
