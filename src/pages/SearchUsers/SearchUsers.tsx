// pages/SearchUsers/SearchUsers.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './SearchUsers.module.scss';

import SearchUsersBar from '../../components/SearchUsersBar/SearchUsersBar';
import SearchResults from './SearchResults/SearchResults';
import RecentSearch from './RecentSearch/RecentSearch';
import Pending from '../PageManagement/Pending';

import { useSearchUsers } from './hooks/useSearchUsers';
import { useRecentSearches } from './hooks/useRecentSearches';

import { useToast } from '../../components/Toast/useToast';
import { trackEvent } from '../../utils/analytics';

const SearchUsers: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);

  const {
    data: searchResults,
    isLoading: isSearching,
    refetch: refetchSearchResults,
  } = useSearchUsers(searchValue, triggerSearch);

  const {
    data: recentSearches,
    isLoading: isRecentLoading,
    remove: removeRecent,
    removeAll: removeAllRecent,
    refetch: refetchRecentSearches,
  } = useRecentSearches();

  const handleSearch = () => {
    if (searchValue.trim()) {
      trackEvent("Social", "try_search_user", { keyword: searchValue });
      setTriggerSearch(true);
    }
  };

  const handleRecentClick = (id: string) => {
    trackEvent("Social", "click_recent_search", { keyword: id });
    setSearchValue(id);
    setTriggerSearch(true);
  };

  // 임시로 만든 전체삭제 함수
  const handleClearAll = () => {
    if (!recentSearches) return;
    removeAllRecent();
  };

  // 토스트 메시지 훅
  const { showToast, ToastContainer } = useToast();

  return (
    <div className={s.container}>
      {(isSearching || isRecentLoading) && <Pending />}

      <div className={s.headContainer}>
        <div className={s.searchSection}>
          <div className={s.searchBarContainer}>
            <SearchUsersBar
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value === '') setTriggerSearch(false);
              }}
              onSubmit={handleSearch}
            />
          </div>
          <button
            className={s.cancelSearchButton}
            onClick={() => {
              trackEvent("Social", "cancel_search_page");
              navigate('/friendtab');
            }}
          >
            취소
          </button>
        </div>
      </div>

      {!triggerSearch ? (
        <div className={s.recentSearchContainer}>
          <RecentSearch
            recentSearches={recentSearches || []}
            onUserClick={handleRecentClick}
            onRemove={removeRecent}
            onClearAll={handleClearAll}
          />
        </div>
      ) : searchResults && searchResults.length > 0 ? (
        <div className={s.searchResultsContainer}>
          <SearchResults
            filteredUsers={searchResults}
            refreshSearch={refetchSearchResults}
            refetchRecentSearches={refetchRecentSearches}
            showToast={showToast}
          />
        </div>
      ) : (
        <div className={s.noResultModal}>
          <span className={s.noResultModalFirstText}>검색한 ID가 존재하지 않아요!</span>
          <span className={s.noResultModalSecondText}>ID를 다시 확인해주세요</span>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SearchUsers;