import React, { useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './Layout.module.css';
import { ThemeContext, useTheme } from '../store/theme-context';
import ThemeToggler from './ThemeToggler';
import { filterThemeData } from '../util/theme';
// import Error from './Error/Error';

function Layout({ height, children }) {
  const [theme, themesCollection, toggleTheme] = useTheme();

  const themeData = filterThemeData(theme, themesCollection);

  let backgroundColor;

  if (theme !== 'space_racer' && themeData) {
    backgroundColor = themeData.layout.color.background;
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
