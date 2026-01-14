import { useCallback, useEffect } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";
import { useStarBackgroundsQuery } from "./hooks/useStarBackgroundsQuery";
import { getBackgroundThumbnail } from "../../functions/getImage";
import s from "./backgroundTab.module.scss";

interface BackgroundTabProps {
  increaseLoadCount: () => void;
  onItemSelect?: (description: string) => void;
}

const BackgroundTab = ({ increaseLoadCount, onItemSelect }: BackgroundTabProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const { data: backgrounds, isLoading, isError } = useStarBackgroundsQuery();

  // 이미지 로딩 로직
  useEffect(() => {
    if (isLoading) return;

    if (!backgrounds || backgrounds.length === 0) {
      increaseLoadCount();
      return;
    }

    let loadedCount = 0;
    const NUM_OF_IMG = backgrounds.length;

    backgrounds.forEach((bg) => {
      const img = new Image();
      img.src = getBackgroundThumbnail(bg.name);

      const onImageLoadOrError = () => {
        loadedCount++;
        if (loadedCount === NUM_OF_IMG) {
          increaseLoadCount();
        }
      };

      img.onload = onImageLoadOrError;
      img.onerror = () => {
        console.error(`${bg.name} load failed`);
        onImageLoadOrError();
      };
    });
  }, [backgrounds, isLoading, increaseLoadCount]);

  const handleImageClick = useCallback(
    (imageName: string, description: string) => {
      updateUserInfo({
        starBackground: imageName,
      });
      onItemSelect?.(description);
    },
    [updateUserInfo, onItemSelect]
  );

  if (isLoading) {
    return (
      <div className={s.tabContainer}>
        <div className={s.tabContent}>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={s.tabContainer}>
        <div className={s.tabContent}>
          <p>배경을 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={s.tabContainer}>
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {backgrounds?.map((bg) => (
            <div
              key={bg.id}
              className={`${s.item} ${
                bg.name === userInfo.starBackground ? s.selected : ""
              }`}
              onClick={() => handleImageClick(bg.name, bg.description)}
            >
              <img src={getBackgroundThumbnail(bg.name)} alt={bg.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundTab;
