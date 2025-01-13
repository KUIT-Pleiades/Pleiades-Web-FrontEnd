import { useState, useCallback, useMemo } from "react";
import { FaceImages, FaceItem } from "../../assets/ImageData/FaceImage";
import s from "./FaceTab.module.scss";

const FaceTab = () => {
  const [faceTab, setFaceTab] = useState("전체");

  const [selectedSkin, setSelectedSkin] = useState(FaceImages[0]);
  const [selectedHair, setSelectedHair] = useState(FaceImages[8]);
  const [selectedFace, setSelectedFace] = useState(FaceImages[9]);

  const filteredFaceImages = useMemo(() => {
    if (faceTab === "전체") {
      return FaceImages;
    }
    return FaceImages.filter((image) => image.tags === faceTab);
  }, [faceTab]); // faceTab이 변경될 때만 재계산

  const handleImageClick = useCallback((image: FaceItem) => {
    switch (image.tags) {
      case "피부":
        setSelectedSkin(image);
        break;
      case "머리":
        setSelectedHair(image);
        break;
      case "표정":
        setSelectedFace(image);
        break;
    }
  }, []);

  return (
    <div className={s.faceTabContainer}>
      <div className={s.faceTab}>
        <button
          onClick={() => setFaceTab("전체")}
          className={faceTab === "전체" ? s.active : ""}
        >
          전체
        </button>
        <button
          className={faceTab === "피부" ? s.active : ""}
          onClick={() => setFaceTab("피부")}
        >
          피부색
        </button>
        <button
          className={faceTab === "머리" ? s.active : ""}
          onClick={() => setFaceTab("머리")}
        >
          머리
        </button>
        <button
          className={faceTab === "표정" ? s.active : ""}
          onClick={() => setFaceTab("표정")}
        >
          표정
        </button>
      </div>
      <div className={s.gridItems}>
        {filteredFaceImages.map((image) => (
          <div
            key={image.id}
            className={`${s.item} ${
              (image.tags === "피부" && image === selectedSkin) ||
              (image.tags === "머리" && image === selectedHair) ||
              (image.tags === "표정" && image === selectedFace)
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
  );
};

export default FaceTab;
