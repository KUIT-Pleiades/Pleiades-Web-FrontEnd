import { useState, useCallback, useMemo } from "react";
import { ItemImages, Item } from "../../../assets/ImageData/ItemImage";
import { useCharacterStore } from "../../../store/useCharacterStore";
import s from "./characterSetUptab.module.scss";

const ItemTab = () => {
  const [itemTab, setItemTab] = useState("전체");
  const { character, updateCharacter } = useCharacterStore();
  
  const filteredItemImages = useMemo(() => {
    if (itemTab === "전체") {
      return ItemImages;
    }
    return ItemImages.filter((image)=> image.tags === itemTab);
  }, [itemTab])

  const handleImageClick = useCallback(
    (image: Item) => {
      const isEquipped =
        (image.code === "1" && image.src === character.item.head.imgurl) ||
        (image.code === "2" && image.src === character.item.eyes.imgurl) ||
        (image.code === "3" && image.src === character.item.ears.imgurl) ||
        (image.code === "4" && image.src === character.item.neck.imgurl) ||
        (image.code === "5" && image.src === character.item.leftWrist.imgurl) ||
        (image.code === "6" && image.src === character.item.rightWrist.imgurl) ||
        (image.code === "7" && image.src === character.item.leftHand.imgurl) ||
        (image.tags === "8" && image.src === character.item.rightHand.imgurl);

      // 이미 착용중이면 해제
      if (isEquipped) {
        switch (image.code) {
          case "1":
            updateCharacter({
              item: {
                ...character.item,
                head: { name: "", imgurl: "" },
              },
            });
            break;
          case "2":
            updateCharacter({
              item: {
                ...character.item,
                eyes: { name: "", imgurl: "" },
              },
            });
            break;
          case "3":
            updateCharacter({
              item: {
                ...character.item,
                ears: { name: "", imgurl: "" },
              },
            });
            break;
          case "4":
            updateCharacter({
              item: {
                ...character.item,
                neck: { name: "", imgurl: "" },
              },
            });
            break;
          case "5":
            updateCharacter({
              item: {
                ...character.item,
                leftWrist: { name: "", imgurl: "" },
              },
            });
            break;
          case "6":
            updateCharacter({
              item: {
                ...character.item,
                rightWrist: { name: "", imgurl: "" },
              },
            });
            break;
          case "7":
            updateCharacter({
              item: {
                ...character.item,
                leftHand: { name: "", imgurl: "" },
              },
            });
            break;
          case "8":
            updateCharacter({
              item: {
                ...character.item,
                rightHand: { name: "", imgurl: "" },
              },
            });
            break;
        }
        return;
      }

      switch (image.code) {
        case "1":
          updateCharacter({
            item: {
              ...character.item,
              head: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "2":
          updateCharacter({
            item: {
              ...character.item,
              eyes: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "3":
          updateCharacter({
            item: {
              ...character.item,
              ears: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "4":
          updateCharacter({
            item: {
              ...character.item,
              neck: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "5":
          updateCharacter({
            item: {
              ...character.item,
              leftWrist: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "6":
          updateCharacter({
            item: {
              ...character.item,
              rightWrist: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "7":
          updateCharacter({
            item: {
              ...character.item,
              leftHand: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "8":
          updateCharacter({
            item: {
              ...character.item,
              rightHand: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
      }
    },
    [character.item, updateCharacter]
  );

  return (
    <div className={s.tabContainer}>
      <div className={s.tab}>
        <button
          onClick={() => setItemTab("전체")}
          className={itemTab === "전체" ? s.active : ""}
        >
          전체
        </button>
        <button
          className={itemTab === "acc" ? s.active : ""}
          onClick={() => setItemTab("acc")}
        >
          악세서리
        </button>
        <button
          className={itemTab === "fas" ? s.active : ""}
          onClick={() => setItemTab("fas")}
        >
          패션
        </button>
        <button
          className={itemTab === "etc" ? s.active : ""}
          onClick={() => setItemTab("etc")}
        >
          기타
        </button>
      </div>
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {filteredItemImages.map((image) => (
            <div
              key={image.name}
              className={`${s.item} ${
                (image.code === "1" &&
                  image.src === character.item.head.imgurl) ||
                (image.code === "2" &&
                  image.src === character.item.eyes.imgurl) ||
                (image.code === "3" &&
                  image.src === character.item.ears.imgurl) ||
                (image.code === "4" &&
                  image.src === character.item.neck.imgurl) ||
                (image.code === "5" &&
                  image.src === character.item.leftWrist.imgurl) ||
                (image.code === "6" &&
                  image.src === character.item.rightWrist.imgurl) ||
                (image.code === "7" &&
                  image.src === character.item.leftHand.imgurl) ||
                (image.code === "8" &&
                  image.src === character.item.rightHand.imgurl)
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
}

export default ItemTab;