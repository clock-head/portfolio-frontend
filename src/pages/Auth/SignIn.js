import SignInForm from '../../components/Form/Form';
import Layout from '../../components/Layout';
import Form from '../../components/Form/Form';
import { useLocation } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import ErrorHandler from '../../components/Error/ErrorHandler';
import SuccessHandler from '../../components/Success/SuccessHandler';
import { useNavigate } from 'react-router-dom';
import { ErrorContext, useError } from '../../store/error-context';

export default function SignIn() {
  const [errorModal, setErrorModal, formError, setFormError] = useError();
  const [authenticationSuccess, setAuthenticationSuccess] = useState({});
  let apiUrl = sessionStorage.getItem('apiUrl');

  const navigate = useNavigate();

  const onSubmit = async (userData) => {
    const response = await fetch(`https://${apiUrl}/api/1.0/auth/sign-in`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await response.json();

    if (res.validationErrors) {
      setErrorModal({
        title: 'invalid user or password',
        message: res.validationErrors.email,
        activate: true,
        affirmative: 'ok',
      });
    }

    if (res.authenticationSuccess) {
      setAuthenticationSuccess(() => {
        return {
          title: 'welcome back',
          message: `stay a while, ${res.authenticationSuccess.firstName}`,
          activate: true,
          affirmative: 'home',
        };
      });
    }
  };

  const onAccept = () => {
    setErrorModal({
      title: '',
      message: '',
      activate: false,
      affirmative: '',
    });
  };

  const handleRedirect = () => {
    setAuthenticationSuccess({
      title: '',
      message: '',
      activate: false,
      affirmative: '',
    });

    navigate('/');
  };

  return (
    <Layout>
      <SuccessHandler
        onAccept={handleRedirect}
        successModal={authenticationSuccess}
      />
      <ErrorHandler onAccept={onAccept} />
      <Form authType={`Sign In`} onSubmit={onSubmit}></Form>
    </Layout>
  );
}
