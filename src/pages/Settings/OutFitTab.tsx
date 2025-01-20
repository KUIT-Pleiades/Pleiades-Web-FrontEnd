import { useState, useCallback, useMemo } from "react";
import { OutfitImages, OutfitItem } from "../../assets/ImageData/OutfitImage";
import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./FaceTab.module.scss";

const OutFitTab = () => {
	const [outfitTab, setOutfitTab] = useState("전체");
	const { character, updateCharacter } = useCharacterStore();

	const filteredOutfitImages = useMemo(() => {
		if (outfitTab === "전체") {
			return OutfitImages;
		}
		return OutfitImages.filter((image) => image.tags === outfitTab);
	}, [outfitTab]);

	const handleImageClick = useCallback(
		(image: OutfitItem) => {
			switch (image.tags) {
				case "상의":
					updateCharacter({
						outfit: {
							...character.outfit,
							top: {
								name: image.name,
								imgurl: image.src,
							},
						},
					});
					break;
				case "하의":
					updateCharacter({
						outfit: {
							...character.outfit,
							bottom: {
								name: image.name,
								imgurl: image.src,
							},
						},
					});
					break;
				case "신발":
					updateCharacter({
						outfit: {
							...character.outfit,
							shoes: {
								name: image.name,
								imgurl: image.src,
							},
						},
					});
					break;
			}
		},
		[character.outfit, updateCharacter]
	);

	return (
    <div className={s.tabContainer}>
      <div className={s.tab}>
        <button
          onClick={() => setOutfitTab("전체")}
          className={outfitTab === "전체" ? s.active : ""}
        >
          전체
        </button>
        <button
          onClick={() => setOutfitTab("상의")}
          className={outfitTab === "상의" ? s.active : ""}
        >
          상의
        </button>
        <button
          onClick={() => setOutfitTab("하의")}
          className={outfitTab === "하의" ? s.active : ""}
        >
          하의
        </button>
        <button
          onClick={() => setOutfitTab("신발")}
          className={outfitTab === "신발" ? s.active : ""}
        >
          신발
        </button>
      </div>
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {filteredOutfitImages.map((image) => (
            <div
              key={image.name}
              className={`${s.item} ${
                (image.tags === "상의" &&
                  image.src === character.outfit.top.imgurl) ||
                (image.tags === "하의" &&
                  image.src === character.outfit.bottom.imgurl) ||
                (image.tags === "신발" &&
                  image.src === character.outfit.shoes.imgurl)
                  ? s.selected
                  : ""
              }`}
              onClick={() => handleImageClick(image)}
            >
              <img src={image.src} alt={`${image.tags} 이미지`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutFitTab;