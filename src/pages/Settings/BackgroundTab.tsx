import { useCallback } from "react";
import { starBackImages, starBackImg } from "../../assets/ImageData/BackgroundImage";
import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./backgroundTab.module.scss"

const BackgroundTab = () => {
  const { character, updateCharacter } = useCharacterStore();

  const handleImageClick = useCallback(
    (image: starBackImg) => {
      updateCharacter({
        backgroundName: image.name,
      });
    },
    [updateCharacter]
  );

  return (
    <div className={s.tabContainer}>
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {starBackImages.map((image) => (
            <div
              key={image.name}
              className={`${s.item} ${
                  image.name === character.backgroundName
                  ? s.selected
                  : ""
              }`}
              onClick={() => handleImageClick(image)}
            >
              <img src={image.name} alt={`${image.name} 이미지`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BackgroundTab;