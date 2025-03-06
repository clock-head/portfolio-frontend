import React, { useContext, useState } from 'react';
import classes from './Input.module.css';
import { ThemeContext, useTheme } from '../../store/theme-context';
import { ErrorContext, useError } from '../../store/error-context';
import { filterThemeData, parseThemeData } from '../../util/theme';
import Error from '../Error/Error';
import Unit from '../FlowControl/Unit';

export const Input = ({ label, inputRef, name, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [theme, themesCollection, toggleTheme] = useTheme();
  const [errorModal, setErrorModal, formError, setFormError] = useError();
  const themeData = filterThemeData(theme, themesCollection);
  const styles = {};
  const inputType =
    label === 'email'
      ? 'email'
      : label === 'password' || label === 'confirm-password'
      ? 'password'
      : 'text';
  const title = label.replace('-', ' ');

  if (theme !== 'space_racer' && themeData) {
    const themeStyles = parseThemeData(themeData, 'newArticle');
    styles.formFieldColor = themeStyles.formFieldColor;
    styles.formFieldActiveColor = themeStyles.formFieldActiveColor;
    styles.formFocusBorderColor = themeStyles.formFocusBorderColor;
    styles.textColor = themeStyles.formInputTextColor;
  }

  const inputStyle = {
    backgroundColor: isFocused
      ? styles.formFieldActiveColor
      : styles.formFieldColor,
    color: styles.textColor,
    border: isFocused ? styles.formFocusBorderColor : '',
    outline: 'none',
    display: 'block',
    height: props.height,
    width: props.width,
    borderRadius: '5px',
    fontSize: props.fontSize,
  };

  const position = {
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
  };

  const labelStyle = {
    color: props.labelColor,
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      style={position}
      className={`${classes.control} ${classes.column} ${classes.theme}`}
    >
      <label htmlFor={label}>{title}</label>
      <input
        style={inputStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        type={inputType}
        className={`${classes.input}`}
        ref={inputRef}
        name={name}
      ></input>
      {formError && formError[label] && (
        <Error message={formError[label]}></Error>
      )}
    </div>
  );
};

export const TextAreaInput = ({ contentRef, label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [theme, themesCollection, toggleTheme] = useTheme();
  const [errorModal, setErrorModal, formError, setFormError] = useError();
  const themeData = filterThemeData(theme, themesCollection);
  const styles = {};
  const inputType =
    label === 'email'
      ? 'email'
      : label === 'password' || label === 'confirm-password'
      ? 'password'
      : 'text';
  const title = label.replace('-', ' ');

  if (theme !== 'space_racer' && themeData) {
    const themeStyles = parseThemeData(themeData, 'newArticle');
    styles.formFieldColor = themeStyles.formFieldColor;
    styles.formFieldActiveColor = themeStyles.formFieldActiveColor;
    styles.formFocusBorderColor = themeStyles.formFocusBorderColor;
    styles.textColor = themeStyles.formInputTextColor;
  }

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const textAreaStyle = {
    backgroundColor: isFocused
      ? styles.formFieldActiveColor
      : styles.formFieldColor,
    border: isFocused ? styles.formFocusBorderColor : '',
    color: styles.textColor,
    outline: 'none',
    display: 'block',
    minHeight: '30vh',
    maxHeight: '40vh',
    width: '80%',
    borderRadius: '5px',
    fontSize: props.fontSize,
  };

  const position = {
    marginLeft: props.marginLeft,
  };

  return (
    <div style={position} className={`${classes.control} ${classes.column}`}>
      <label htmlFor={label}>{label}</label>
      <textarea
        style={textAreaStyle}
        className={classes.textArea}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={contentRef}
      ></textarea>
    </div>
  );
};
