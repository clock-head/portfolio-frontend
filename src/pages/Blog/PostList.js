import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PostList from '../../components/PostList';
import Layout from '../../components/Layout';
import ErrorHandler from '../../components/Error/ErrorHandler';
import { useError } from '../../store/error-context';

function PostListPage() {
  const [errorModal, setErrorModal, formError, setFormError] = useError();
  const posts = useLoaderData();
  const navigate = useNavigate();

  const height = Math.round((posts.length / 3) * 320 + 460).toString() + 'px';

  useEffect(() => {
    if (posts.fetchError) {
      console.log(posts.fetchError);

      setErrorModal({
        title: 'Fetch Error',
        message: posts.fetchError.message,
        activate: true,
        affirmative: 'ok',
      });
    }
  }, [posts]);

  const onAccept = () => {
    setErrorModal({
      title: '',
      message: posts.fetchError.message,
      activate: false,
      affirmative: '',
    });
    navigate('/');
  };

  return (
    <Layout height={height}>
      <ErrorHandler onAccept={onAccept} />
      {!posts.fetchError && <PostList posts={posts}></PostList>};
    </Layout>
  );
}

export default PostListPage;

export async function loader() {
  const response = await fetch('http://localhost:3000/api/1.0/blog');

  console.log(response);

  if (!response.ok) {
    // ...
    return {
      fetchError: {
        message: 'could not fetch articles.',
      },
    };
  } else {
    return response;
  }
}
