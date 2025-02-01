import { useState, useCallback, useMemo } from "react";
import { FaceImages, FaceItem } from "../../../assets/ImageData/FaceImage";
import { useCharacterStore } from "../../../store/useCharacterStore";
import s from "./characterSetUptab.module.scss";

const FaceTab = () => {
  const [faceTab, setFaceTab] = useState("전체");
  const { character, updateCharacter } = useCharacterStore();

  const filteredFaceImages = useMemo(() => {
    if (faceTab === "전체") {
      return FaceImages;
    }
    return FaceImages.filter((image) => image.tags === faceTab);
  }, [faceTab]);

  const handleImageClick = useCallback(
    (image: FaceItem) => {
      switch (image.tags) {
        case "피부":
          updateCharacter({
            face: {
              ...character.face,
              skinColor: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "머리":
          updateCharacter({
            face: {
              ...character.face,
              hair: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "얼굴":
          updateCharacter({
            face: {
              ...character.face,
              expression: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
      }
    },
    [character.face, updateCharacter]
  );

  return (
    <div className={s.tabContainer}>
      <div className={s.tab}>
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
          className={faceTab === "얼굴" ? s.active : ""}
          onClick={() => setFaceTab("얼굴")}
        >
          얼굴
        </button>
      </div>
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {filteredFaceImages.map((image) => (
            <div
              key={image.name}
              className={`${s.item} ${
                (image.tags === "피부" &&
                  image.src === character.face.skinColor.imgurl) ||
                (image.tags === "머리" &&
                  image.src === character.face.hair.imgurl) ||
                (image.tags === "얼굴" &&
                  image.src === character.face.expression.imgurl)
                  ? s.selected
                  : ""
              }`}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.src}
                alt={`${image.tags} 이미지`}
                style={{
                  ...(image.tags === "머리" && {
                    transform: "scale(1.5)",
                    paddingTop: "15%",
                  }),
                  ...(image.tags === "얼굴" && {
                    transform: "scale(2)",
                    paddingTop: "15%",
                  }),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceTab;
