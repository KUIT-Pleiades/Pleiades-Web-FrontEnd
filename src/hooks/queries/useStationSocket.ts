import { useEffect, useRef, useCallback, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

interface MemberPosition {
  userId: string;
  x: number;
  y: number;
}

interface UseStationSocketProps {
  stationId: string;
  userId: string;
  onMemberMoved: (targetUserId: string, x: number, y: number) => void;
  onMemberJoined: (userId: string) => void;
  onMemberLeft: (userId: string) => void;
  onMemberAdded: (userId: string, x: number, y: number) => void;
  onMemberRemoved: (userId: string) => void;
  onLockResult: (targetUserId: string, success: boolean, lockedBy?: string) => void;
  onCharacterLocked: (targetUserId: string, lockedBy: string) => void;
  onCharacterUnlocked: (targetUserId: string) => void;
  onInitialMembers: (members: MemberPosition[]) => void;
}

export const useStationSocket = ({
  stationId,
  userId,
  onMemberMoved,
  onMemberJoined,
  onMemberLeft,
  onMemberAdded,
  onMemberRemoved,
  onLockResult,
  onCharacterLocked,
  onCharacterUnlocked,
  onInitialMembers,
}: UseStationSocketProps) => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!stationId || !userId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_BASE_URL}/ws`),
      connectHeaders: {
        userId: userId,
        stationId: stationId,
      },
      onConnect: () => {
        setIsConnected(true);

        // 정거장 토픽 구독 (브로드캐스트)
        client.subscribe(`/topic/station/${stationId}`, (message) => {
          const data = JSON.parse(message.body);
          
          switch (data.type || getEventType(data)) {
            case "UserMovedEvent":
              onMemberMoved(data.targetUserId, data.x, data.y);
              break;
            case "UserJoinedEvent":
              onMemberJoined(data.userId);
              break;
            case "UserLeftEvent":
              onMemberLeft(data.userId);
              break;
            case "MemberAddedEvent":
              onMemberAdded(data.userId, data.x, data.y);
              break;
            case "MemberRemovedEvent":
              onMemberRemoved(data.userId);
              break;
            case "CharacterLockedEvent":
              onCharacterLocked(data.targetUserId, data.lockedBy);
              break;
            case "CharacterUnlockedEvent":
              onCharacterUnlocked(data.targetUserId);
              break;
          }
        });

        // 개인 큐 구독 (잠금 결과)
        client.subscribe(`/user/queue/lockResult`, (message) => {
          const data = JSON.parse(message.body);
          onLockResult(data.targetUserId, data.success, data.lockedBy);
        });

        // 개인 큐 구독 (초기 멤버 목록)
        client.subscribe(`/user/queue/stationMembers`, (message) => {
          const data = JSON.parse(message.body);
          onInitialMembers(data.members);
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [stationId, userId]);

  // 이벤트 타입 추론 (서버에서 type 필드 안 보내는 경우)
  const getEventType = (data: Record<string, unknown>): string => {
    if ("targetUserId" in data && "x" in data && "movedBy" in data) return "UserMovedEvent";
    if ("targetUserId" in data && "lockedBy" in data && !("x" in data)) return "CharacterLockedEvent";
    if ("targetUserId" in data && !("lockedBy" in data)) return "CharacterUnlockedEvent";
    if ("userId" in data && "x" in data) return "MemberAddedEvent";
    if ("userId" in data) {
      // UserJoinedEvent, UserLeftEvent, MemberRemovedEvent 구분 어려움
      // 서버에서 type 필드 추가하는 게 좋음
      return "UserJoinedEvent";
    }
    return "Unknown";
  };

  const dragStart = useCallback((targetUserId: string) => {
    if (!clientRef.current?.connected) return;
    
    clientRef.current.publish({
      destination: `/app/station/${stationId}/dragStart`,
      body: JSON.stringify({ targetUserId }),
    });
  }, [stationId]);

  const move = useCallback((targetUserId: string, x: number, y: number) => {
    if (!clientRef.current?.connected) return;
    
    clientRef.current.publish({
      destination: `/app/station/${stationId}/move`,
      body: JSON.stringify({ targetUserId, x, y }),
    });
  }, [stationId]);

  const dragEnd = useCallback((targetUserId: string) => {
    if (!clientRef.current?.connected) return;
    
    clientRef.current.publish({
      destination: `/app/station/${stationId}/dragEnd`,
      body: JSON.stringify({ targetUserId }),
    });
  }, [stationId]);

  return {
    isConnected,
    dragStart,
    move,
    dragEnd,
  };
};