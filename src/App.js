import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import pagesLoader from './util/loader';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: pagesLoader(),
  },
  {
    path: '/member',
    element: <RootLayout />,
    children: pagesLoader(),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
