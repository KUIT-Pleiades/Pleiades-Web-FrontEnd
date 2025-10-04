import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// 참고: 아래 className="prose"는 Tailwind CSS의 타이포그래피 플러그인이 필요합니다.
// 설치되어 있지 않다면 스타일이 적용되지 않을 수 있습니다.
export default function MDRenderer({ content }: { content: string }) {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}