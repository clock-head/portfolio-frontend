import { useActionState, useContext, useRef } from 'react';
import { buildFormDataPayload } from '../../util/auth';
import { ThemeContext, useTheme } from '../../store/theme-context';
import { filterThemeData, parseThemeData } from '../../util/theme';
import FieldSet from './FieldSet';
import Error from '../Error/Error';
import { Input } from '../Input/Input';
import classes from './Form.module.css';
import { useLocation } from 'react-router-dom';
import { ErrorContext, useError } from '../../store/error-context';
import ControlRow from '../FlowControl/ControlRow';
import ControlColumn from '../FlowControl/ControlColumn';

export default function Form({ authType, onSubmit }) {
  const [theme, themesCollection, toggleTheme] = useTheme();
  const [errorModal, setErrorModal, formError, setFormError] = useError();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  const formClass = authType.toLowerCase().replace(' ', '-');

  const themeData = filterThemeData(theme, themesCollection);
  let formStyles;
  const inputSpecs = {
    height: '2rem',
    width: '100%',
    fontSize: '0.8rem',
  };

  if (theme !== 'space_racer' && themeData) {
    formStyles = parseThemeData(themeData, 'auth');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    // const formData = {
    //   email: emailInputRef.current.value,
    //   password: passwordInputRef.current.value,
    //   firstName: firstNameInputRef.current?.value,
    //   lastName: lastNameInputRef.current?.value,
    // };

    const payload = buildFormDataPayload(authType, formData);

    await onSubmit(payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${classes[theme]} ${classes.form} ${classes[formClass]}`}
    >
      <h2>{authType}</h2>
      {authType === 'Sign Up' && (
        <p className={classes.welcome}>Welcome, let's get acquainted.</p>
      )}

      <Input
        label="email"
        width={inputSpecs.width}
        fontSize={inputSpecs.fontSize}
        inputRef={emailInputRef}
        name="email"
      ></Input>

      <ControlRow>
        <Input
          label="password"
          height={inputSpecs.height}
          width={inputSpecs.width}
          fontSize={inputSpecs.fontSize}
          inputRef={passwordInputRef}
          name="password"
        ></Input>
        {authType === 'Sign Up' && <Input label="confirm-password"></Input>}
      </ControlRow>

      {authType === 'Sign Up' && (
        <>
          <hr />
          <ControlRow>
            <Input
              label="first-name"
              height={inputSpecs.height}
              width={inputSpecs.width}
              fontSize={inputSpecs.fontSize}
              inputRef={firstNameInputRef}
              name="first-name"
            ></Input>
            <Input
              label="last-name"
              height={inputSpecs.height}
              width={inputSpecs.width}
              fontSize={inputSpecs.fontSize}
              inputRef={lastNameInputRef}
              name="last-name"
            ></Input>
          </ControlRow>
        </>
      )}

      {authType === 'Sign Up' && <FieldSet errors={formError}></FieldSet>}

      <p className="form-actions">
        <button
          type="reset"
          className={`${classes['button']} ${classes['button-flat']}`}
        >
          Reset
        </button>
        <button className={classes.button} name="submit">
          {authType}
        </button>
      </p>
    </form>
  );
}
