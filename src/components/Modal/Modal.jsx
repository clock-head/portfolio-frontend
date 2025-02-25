import React, { useState, createPortal, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import classes from './Modal.module.css';
import SignUp from '../../pages/Auth/SignUp';
import Button from '../Button/Button';
import { ThemeContext, useTheme } from '../../store/theme-context';
import { filterThemeData } from '../../util/theme';
import { ErrorContext, useError } from '../../store/error-context';

const Modal = (props) => {
  const [theme, themesCollection, toggleTheme] = useTheme();

  const themeData = filterThemeData(theme, themesCollection);

  const onCancel = () => {
    props.onCancel();
  };

  const onAccept = () => {
    props.onAccept();
  };

  // const modalRoot = document.getElementById('modal-root');

  if (!props.activate) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes['modal']}>
      <header className={`${classes['modal-header']} ${classes[theme]}`}>
        <h1>{props.title}</h1>
      </header>
      <div className={classes['modal-content']}>{props.children}</div>
      <div className={classes['modal-actions']}>
        {props.onCancel && props.negation && (
          <Button
            onClick={onCancel}
            className="cancel"
            value={props.negation}
          ></Button>
        )}
        {props.onAccept && props.affirmative && (
          <Button
            onClick={onAccept}
            className="accept"
            value={props.affirmative}
          ></Button>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
