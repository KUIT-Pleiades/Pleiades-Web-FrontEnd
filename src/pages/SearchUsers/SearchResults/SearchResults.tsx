import React from 'react';
import s from './SearchResults.module.scss';

//components
import ShowSearchedUser from './ShowSearchedUser/ShowSearchedUser';

//image files
import userProfileImg from '../../../assets/SearchUsers/searchedUserProfileImg.png';

interface User { Id: string; Name: string; }

interface SearchResultsProps {
    filteredUsers: User[];
    handleSendRequestFriend: (id: string) => void;
    handleWithdrawRequestFriend: (id: string) => void;
    handleRefuseRequestFriend: (id: string) => void;
    handlePoke: (id: string) => void;
    handleDeleteFriend: (id: string) => void;
    getFriendStatus: (id: string) => { isFriend: boolean; isRequested: boolean; isReceivedRequest: boolean };
}

const SearchResults: React.FC<SearchResultsProps> = ({
    filteredUsers,
    handleSendRequestFriend,
    handleWithdrawRequestFriend,
    handleRefuseRequestFriend,
    handlePoke,
    handleDeleteFriend,
    getFriendStatus
}) => {

    return (
        <div className={s.searchResultContainer}>
            {filteredUsers.map(user => {
                const { isFriend, isRequested, isReceivedRequest } = getFriendStatus(user.Id);
                return(
                    <ShowSearchedUser
                        key={user.Id}
                        id={user.Id}
                        name={user.Name}
                        profileImage={userProfileImg}
                        isFriend={isFriend}
                        isRequested={isRequested}
                        isReceivedRequest={isReceivedRequest}
                        handleSendRequestFriend={handleSendRequestFriend}
                        handleWithdrawRequestFriend={handleWithdrawRequestFriend}
                        handleRefuseRequestFriend={handleRefuseRequestFriend}
                        handlePoke={handlePoke}
                        handleDeleteFriend={handleDeleteFriend}
                    />
                );
            })}
        </div>
    )
}

export default SearchResults;
