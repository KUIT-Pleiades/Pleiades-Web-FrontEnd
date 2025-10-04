export type PostFrontmatter = {
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  excerpt?: string;
  cover?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingMinutes?: number;
};