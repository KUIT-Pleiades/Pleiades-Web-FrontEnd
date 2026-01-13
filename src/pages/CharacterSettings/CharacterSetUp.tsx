import s from "./CharacterSetUp.module.scss";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../assets/btnImg/resetBtn.svg";
import { useState, useEffect } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";
import Pending from "../PageManagement/Pending";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../interfaces/Interfaces";

// --- [추가] 새로운 탭과 관련된 파일들을 가져옵니다. ---
import { FACE_TABS, FASHION_TABS } from "../../constants/characterTabs";
import FaceItems from "./characterSetUpTab/FaceItems";
import FashionItems from "./characterSetUpTab/FashionItems";
import { IMG_BASE_URL, getImagePath } from "../../functions/getImage";

interface CharacterSetUpProps {
  onNext: () => void;
}

const CharacterSetUp = ({ onNext }: CharacterSetUpProps) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("face");
  const [load, setLoad] = useState(false);
  const { userInfo, resetUserInfo } = useCharacterStore();

  // 선택된 아이템의 설명
  const [selectedDescription, setSelectedDescription] = useState("");

  // 초기 유저 정보 저장 (세트 -> 상의/하의 전환 시 복구용)
  const [initialUserInfo, setInitialUserInfo] = useState<UserInfo>(() =>
    structuredClone(userInfo)
  );

  // userInfo가 변경될 때 초기값 동기화
  useEffect(() => {
    setInitialUserInfo(structuredClone(userInfo));
  }, []);

  const increaseLoadCount = () => {
    setLoad(true);
  };

  const handlePrev = () => {
    navigate(-1);
  };

  // 아이템 선택 시 설명 업데이트
  const handleItemSelect = (description: string) => {
    setSelectedDescription(description);
  };

  // --- [추가] 세트 의상 착용 여부를 확인하는 변수입니다. ---
  const isWearingSet = !!userInfo.outfit.set;

  // 레이어 순서: 액세서리>얼굴>머리>상의>하의>신발>피부

  return (
    <div className={s.characterSetUpContainer}>
      {!load && <Pending />}
      <div className={s.showCharacter}>
        <button className={s.previousBtn} onClick={handlePrev}>
          취소
        </button>
        <p className={s.pHeader}>캐릭터 꾸미기</p>
        <button className={s.nextBtn} onClick={onNext}>
          다음
        </button>
        <p className={s.pDescription}>내 캐릭터는 어떤 모습인가요?</p>
        <div className={s.characterContainer}>
          {/* --- 얼굴 --- */}
          <img
            className={s.characterSkin}
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.skinColor)}`}
            alt="skin"
          />
          <img
            className={s.characterEyes} // 눈
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.eyes)}`}
            alt="eyes"
          />
          <img
            className={s.characterNose} // 코
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.nose)}`}
            alt="nose"
          />
          <img
            className={s.characterMouth} // 입
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.mouth)}`}
            alt="mouth"
          />
          <img
            className={s.characterHair} // 머리카락
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.hair)}`}
            alt="hair"
          />
          {userInfo.face.mole && (
            <img
              className={s.characterMole} // 점
              src={`${IMG_BASE_URL}${getImagePath(userInfo.face.mole)}`}
              alt="mole"
            />
          )}
          {/* --- 패션 --- */}
          {/* 세트 미착용 시 상의/하의 표시 */}
          {!isWearingSet && (
            <>
              <img
                className={s.characterTop} // 상의
                src={`${IMG_BASE_URL}${getImagePath(userInfo.outfit.top)}`}
                alt="top"
              />
              <img
                className={s.characterBottom} // 하의
                src={`${IMG_BASE_URL}${getImagePath(userInfo.outfit.bottom)}`}
                alt="bottom"
              />
            </>
          )}
          {/* 세트 착용 시 세트 의상 표시 */}
          {isWearingSet && (
            <img
              className={s.characterSet} // 세트 의상
              src={`${IMG_BASE_URL}${getImagePath(userInfo.outfit.set)}`}
              alt="set"
            />
          )}
          <img
            className={s.characterShoes} // 신발
            src={`${IMG_BASE_URL}${getImagePath(userInfo.outfit.shoes)}`}
            alt="shoes"
          />
          {/* --- 아이템 --- */}
          {Object.entries(userInfo.item).map(([part, src]) => {
            // src가 없으면 (착용하지 않은 아이템이면) 렌더링하지 않습니다.
            if (!src) return null;

            // part는 'head', 'ears', 'neck' 등의 문자열이 됩니다.
            // 이 part를 이용해 동적으로 className을 적용합니다.
            return (
              <img
                key={part}
                // s.head, s.ears 와 같이 동적으로 클래스 이름을 매핑합니다.
                className={s[part]}
                src={`${IMG_BASE_URL}${getImagePath(src)}`}
                alt={part}
              />
            );
          })}
        </div>
        <img
          className={s.characterBackground}
          src={characterBackground}
          alt="캐릭터후광"
        />
        <img
          className={s.resetBtn}
          src={resetBtn}
          alt="리셋 버튼"
          onClick={resetUserInfo}
        />
        <div
          className={s.itemName}
          style={{
            visibility: selectedDescription ? "visible" : "hidden",
          }}
        >
          <p>{selectedDescription}</p>
        </div>
      </div>
      <div className={s.setCharacter}>
        <div className={s.menuBar}>
          <button
            className={`${s.menuItem} ${
              currentTab === "face" ? s.active : s.inactive
            }`}
            onClick={() => setCurrentTab("face")}
          >
            얼굴
          </button>
          <button
            className={`${s.menuItem} ${
              currentTab === "fashion" ? s.active : s.inactive
            }`}
            onClick={() => setCurrentTab("fashion")}
          >
            패션
          </button>
        </div>
        <div className={s.contentArea}>
          {currentTab === "face" && (
            <FaceItems
              tabs={FACE_TABS}
              increaseLoadCount={increaseLoadCount}
              onItemSelect={handleItemSelect}
            />
          )}
          {currentTab === "fashion" && (
            <FashionItems
              tabs={FASHION_TABS}
              increaseLoadCount={increaseLoadCount}
              initialOutfit={initialUserInfo.outfit}
              onItemSelect={handleItemSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSetUp;
