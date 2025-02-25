import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import classes from './Root.module.css';
import Layout from '../components/Layout';

function RootLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <MainNavigation />
    </div>
  );
}

export default RootLayout;
