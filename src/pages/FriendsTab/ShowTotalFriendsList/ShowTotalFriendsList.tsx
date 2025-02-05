import React, { useEffect, useMemo, useState } from "react";
//import { Character } from "../../interfaces/Interfaces";
import s from "./ShowTotalFriendsList.module.scss";

// components
import ShowFriendRequestsList from "../ShowFriendRequestsList/ShowFriendRequestsList";
import ShowMyFriendsList from "../ShowMyFriendsList/ShowMyFriendsList";
import ShowMyRequestsList from "../ShowMyRequestsList/ShowMyRequestsList";
import SortCriteriaBox from "../../../components/SortCriteriaBox/SortCriteriaBox";

// image files
import hideUpArrow from "../../../assets/FriendsTab/hideUpArrow.svg";
import showDownArrow from "../../../assets/FriendsTab/showDownArrow.svg";
import toggleDown from "../../../assets/FriendsTab/toggleDown.svg";
import toggleUp from "../../../assets/FriendsTab/toggleUp.svg";

interface Friend {
  Id: string;
  Name: string;
  Since: number;
}

interface FriendsData {
  FriendRequests: Friend[];
  MyFriends: Friend[];
  MyRequests: Friend[];
}

interface ShowTotalFriendsListProps {
  friendsData: FriendsData;
  handleDeleteFriend: (friendId: string) => void;
}

const ShowTotalFriendsList: React.FC<ShowTotalFriendsListProps> = ({
  friendsData,
  handleDeleteFriend,
}) => {
    const [isShowFriendRequests, setIsShowFriendRequests] = useState<boolean>(true);
    const [isShowMyFriends, setIsShowMyFriends] = useState<boolean>(true);
    const [isShowMyRequests, setIsShowMyRequests] = useState<boolean>(true);

    useEffect(() => {
        if (
            friendsData?.FriendRequests?.length === 0 &&
            friendsData?.MyFriends?.length === 0 &&
            friendsData?.MyRequests?.length === 0
        ) {
            setIsShowFriendRequests(false);
            setIsShowMyFriends(false);
            setIsShowMyRequests(false);
        }
    }, [friendsData]);

    const [onActionFriendId, setOnActionFriendId] = useState<string>("");

    const [showAllFriends, setShowAllFriends] = useState<boolean>(false);

    const [sortCriteria, setSortCriteria] = useState<"최신순" | "이름순">("최신순");
    const sortedFriends = useMemo(() => {
      const friendsCopy = [...friendsData.MyFriends];
  
      if (sortCriteria === "최신순") {
        return friendsCopy.sort((a, b) => b.Since - a.Since);
      } else if (sortCriteria === "이름순") {
        return friendsCopy.sort((a, b) => a.Name.localeCompare(b.Name, "ko-KR", { sensitivity: "base" }));
      }
  
      return friendsCopy;
    }, [friendsData.MyFriends, sortCriteria]);
  return (
    <div className={s.friendsList}>
      {/*============= 받은 친구 요청 리스트 =============*/}
      <div className={s.friendRequests}>
        <div
          className={s.friendRequestsHead}
          onClick={() => setIsShowFriendRequests(!isShowFriendRequests)}
          style={!isShowFriendRequests ? { marginBottom: "1.44rem" } : {}}
        >
          <button
            className={s.showHideButton}
          >
            {isShowFriendRequests ? (
              <img src={hideUpArrow} alt="hideUpArrow" />
            ) : (
              <img src={showDownArrow} alt="showDown" />
            )}
          </button>
          <span>친구 요청 왔어요 ({friendsData?.FriendRequests?.length || 0})</span>
        </div>
        {friendsData?.FriendRequests && isShowFriendRequests && (
          <div className={s.friendRequestsSection}>
            {friendsData.FriendRequests.map((friend) => (
              <div key={friend.Id} className={s.friendRequest}>
                <ShowFriendRequestsList otherUser={friend} />
              </div>
            ))}
          </div>
        )}
      </div>
      {/*============= 내 친구 리스트 =============*/}
      <div className={s.myFriends}>
        <div
          className={s.myFriendsHead}
          style={!isShowMyFriends ? { marginBottom: "1.44rem" } : {}}
          onClick={() => setIsShowMyFriends(!isShowMyFriends)}
        >
          <button
            className={s.showHideButton}
          >
            {isShowMyFriends ? (
              <img src={hideUpArrow} alt="hideUpArrow" />
            ) : (
              <img src={showDownArrow} alt="showDown" />
            )}
          </button>
          <span>내 친구 ({friendsData?.MyFriends?.length || 0})</span>
        </div>

        {friendsData?.MyFriends && isShowMyFriends && (
          <div className={s.myFriendsSectionContainer}>
            <div className={s.sortCriteriaBoxContainer}>
              <SortCriteriaBox
                sortCriteria={sortCriteria}
                setSortCriteria={setSortCriteria}
              />
            </div>
            <div className={s.myFriendsSection}>
              {sortedFriends.slice(0, showAllFriends ? sortedFriends.length : 7).map((friend) => (
                <div key={friend.Id} className={s.myFriend}>
                  <ShowMyFriendsList
                    otherUser={friend}
                    handleDeleteFriend={() => handleDeleteFriend(friend.Id)}
                    onActionFriendId={onActionFriendId}
                    setOnActionFriendId={setOnActionFriendId}
                  />
                </div>
              ))}
            </div>
            {sortedFriends.length > 7 && (
              <button
                className={s.toggleButton}
                onClick={() => setShowAllFriends((prev) => !prev)}
              >
                {showAllFriends ? "접기" : "더보기"}
                {showAllFriends ?
                  <img src={toggleUp} alt="toggleUp" className={s.toggleIcon} /> :
                  <img src={toggleDown} alt="toggleDown" className={s.toggleIcon} />
                }
              </button>
            )}
          </div>
        )}
      </div>
      {/*============= 내가 친구 요청 보낸 리스트 =============*/}
      <div className={s.myRequests}>
        <div
          className={s.myRequestsHead}
          onClick={() => setIsShowMyRequests(!isShowMyRequests)}
        >
          <button
            className={s.showHideButton}
          >
            {isShowMyRequests ? (
              <img src={hideUpArrow} alt="hideUpArrow" />
            ) : (
              <img src={showDownArrow} alt="showDown" />
            )}
          </button>
          <span>요청 중인 친구 ({friendsData?.MyRequests?.length || 0})</span>
        </div>
        {friendsData?.MyRequests && isShowMyRequests && (
          <div className={s.myRequestsSection}>
            {friendsData.MyRequests.map((friend) => (
              <div key={friend.Id} className={s.myRequest}>
                <ShowMyRequestsList otherUser={friend} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTotalFriendsList;