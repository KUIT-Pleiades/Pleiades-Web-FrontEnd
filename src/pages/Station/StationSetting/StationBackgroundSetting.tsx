import React, { useState, useEffect } from "react";
import s from "./CreateStation.module.scss";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../../../functions/axiosRequest";

import SetStationBackground from "./SetStationBackground/SetStationBackground";
import { useStationBackgroundsQuery } from "../hooks/useStationBackgroundsQuery";

const StationBackgroundSetting: React.FC = () => {
  const navigate = useNavigate();

  // 정거장 배경 API 데이터
  const { data: bgData, isLoading } = useStationBackgroundsQuery();

  const [background, setBackground] = useState("");

  // API 데이터가 로드되면 첫 번째 배경을 기본값으로 설정
  useEffect(() => {
    if (bgData?.backgrounds && bgData.backgrounds.length > 0 && !background) {
      setBackground(bgData.backgrounds[0]);
    }
  }, [bgData, background]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBackgroundComplete = async () => {
    // 이미지 파일명 추출 함수
    const getFileName = (path: string) => {
      const fileName = path.split("/").pop();
      if (!fileName) return "bg_station_1.png";
      const match = fileName.match(/bg_station_\d+\.png/);
      return match ? match[0] : "bg_station_1.png";
    };

    const stationId = sessionStorage.getItem("stationId");
    if (!stationId) {
      console.error("stationId not found in sessionStorage");
      return;
    }

    const backgroundName = getFileName(background);
    console.log("backgroundName: ", backgroundName);

    try {
      // 서버에 배경 데이터 전송
      const response = await axiosRequest<{
        message?: string;
      }>(`/stations/${stationId}/background`, "PATCH", {
        stationBackground: backgroundName,
      });

      if (response) {
        console.log("배경 설정 성공:", response);
        navigate(-1);
      } else {
        console.log("배경 설정 실패. 응답: ", response);
      }
    } catch (error: unknown) {
      console.error("배경 설정 중 오류:", error);

      if (error instanceof Error) {
        console.log(`배경 설정 중 오류 발생: ${error.message}`);
      } else {
        console.log("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  if (isLoading || !bgData) {
    return (
      <div className={s.container}>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <SetStationBackground
        backgrounds={bgData.backgrounds}
        backgroundPrevs={bgData.backgroundPrevs}
        descriptions={bgData.descriptions}
        background={background}
        setBackground={setBackground}
        handleBack={handleBack}
        handleComplete={handleBackgroundComplete}
      />
    </div>
  );
};

export default StationBackgroundSetting;