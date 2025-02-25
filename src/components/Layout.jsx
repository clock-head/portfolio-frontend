import React, { useContext, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './Layout.module.css';
import { ThemeContext, useTheme } from '../store/theme-context';
import ThemeToggler from './ThemeToggler';
import { filterThemeData } from '../util/theme';
import Loading from './Loading/Loading';
import Modal from './Modal/Modal';
import SignUpForm from './Form/Form';
// import Error from './Error/Error';

function Layout({ height, children, ModalItem }) {
  const [theme, themesCollection, toggleTheme] = useTheme();

  const dialog = useRef();

  const themeData = filterThemeData(theme, themesCollection);

  let backgroundColor;

  if (theme !== 'space_racer' && themeData) {
    backgroundColor = themeData.layout.color.background;
    console.log('backgroundColor: ', backgroundColor);
  }

  return (
    <>
      <div
        style={{ height: height, background: backgroundColor }}
        className={`${classes.body} ${classes[theme]}`}
      >
        {children}
        <ThemeToggler />
      </div>
    </>
  );
}

export default Layout;
