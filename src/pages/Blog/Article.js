import { useLoaderData } from 'react-router-dom';

function ArticlePage() {
  const post = useLoaderData();
}

export default ArticlePage;

export function loader({ params }) {
  const postId = params.id;
  return fetch('localhost:3000/api/1.0/blog/' + postId);
}
