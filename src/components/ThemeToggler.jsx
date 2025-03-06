import React, { useContext, useState, useEffect, useRef } from 'react';
import { ThemeContext, useTheme } from '../store/theme-context';
import classes from './ThemeToggler.module.css';
import Button from './Button/Button';

function ThemeToggler() {
  const [theme, themesCollection, toggleTheme] = useTheme();

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  // let themesRef = useRef([]);

  // takes the themes array from themes context
  // loops themes array to output into a list
  // each list has a button that runs the theme toggler that changes the theme.

  //Set Theme Button shows all the available themes in a list.

  function showThemeSelection() {
    setShowThemeDropdown((prevState) => !prevState);
  }

  function chooseTheme(event) {
    const snakeCasedValue = event.target.value.replace(' ', '_');
    toggleTheme(snakeCasedValue);
  }

  return (
    <div>
      <div
        className={`${classes.backdrop} ${
          showThemeDropdown ? classes.activate : ''
        }`}
        onClick={showThemeSelection}
      ></div>
      <div className={classes.control}>
        <Button
          className="set_theme"
          onClick={showThemeSelection}
          value="Set Theme"
        ></Button>
        <ul
          className={`${classes.themes_dropdown} ${
            showThemeDropdown ? classes.open : ''
          }`}
        >
          {themesCollection.map((theme) => {
            const themeName = theme.themeName.replace('_', ' ');

            return (
              <li key={theme._id}>
                <Button
                  className="theme_list_item"
                  value={themeName}
                  onClick={chooseTheme}
                ></Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ThemeToggler;
