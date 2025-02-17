import { useState, useEffect } from "react";
import { fetchRequest } from "../../../functions/fetchRequest";
import s from "./StationSlide.module.scss"
import planetIcon from "../../../assets/Icon/planet.svg"
import stationBackgroundImg_01 from "../../../assets/backgroundImg/stationbackgroundImg/stationBackgroundImg_01.png"

interface StationMember {
  userId: string;
  userName: string;
  character: string;
  profile: string;
  positionX: number;
  positionY: number;
  todayReport: boolean;
}

interface StationResponse {
  stationId: string;
  adminUserId: string;
  name: string;
  intro: string;
  numOfUsers: number;
  stationBackground: string;
  reportNoticeTime: string;
  reportWritten: boolean;
  stationMembers: StationMember[];
}

const StationSlide: React.FC = () => {
  const [stationData, setStationData] = useState<StationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const stationId = "ABCDEF"; // 실제 stationId 필요

  useEffect(() => {
    const getStationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchRequest<StationResponse>(
          `/stations/${stationId}`,
          "GET",
          null
        );
        if (response) {
          setStationData(response);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    getStationData();
  }, [stationId]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!stationData) return null;

  return (
    <div className={s.container}>
      <div className={s.overlay}>
        <div className={s.slide}>
          <div className={s.headerContainer}>
            <div
              className={s.background}
              style={{
                backgroundImage: `url(${stationBackgroundImg_01})`,
              }}
            ></div>
            <div className={s.planetIcon}>
              <img src={planetIcon} alt="" />
            </div>
            <div className={s.header}>
              <h2>[{stationData.name}]</h2>
							<p>{stationData.intro}</p>
							<div className={s.codeCopy}>정거장 코드 복사</div>
            </div>
          </div>

          <div className={s.content}>
            <div className={s.settingButton}>
              정거장 설정
              <span className={s.arrow}>›</span>
            </div>

            <div className={s.memberSection}>
              <div className={s.memberTitle}>
                멤버 ({stationData.numOfUsers})
              </div>
              <button className={s.addMemberButton}>
                <span>+</span> 친구 초대하기
              </button>

              <div className={s.memberList}>
                {stationData.stationMembers.map((member) => (
                  <div key={member.userId} className={s.memberItem}>
                    <div className={s.avatar}>
                      <img src={member.profile} alt="profile" />
                    </div>
                    <div className={s.memberInfo}>
                      <div>{member.userName}</div>
                      <div className={s.memberHandle}>@{member.userId}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className={s.bottomButton}>우주정거장 폭파 및 나가기</button>
        </div>
      </div>
    </div>
  );
};

export default StationSlide;
