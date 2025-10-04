import { Helmet } from 'react-helmet-async';
import BlogList from '../components/BlogList';

export default function BlogIndexPage(){
  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Pleiades 블로그</title>
        <meta name="description" content="Pleiades 팀 블로그"/>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">블로그</h1>
      <BlogList/>
    </main>
  );
}