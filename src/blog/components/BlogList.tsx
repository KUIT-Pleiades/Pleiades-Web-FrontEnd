import BlogCard from './BlogCard';
import { getAllPosts } from '../hooks/usePosts';

export default function BlogList({ limit }: { limit?: number }) {
  const posts = getAllPosts();
  const list = limit ? posts.slice(0, limit) : posts;
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map(p => <BlogCard key={p.slug} post={p} />)}
    </div>
  );
}