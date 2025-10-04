import { Link } from 'react-router-dom';
import type { Post } from '../types';

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <div className="rounded-2xl border p-4 hover:shadow-md transition">
        {post.cover && <img src={post.cover} alt="" className="mb-3 rounded-xl" />}
        <h3 className="text-lg font-semibold group-hover:underline">{post.title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString()} · {post.readingMinutes}분
        </p>
        {post.excerpt && <p className="mt-2 text-gray-700 line-clamp-2">{post.excerpt}</p>}
      </div>
    </Link>
  );
}