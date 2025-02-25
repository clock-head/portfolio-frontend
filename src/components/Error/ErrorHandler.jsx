import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';
import React, { useState, useContext, Fragment } from 'react';
import { ErrorContext, useError } from '../../store/error-context';

export default function ErrorHandler({ onCancel, onAccept }) {
  const [errorModal, setErrorModal, formError, setFormError] = useError();

  const activate = errorModal.activate;

  return (
    <Fragment>
      {activate && <Backdrop activate={activate}></Backdrop>}
      {activate && (
        <Modal
          title={errorModal.title}
          onCancel={onCancel}
          onAccept={onAccept}
          affirmative={errorModal.affirmative}
          negation={errorModal.negation}
          activate={activate}
        >
          <p>{errorModal.message}</p>
        </Modal>
      )}
    </Fragment>
  );
}
