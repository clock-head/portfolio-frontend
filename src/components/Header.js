import { useState, useContext, useEffect, useRef } from 'react';
import classes from './Header.module.css';
import { ThemeContext, useTheme } from '../store/theme-context';
import { filterThemeData, parseThemeData } from '../util/theme';

function Header() {
  const [theme, themesCollection, toggleTheme] = useTheme();

  const themeData = filterThemeData(theme, themesCollection);

  let headerColor;
  let headerFont;

  let subheaderColor;
  let subheaderFont;

  let profileBorder;

  if (theme !== 'space_racer' && themeData) {
    const themeStyles = parseThemeData(themeData, 'home');
    headerColor = themeStyles.headerColor;
    headerFont = themeStyles.headerFont;

    subheaderColor = themeStyles.subheaderColor;
    subheaderFont = themeStyles.subheaderFont;

    profileBorder = `${themeStyles.profileBorder}`;
  }

  // console.log(profileBorder);

  return (
    <header className={classes.item}>
      <img
        src=""
        alt="profile picture"
        style={{
          border: profileBorder,
        }}
        className={`${classes.mobile_pic}`}
      />
      <div className={classes.header_container}>
        <h1
          style={{
            color: headerColor,
            fontFamily: headerFont,
          }}
          className={`${classes[theme]} ${classes.header}`}
        >
          CLOCKHEAD
        </h1>
        <h2
          style={{
            color: subheaderColor,
            fontFamily: subheaderFont,
          }}
          className={`${classes.subheader}`}
        >
          React JS
        </h2>
      </div>
      <img
        src=""
        alt="profile"
        style={{ border: profileBorder }}
        className={`${classes.pic}`}
      ></img>
    </header>
  );
}

export default Header;
