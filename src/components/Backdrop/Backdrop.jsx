import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import classes from './Backdrop.module.css';
import { ErrorContext, useError } from '../../store/error-context';

export default function Backdrop(props) {
  const [errorModal, setErrorModal, formError, setFormError] = useError();
  const activate = errorModal.activate;

  if (!props.activate) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={classes['backdrop']}
      onClick={() => {
        setErrorModal({
          title: '',
          message: '',
          activate: false,
        });
      }}
    />,
    document.getElementById('backdrop-root')
  );
}
