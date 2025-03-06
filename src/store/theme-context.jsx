import { useState, createContext, useEffect, useRef, useContext } from 'react';
import { filterThemeData } from '../util/theme';

export const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const themesRef = useRef([]);
  const [themesCollection, setThemesCollection] = useState([
    { themeName: 'space_racer' },
  ]);

  useEffect(() => {
    const apiUrl = sessionStorage.getItem('apiUrl');

    console.log('themeCtx', apiUrl);

    const fetchThemes = async () => {
      try {
        const response = await fetch(
          `https://${apiUrl}/api/1.0/themes/get-themes`
        );

        if (!response.ok) {
          console.log('failed to fetch themes');
          throw new Error('bad response');
        }

        // this line might have to be replaced for testing purposes.
        const themesRes = await response.json();

        setThemesCollection((prevThemes) => {
          // console.log('previous', prevThemes);
          return [...prevThemes, ...themesRes];
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchThemes();
  }, []);

  const currentTheme = sessionStorage.getItem('theme')
    ? sessionStorage.getItem('theme')
    : 'space_racer';
  const [theme, setTheme] = useState(currentTheme);
  // filterThemeData either here on the context level or on the component level.

  //toggleTheme is a function that runs as an event listener tied to a button.

  const toggleTheme = (selectedTheme) => {
    setTheme((prevState) => {
      return selectedTheme;
    });
    sessionStorage.setItem('theme', selectedTheme);
  };

  const themeCtx = [theme, themesCollection, toggleTheme];

  return (
    <ThemeContext.Provider value={themeCtx}>
      {themesCollection.length > 0 ? children : <div>...Loading...</div>}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useTheme must be used within an error provider');
  }
  return themeContext;
}
