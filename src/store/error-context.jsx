import { useState, createContext, useContext } from 'react';

export const ErrorContext = createContext(undefined);

export function ErrorProvider({ children }) {
  const [errorModal, setErrorModalState] = useState({
    title: '',
    message: '',
    activate: false,
    affirmative: '',
    negation: '',
  });

  const [formError, setFormErrorState] = useState({});

  const setErrorModal = (error) => {
    setErrorModalState((prevState) => {
      return {
        ...prevState,
        ...error,
      };
    });
  };

  const setFormError = (error) => {
    setFormErrorState(() => {
      return error;
    });
  };

  const errorCtx = [errorModal, setErrorModal, formError, setFormError];

  return (
    <ErrorContext.Provider value={errorCtx}>{children}</ErrorContext.Provider>
  );
}

export function useError() {
  const errorContext = useContext(ErrorContext);
  if (!errorContext) {
    throw new Error('useError must be used within an error provider');
  }
  return errorContext;
}
