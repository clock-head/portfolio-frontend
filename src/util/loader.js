import { Suspense, lazy } from 'react';
// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from '../pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
const SignUp = lazy(() => import('../pages/Auth/SignUp'));
const SignIn = lazy(() => import('../pages/Auth/SignIn'));

const PostListPage = lazy(() => import('../pages/Blog/PostList'));
const PostPage = lazy(() => import('../pages/Blog/Article'));
const WriteArticle = lazy(() => import('../pages/Blog/NewArticle'));

const pagesLoader = () => {
  return [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: 'sign-up',
      element: (
        <Suspense fallback={<p>...Loading...</p>}>
          <SignUp></SignUp>
        </Suspense>
      ),
    },
    {
      path: 'sign-in',
      element: (
        <Suspense fallback={<p>...Loading...</p>}>
          <SignIn></SignIn>
        </Suspense>
      ),
    },
    {
      path: 'blog',
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <PostListPage />
            </Suspense>
          ),
          loader: () =>
            import('../pages/Blog/PostList').then((module) => module.loader()),
        },
        {
          path: ':id',
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <PostPage />
            </Suspense>
          ),
          loader: (meta) =>
            import('../pages/Blog/Article').then((module) =>
              module.loader(meta)
            ),
        },
        {
          path: 'new-article',
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <WriteArticle />
            </Suspense>
          ),
        },
      ],
    },
  ];
};

export default pagesLoader;
