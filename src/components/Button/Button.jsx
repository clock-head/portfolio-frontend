import React, { useContext, useState, useEffect, useRef } from 'react';
import classes from './Button.module.css';
import { ThemeContext, useTheme } from '../../store/theme-context';
import { getThemeData } from '../../util/theme';
import { filterThemeData, parseThemeData } from '../../util/theme';

function Button({ onClick, className, ...props }) {
  const [hover, setHover] = useState(false);
  const [theme, themesCollection, toggleTheme] = useTheme();

  // const themeData = getThemeData(theme, themes);

  const themeData = filterThemeData(theme, themesCollection);

  let buttonStyle;

  if (theme !== 'space_racer' && className !== 'cancel' && themeData) {
    const themeStyles = parseThemeData(themeData, 'button');
    buttonStyle = {
      color: themeStyles.textColor,
      border: hover ? themeStyles.hoverBorderColor : themeStyles.borderColor,
      borderRadius: '2px',
      background: themeStyles.backgroundColor,
    };
  }

  // if (theme !== 'space_racer' && className === 'cancel' && themeData) {

  // }

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      className={`${classes[className]} ${classes[theme]}`}
      value={props.value}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {props.value}
    </button>
  );
}

export default Button;
