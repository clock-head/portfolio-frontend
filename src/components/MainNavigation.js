import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';

import classes from './MainNavigation.module.css';
import { ThemeContext, useTheme } from '../store/theme-context';
import { filterThemeData, parseThemeData } from '../util/theme';

function MainNavigation() {
  const [theme, themesCollection, toggleTheme] = useTheme();

  const themeData = filterThemeData(theme, themesCollection);
  let style = {};

  if (theme !== 'space_racer' && themeData) {
    const themeStyles = parseThemeData(themeData, 'mainNav');
    style.textColor = themeStyles.textColor;
    style.activeTextColor = themeStyles.activeTextColor;
    style.activeBorderColor = themeStyles.activeBorderColor;
  }

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? style.activeTextColor : style.textColor,
              border: isActive ? `1px solid ${style.activeBorderColor}` : null,
            })}
            // activeStyle={{ color: activeTextColor }}
            className={({ isActive }) =>
              isActive ? `${classes.active} ${classes[theme]}` : classes[theme]
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resume"
            style={({ isActive }) => ({
              color: isActive ? style.activeTextColor : style.textColor,
              border: isActive ? `1px solid ${style.activeBorderColor}` : null,
            })}
            className={({ isActive }) =>
              isActive ? `${classes.active} ${classes[theme]}` : classes[theme]
            }
            end
          >
            Resume
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendar"
            style={({ isActive }) => ({
              color: isActive ? style.activeTextColor : style.textColor,
              border: isActive ? `1px solid ${style.activeBorderColor}` : null,
            })}
            className={({ isActive }) =>
              isActive ? `${classes.active} ${classes[theme]}` : classes[theme]
            }
            end
          >
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            style={({ isActive }) => ({
              color: isActive ? style.activeTextColor : style.textColor,
              border: isActive ? `1px solid ${style.activeBorderColor}` : null,
            })}
            className={({ isActive }) =>
              isActive ? `${classes.active} ${classes[theme]}` : classes[theme]
            }
            end
          >
            Blog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
