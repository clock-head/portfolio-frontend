// import { filterThemeData } from '../src/util/theme';
import React, { useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import { ThemeContext } from '../src/store/theme-context.jsx';
import ThemeProvider from '../src/store/theme-context.jsx';
import ThemeToggler from '../src/components/ThemeToggler.jsx';
const { filterThemeData, parseThemeData } = require('../src/util/theme.js');

describe('theme data providers', () => {
  it('should return the list of themes available', async () => {
    render(<ThemeToggler />, { wrapper: ThemeProvider });

    const themeSelector = screen.getByText('space racer');

    expect(themeSelector).toBeDefined();

    //
    await waitFor(() => {
      const themeSelector2 = screen.getByText('snow');
      expect(themeSelector2).toBeDefined();
    });

    await waitFor(() => {
      const themeSelector3 = screen.getByText('strawberry oasis');
      expect(themeSelector3).toBeDefined();
    });
  });
});

describe('theme data parsers', () => {
  const themeData = {
    themeName: 'strawberry oasis',
    layout: { color: { background: '#0a1c3d' } },
    button: {
      color: {
        textColor: 'rgb(102, 198, 223)',
        borderColor: '1px solid rgba(95, 177, 202, 0.2)',
        backgroundColor: 'rgba(45, 50, 90, 0.2)',
        hoverBorderColor: 'rgb(133, 223, 226)',
      },
    },
    home: {
      color: {
        headerColor: '#cba2ea',
        subheaderColor: '#91d2f4',
        profileBorder: '1px solid rgb(102, 196, 255)',
      },
      font: {
        headerFont: 'Bebas-Neue',
        subheaderFont: 'Akira',
      },
    },
    postList: {
      color: {
        titleColor: '#cba2ea',
        borderColor: '1px solid rgb(102, 196, 255)',
      },
    },
    newArticle: {
      color: {
        formFieldColor: '#1c2a2e',
        formInputTextColor: 'rgb(90, 214, 236)',
        formFieldActiveColor: 'rgba(90, 214, 236, 0.2)',
        formFocusBorderColor: '2px solid rgb(45, 119, 117)',
      },
    },
    mainNav: {
      color: {
        textColor: '#3abfe4',
        activeTextColor: '#f389ee',
        activeBorderColor: '#3abfe4',
      },
    },
    auth: {
      color: {
        labelColor: '#B2FAFF',
        formFieldColor: 'rgba(20, 30, 40, 0.2)',
        formInputTextColor: '#DBAFFC',
        placeholderTextColor: '#DBAFFC',
        errorMessageTextColor: '#969596',
        formFocusBorderColor: '',
        formBackgroundColor: '#2868C6',
      },
    },
  };

  it('should return object with corresponding CSS property values for Layout component', () => {
    const themeStyles = parseThemeData(themeData, 'layout');
    expect(themeStyles).toHaveProperty('background');
  });

  it('should return object with corresponding CSS values for Button component', () => {
    const themeStyles = parseThemeData(themeData, 'button');

    expect(themeStyles).toHaveProperty('textColor');
    expect(themeStyles).toHaveProperty('borderColor');
    expect(themeStyles).toHaveProperty('backgroundColor');
    expect(themeStyles).toHaveProperty('hoverBorderColor');
  });

  it('should return object with corresponding CSS values for Home Page', () => {
    const themeStyles = parseThemeData(themeData, 'home');

    expect(themeStyles).toHaveProperty('headerColor');
    expect(themeStyles).toHaveProperty('subheaderColor');
    expect(themeStyles).toHaveProperty('profileBorder');
    expect(themeStyles).toHaveProperty('headerFont');
    expect(themeStyles).toHaveProperty('subheaderFont');
  });

  it('should return object with corresponding CSS values for main nav', () => {
    const themeStyles = parseThemeData(themeData, 'mainNav');

    expect(themeStyles).toHaveProperty('textColor');
    expect(themeStyles).toHaveProperty('activeTextColor');
    expect(themeStyles).toHaveProperty('activeBorderColor');
  });

  it('should return object with corresponding CSS values for auth form', () => {
    const themeStyles = parseThemeData(themeData, 'auth');

    expect(themeStyles).toHaveProperty('labelColor');
    expect(themeStyles).toHaveProperty('formFieldColor');
    expect(themeStyles).toHaveProperty('formInputTextColor');
    expect(themeStyles).toHaveProperty('placeholderTextColor');
    expect(themeStyles).toHaveProperty('errorMessageTextColor');
    expect(themeStyles).toHaveProperty('formFocusBorderColor');
    expect(themeStyles).toHaveProperty('formBackgroundColor');
  });
});
