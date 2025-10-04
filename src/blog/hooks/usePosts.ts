// src/blog/hooks/usePosts.ts (수정 최종본)

import matter from 'gray-matter';
// 1. reading-time import 구문을 완전히 삭제합니다.
import type { Post, PostFrontmatter } from '../types';

// Vite 경고 메시지를 해결하기 위해 수정된 부분
const mods = import.meta.glob('/src/posts/**/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default' 
});

const slugOf = (p:string)=>p.split('/').pop()!.replace(/\.md$/, '');

// 2. 글 읽는 시간을 계산하는 새로운 함수를 추가합니다.
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200; // 분당 평균 읽는 단어 수
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

export function getAllPosts(): Post[] {
  return Object.entries(mods).map(([p, raw])=>{
    const { data, content } = matter(raw as string);
    // 3. 기존 라이브러리 대신 새로 만든 함수를 사용합니다.
    const readingMinutes = calculateReadingTime(content);
    return { 
      slug: slugOf(p), 
      content, 
      readingMinutes: Math.max(1, readingMinutes), 
      ...(data as PostFrontmatter) 
    };
  }).sort((a,b)=>+new Date(b.date)-+new Date(a.date));
}

export function getPostBySlug(slug:string){
  const kv = Object.entries(mods).find(([p])=>slugOf(p)===slug);
  if(!kv) return null;
  const { data, content } = matter(kv[1] as string);
  // 4. 여기도 마찬가지로 새로 만든 함수를 사용합니다.
  const readingMinutes = calculateReadingTime(content);
  return { 
    slug, 
    content, 
    readingMinutes: Math.max(1, readingMinutes), 
    ...(data as PostFrontmatter) 
  } as Post;
}