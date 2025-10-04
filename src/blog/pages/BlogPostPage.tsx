import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MDRenderer from '../components/MDRenderer';
import { getPostBySlug } from '../hooks/usePosts';

export default function BlogPostPage(){
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);

  if(!post) {
    return (
      <main className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">404 - Not Found</h1>
        <p>존재하지 않는 글입니다.</p>
        <Link to="/blog" className="text-blue-500 underline mt-4 inline-block">블로그 목록으로 돌아가기</Link>
      </main>
    );
  }

  const title = `${post.title} | Pleiades 블로그`;
  const desc = post.excerpt || post.title;

  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc}/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={desc}/>
        <meta property="og:image" content={post.cover || '/og-default.png'}/>
        <script type="application/ld+json">{JSON.stringify({
          '@context':'https://schema.org',
          '@type':'Article',
          headline:post.title,
          datePublished:post.date,
          author: {
            '@type': 'Organization',
            name: post.author || 'Pleiades Team'
          }
        })}</script>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{post.title}</h1>
            <p className="mt-2 text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()} · {post.readingMinutes}분 읽기
            </p>
        </header>
        {post.cover && <img src={post.cover} alt={post.title} className="w-full h-auto rounded-lg mb-8" />}
        <MDRenderer content={post.content}/>
        <div className="mt-12 text-center">
            <Link to="/blog" className="text-blue-500 underline">← 블로그 목록으로</Link>
        </div>
      </div>
    </main>
  );
}