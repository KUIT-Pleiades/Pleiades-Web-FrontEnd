// src/hooks/useCreateStationMutation.ts
import { useMutation } from "@tanstack/react-query";
import { axiosRequest } from "../../../functions/axiosRequest";
import { useNavigate } from "react-router-dom";

interface CreateStationInput {
  stationName: string;
  stationIntro: string;
  ampm: "오전" | "오후";
  hour: string;
  minute: string;
  background: string; // 전체 URL
}

interface CreateStationResponse {
  stationId?: string;
  message?: string;
}

export const useCreateStationMutation = () => {
  const navigate = useNavigate();

  return useMutation<CreateStationResponse, Error, CreateStationInput>({
    mutationFn: async ({
      stationName,
      stationIntro,
      ampm,
      hour,
      minute,
      background,
    }) => {
      // 시간 변환
      let numericHour = Number(hour);
      if (ampm === "오후" && numericHour !== 12) numericHour += 12;
      if (ampm === "오전" && numericHour === 12) numericHour = 0;

      const finalHour = numericHour.toString().padStart(2, "0");
      const finalMinute = minute.padStart(2, "0");
      const reportNoticeTime = `${finalHour}:${finalMinute}:00`;

      // 배경 파일명 추출
      const getFileName = (path: string) => {
        const fileName = path.split("/").pop();
        if (!fileName) return "bg_station_1";
        const match = fileName.match(/bg_station_\d+/);
        return match ? match[0] : "bg_station_1";
      };
      const backgroundName = getFileName(background);

      console.log("[CreateStation] 서버 전송 데이터:", {
        stationBackground: backgroundName,
        name: stationName,
        intro: stationIntro,
        reportNoticeTime,
      });

      const response = await axiosRequest<CreateStationResponse>(
        "/stations",
        "POST",
        {
          stationBackground: backgroundName,
          name: stationName,
          intro: stationIntro,
          reportNoticeTime,
        }
      );
      
      if (!response || !response.data.stationId) {
        throw new Error(response?.message || "정거장 생성 실패");
      }
      
      return response.data;
    },
    onSuccess: (data) => {
      console.log("[CreateStation] 정거장 생성 성공 ✅", data);
      sessionStorage.setItem("stationId", data.stationId!);
      navigate("/station/stationinside");
    },
    onError: (error) => {
      console.error("[CreateStation] 정거장 생성 실패 ❌", error.message);
      alert("정거장 생성에 실패했습니다. 다시 시도해주세요.");
    },
  });
};