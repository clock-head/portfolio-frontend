exports.filterThemeData = (currentTheme, themes) => {
  const themeData = themes.filter((theme) => currentTheme === theme.themeName);
  return themeData[0];
};

exports.parseThemeData = (themeData, component) => {
  const comp = themeData[component];
  const styleObject = {};

  // Time Complexity O(n*m)

  for (const variant of Object.values(comp)) {
    for (const [key, value] of Object.entries(variant)) {
      if (styleObject[key]) {
        styleObject[key] = [].concat(styleObject[key], value);
      } else {
        styleObject[key] = value;
      }
    }
  }

  return styleObject;
};
