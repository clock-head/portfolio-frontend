import { useActionState, useContext } from 'react';
import { buildFormDataPayload } from '../../util/auth';
import { ThemeContext, useTheme } from '../../store/theme-context';
import { filterThemeData, parseThemeData } from '../../util/theme';
import FieldSet from './FieldSet';
import Error from '../Error/Error';
import classes from './Form.module.css';
import { useLocation } from 'react-router-dom';
import { ErrorContext, useError } from '../../store/error-context';

export default function Form({ authType, onSubmit }) {
  const [theme, themesCollection, toggleTheme] = useTheme();
  const [errorModal, setErrorModal, formError, setFormError] = useError();

  const formClass = authType.toLowerCase().replace(' ', '-');

  const themeData = filterThemeData(theme, themesCollection);
  let formStyles;

  if (theme !== 'space_racer' && themeData) {
    formStyles = parseThemeData(themeData, 'auth');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
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

      <div
        className={`${classes.control} ${classes.email} ${classes['text-input']}`}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
        {formError && formError.email && (
          <Error message={formError.email}></Error>
        )}
      </div>
      {}
      <div className={classes['control-row']}>
        <div className={`${classes.control} ${classes['text-input']}`}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
          {formError && formError.password && (
            <Error message={formError.password}></Error>
          )}
        </div>

        {authType === 'Sign Up' && (
          <div className={`${classes.control} ${classes['text-input']}`}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
            />
            {formError && formError.confirmPassword && (
              <Error message={formError.confirmPassword}></Error>
            )}
          </div>
        )}
      </div>

      {authType === 'Sign Up' && (
        <>
          <hr />
          <div className={classes['control-row']}>
            <div className={`${classes.control} ${classes['text-input']}`}>
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" />
              {formError && formError.firstName && (
                <Error message={formError.firstName}></Error>
              )}
            </div>

            <div className={`${classes.control} ${classes['text-input']}`}>
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" />
              {formError && formError.lastName && (
                <Error message={formError.lastName}></Error>
              )}
            </div>
          </div>
        </>
      )}

      {/* <div className={classes['control-row']}>
        <div className={`${classes.control} ${classes['text-input']}`}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className={`${classes.control} ${classes['text-input']}`}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div> */}

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
