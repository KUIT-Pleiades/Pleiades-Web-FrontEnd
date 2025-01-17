import { useCallback } from "react";
import { ItemImages, Item } from "../../assets/ImageData/ItemImage";
import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./FaceTab.module.scss";

const ItemTab = () => {
	const { character, updateCharacter } = useCharacterStore();

  const handleImageClick = useCallback(
    (image: Item) => {
      const isEquipped =
        (image.tags === "머리" && image.src === character.item.head.imgurl) ||
        (image.tags === "얼굴" && image.src === character.item.face.imgurl) ||
        (image.tags === "귀" && image.src === character.item.ear.imgurl) ||
        (image.tags === "목" && image.src === character.item.neck.imgurl) ||
        (image.tags === "손" && image.src === character.item.hand.imgurl);

      // 이미 착용중이면 해제
      if (isEquipped) {
        switch (image.tags) {
          case "머리":
            updateCharacter({
              item: {
                ...character.item,
                head: { name: "", imgurl: "" },
              },
            });
            break;
          case "얼굴":
            updateCharacter({
              item: {
                ...character.item,
                face: { name: "", imgurl: "" },
              },
            });
            break;
          case "귀":
            updateCharacter({
              item: {
                ...character.item,
                ear: { name: "", imgurl: "" },
              },
            });
            break;
          case "목":
            updateCharacter({
              item: {
                ...character.item,
                neck: { name: "", imgurl: "" },
              },
            });
            break;
          case "손":
            updateCharacter({
              item: {
                ...character.item,
                hand: { name: "", imgurl: "" },
              },
            });
            break;
        }
        return;
      }

      switch (image.tags) {
        case "머리":
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
        case "얼굴":
          updateCharacter({
            item: {
              ...character.item,
              face: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "귀":
          updateCharacter({
            item: {
              ...character.item,
              ear: {
                name: image.name,
                imgurl: image.src,
              },
            },
          });
          break;
        case "목":
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
        case "손":
          updateCharacter({
            item: {
              ...character.item,
              hand: {
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
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {ItemImages.map((image) => (
            <div
              key={image.name}
              className={`${s.item} ${
                (image.tags === "머리" &&
                  image.src === character.item.head.imgurl) ||
                (image.tags === "얼굴" &&
                  image.src === character.item.face.imgurl) ||
                (image.tags === "귀" &&
                  image.src === character.item.ear.imgurl) ||
                (image.tags === "목" &&
                  image.src === character.item.neck.imgurl) ||
                (image.tags === "손" && image.src === character.item.hand.imgurl)
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