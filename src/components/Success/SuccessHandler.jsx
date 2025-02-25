import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';
import React, { useState, useContext, Fragment } from 'react';
import { ErrorContext, useError } from '../../store/error-context';

export default function SuccessHandler({ onAccept, successModal }) {
  const activate = successModal.activate;

  return (
    <Fragment>
      {activate && <Backdrop activate={activate}></Backdrop>}
      {activate && (
        <Modal
          title={successModal.title}
          onAccept={onAccept}
          affirmative={successModal.affirmative}
          activate={activate}
        >
          <p>{successModal.message}</p>
        </Modal>
      )}
    </Fragment>
  );
}
