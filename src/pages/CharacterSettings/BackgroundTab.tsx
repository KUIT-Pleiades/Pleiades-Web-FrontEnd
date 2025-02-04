import { useCallback } from "react";
import {
  starBackImages,
  starBackImg,
} from "../../assets/ImageData/BackgroundImage";
import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./backgroundTab.module.scss";

const BackgroundTab = () => {
  const { userInfo, updateUserInfo } = useCharacterStore();

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
          {starBackImages.map((image, idx) => (
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
