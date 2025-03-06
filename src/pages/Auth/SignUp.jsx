import React, { useEffect, useRef } from 'react';
import Form from '../../components/Form/Form';
import Layout from '../../components/Layout';
import ErrorHandler from '../../components/Error/ErrorHandler';
import { useNavigate } from 'react-router-dom';
import { ErrorContext, useError } from '../../store/error-context';

export default function SignUp() {
  const height = '175vh';
  let apiUrl = sessionStorage.getItem('apiUrl');
  const [errorModal, setErrorModal, formError, setFormError] = useError();

  const navigate = useNavigate();

  const onRedirect = () => {
    const signInPage = '/sign-in';
    navigate(signInPage);
  };

  const onCancelRedirect = () => {
    setErrorModal({
      title: '',
      message: '',
      activate: false,
    });
  };

  const onSubmit = async (userData) => {
    setFormError(null);

    const response = await fetch(`https://${apiUrl}/api/1.0/auth/sign-up`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    // if response.status >= 400

    if (response.status !== 200 && response.status !== 300) {
      const res = await response.json();
      setFormError(res.validationErrors);
    }

    if (response.status === 300) {
      const res = await response.json();
      if (
        res.validationErrors.email &&
        res.validationErrors.email === 'this email exists'
      ) {
        setErrorModal({
          title: res.validationErrors.email,
          message: 'would you like to sign in?',
          activate: true,
          affirmative: 'yes',
          negation: 'no',
        });
      }
    }
  };

  return (
    <Layout height={height}>
      <ErrorHandler
        onCancel={onCancelRedirect}
        onAccept={onRedirect}
      ></ErrorHandler>

      <Form authType={`Sign Up`} onSubmit={onSubmit}></Form>
    </Layout>
  );
}
