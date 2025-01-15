/** Interfaces For User & Character */

/** 캐릭터 설정이 끝난 후 서버에 전송할 때, 캐릭터 값 서버에서 받아올 때 사용 */
export interface Character {
  characterId: string;
  characterName: string;
  characterAge: number;
  face: {
    skinColor: {
      name: string; // white, yellow...
      imgurl: string; // 이미지 주소
    };
    hair: {
      name: string; // 머리 스타일, ex) 포니테일
      imgurl: string; // 이미지 주소
    };
    expression: {
      name: string; // 표정(눈, 코, 입)
      imgurl: string;
    };
  };
  outfit: {
    top: {
      name: string; // 상의
      imgurl: string;
    };
    bottom: {
      name: string; // 하의
      imgurl: string;
    };
    shoes: {
      name: string; // 신발
      imgurl: string;
    };
  };
  accessories: {   
    name: string; // 악세서리
    imgurl: string;
  };
  background: {
    name: string; // 배경
    imgurl: string;
  };
}

/** 유저정보표시 */
export interface User {
  onBoardingCompleted: boolean;
  character: Character;
}

/** 캐릭터 선택화면에서 선택가능한 아이템 목록 받아올 때 사용*/
export interface AvailableItems {
  faces: {
    skinColors: [
      {
        name: string; // white, yellow...
        imgurl: string; // 이미지 주소
      }
    ];
    hairs: [
      {
        name: string; // 머리 스타일, ex) 포니테일
        imgurl: string; // 이미지 주소
      }
    ];
    expressions: [
      {
        name: string; // 표정(눈, 코, 입)
        imgurl: string;
      }
    ];
  };
  outfits: {
    tops: [
      {
        name: string; // 상의
        imgurl: string;
      }
    ];
    bottoms: [
      {
        name: string; // 하의
        imgurl: string;
      }
    ];
    shoes: [
      {
        name: string; // 신발
        imgurl: string;
      }
    ];
  };
  accessories: [
    {
      name: string; // 악세서리
      imgurl: string;
    }
  ];
  backgrounds: [
    {
      name: string; // 배경
      imgurl: string;
    }
  ];
}

export interface AvailableStationBackground {
  name: string;
  theme: string;
  imgurl: string;
}

export interface AvailableStationBackgrounds {
  backgrounds: AvailableStationBackground[];
}

/** Interfaces For Question */

export interface Question {
  questionID: string;
  question: string;
}

export interface QuestionList {
  questions: Question[];
}

export interface TodayReport {
  question: Question;
  sequence: number;
}

export interface ShowReportOfUser {
  question: Question;
  answer: string;
  respondentId: string;
  isFriend: boolean;
}

export interface Answer {
  answer: string;
}

/** Interfaces For Station */

interface Position {
  x: number; // 퍼센트
  y: number;
}

export interface Station {
  id: string;
  name: string;
  backgroundImg: string;
  numOfUsers: number;
}

export interface Stations {
  stations: Station[];
}

export interface StationMember {
  character: Character;
  position: Position;
  isAnswered: boolean;
}

export interface StationDetails {
  id: string;
  name: string;
  backgroundImg: string;
  members: StationMember[];
}

/** Interfaces For Social */

export interface OtherUser {
  Id: string;
  Name: string;
}

export interface Social {
  friendRequest: OtherUser[];
  Myfriends: OtherUser[];
  MyRequests: OtherUser[];
}
