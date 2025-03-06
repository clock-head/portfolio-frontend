import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ArticleBody from '../../components/Article/ArticleBody';

function ArticlePage() {
  const post = useLoaderData();

  return <ArticleBody post={post}></ArticleBody>;
}

export default ArticlePage;

export async function loader({ params }) {
  const postId = params.id;
  const apiUrl = sessionStorage.getItem('apiUrl');

  const response = await fetch(`https://${apiUrl}/api/1.0/blog/${postId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return {
      fetchError: {
        message: 'could not fetch article.',
      },
    };
  }

  return response.json();
}
