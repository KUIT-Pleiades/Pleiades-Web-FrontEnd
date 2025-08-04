import { useState, useEffect } from 'react';
import s from './SubCategoryTabs.module.scss';
import { CategoryType } from '../OfficialUsedStore';

interface SubCategoryTabsProps {
  activeCategory: CategoryType;
}

const SUB_CATEGORIES: Record<CategoryType, string[]> = {
  face: ['전체', '머리', '눈', '코', '입', '점'],
  cloth: ['전체', '상의', '하의', '세트', '신발', '악세서리'],
  background: ['전체', '별', '우주정거장'],
};

export default function SubCategoryTabs({ activeCategory }: SubCategoryTabsProps) {
  const [activeSubTab, setActiveSubTab] = useState('전체');
  const tabs = SUB_CATEGORIES[activeCategory];

  useEffect(() => {
    setActiveSubTab('전체');
  }, [activeCategory]);

  if (!tabs) {
    return null;
  }

  return (
    <div className={s.container}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${s.tab} ${activeSubTab === tab ? s.active : ''}`}
          onClick={() => setActiveSubTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
