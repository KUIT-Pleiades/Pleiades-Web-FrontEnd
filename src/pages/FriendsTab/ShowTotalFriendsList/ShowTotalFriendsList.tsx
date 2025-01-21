import React, { useEffect, useState } from "react";
//import { Character } from "../../interfaces/Interfaces";
import s from "./ShowTotalFriendsList.module.scss";

// components
import ShowFriendRequestsList from "../ShowFriendRequestsList/ShowFriendRequestsList";
import ShowMyFriendsList from "../ShowMyFriendsList/ShowMyFriendsList";
import ShowMyRequestsList from "../ShowMyRequestsList/ShowMyRequestsList";
import SortCriteriaBox from "../SortCriteriaBox/SortCriteriaBox";

// image files
import hideUpArrow from "../../../assets/FriendsTab/hideUpArrow.svg";
import showDownArrow from "../../../assets/FriendsTab/showDownArrow.svg";

interface Friend {
  Id: string;
  Name: string;
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
    const [sortCriteria, setSortCriteria] = useState<"최신순" | "이름순">("최신순");

    const [isShowFriendRequests, setIsShowFriendRequests] = useState<boolean>(true);
    const [isShowMyFriends, setIsShowMyFriends] = useState<boolean>(true);
    const [isShowMyRequests, setIsShowMyRequests] = useState<boolean>(true);
    useEffect(() => {
      if(friendsData?.FriendRequests?.length === 0){
        setIsShowFriendRequests(false);
      }
      if(friendsData?.MyFriends?.length === 0){
        setIsShowMyFriends(false);
      }
      if(friendsData?.MyRequests?.length === 0){
        setIsShowMyRequests(false);
      }
  }, [friendsData]);

  return (
    <div className={s.friendsList}>
      {/*============= 받은 친구 요청 리스트 =============*/}
      <div className={s.friendRequests}>
        <div
          className={s.friendRequestsHead}
          onClick={() => setIsShowFriendRequests(!isShowFriendRequests)}
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
        {!isShowFriendRequests && <div className={s.devideSection}></div>}
      </div>
      {/*============= 내 친구 리스트 =============*/}
      <div className={s.myFriends}>
        <div
          className={s.myFriendsHead}
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
          <>
            <div className={s.sortCriteriaBoxContainer}>
              <SortCriteriaBox
                sortCriteria={sortCriteria}
                setSortCriteria={setSortCriteria}
              />
            </div>
            <div className={s.myFriendsSection}>
              {friendsData.MyFriends.map((friend) => (
                <div key={friend.Id} className={s.myFriend}>
                  <ShowMyFriendsList
                    otherUser={friend}
                    handleDeleteFriend={() => handleDeleteFriend(friend.Id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {!isShowMyFriends && <div className={s.devideSection}></div>}
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