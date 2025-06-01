import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SignalFrom } from "../../interfaces/Interfaces";
import { axiosRequest } from "../../functions/axiosRequest";

export const useSignalManager = () => {
  const navigate = useNavigate();

  const [signalTo, setSignalTo] = useState("");
  const [signalImageIndex, setSignalImageIndex] = useState(0);
  const [isSendSignalPopupVisible, setIsSendSignalPopupVisible] = useState(false);
  const [isReceiveSignalPopupVisible, setIsReceiveSignalPopupVisible] = useState(false);
  const [signalsQueue, setSignalsQueue] = useState<SignalFrom[]>([]);
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);

  const openSendSignalPopup = (friendName: string) => {
    setSignalTo(friendName);
    setIsSendSignalPopupVisible(true);
  };

  const closeSendSignalPopup = () => {
    setSignalTo("");
    setIsSendSignalPopupVisible(false);
  };

  const sendSignal = async (friendId: string, friendName: string) => {
    const randomIndex = Math.floor(Math.random() * 3);
    setSignalImageIndex(randomIndex);
    try {
      const response = await axiosRequest<{ message: string }>("/friends/signals", "POST", {
        receiverId: friendId,
        imageIndex: randomIndex,
      });

      if (response.data.message === "Signal sent successfully" || response.data.message === "You already sent a signal") {
        openSendSignalPopup(friendName);
        console.log("시그널 전송 성공:", response.data.message);
      } else if (response.data.message === "Invalid or expired token") {
        navigate("/login");
      }
    } catch (error) {
      console.error("시그널 전송 중 오류:", error);
    }
  };

  const receiveSignal = async () => {
    try {
      const response = await axiosRequest<{ signals: SignalFrom[] }>("/friends/signals", "GET", null);
      if (response.data.signals.length > 0) {
        setSignalsQueue(response.data.signals);
        setCurrentSignalIndex(0);
        setIsReceiveSignalPopupVisible(true);
      }
    } catch (error) {
      console.error("시그널 수신 실패:", error);
    }
  };

  const closeReceiveSignalPopup = async () => {
    const currentSignal = signalsQueue[currentSignalIndex];
    const nextIndex = currentSignalIndex + 1;

    if (nextIndex < signalsQueue.length) {
      setCurrentSignalIndex(nextIndex);
    } else {
      setSignalsQueue([]);
      setIsReceiveSignalPopupVisible(false);
    }

    await deleteSignal(currentSignal);
  };

  const deleteSignal = async (signal: SignalFrom) => {
    try {
      await axiosRequest(`/friends/signals/${signal.userId}`, "DELETE", null);
    } catch (error) {
      console.error("시그널 삭제 실패:", error);
    }
  };

  useEffect(() => {
    receiveSignal();
  }, []);

  return {
    signalTo,
    signalImageIndex,
    isSendSignalPopupVisible,
    isReceiveSignalPopupVisible,
    signalsQueue,
    currentSignalIndex,
    sendSignal,
    closeSendSignalPopup,
    openSendSignalPopup,
    closeReceiveSignalPopup,
  };
};