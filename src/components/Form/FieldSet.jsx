import classes from './FieldSet.module.css';
import Error from '../Error/Error';

export default function FieldSet({ errors }) {
  return (
    <div className={classes.container}>
      <div className={`${classes.control} ${classes['drop-down']}`}>
        <label htmlFor="role">What best describes your role?</label>
        <select id="role" name="role">
          <option value="project-manager">Project Manager</option>
          <option value="business-owner">Small-Business Owner</option>
          <option value="recruiter">Recruiter</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find me?</legend>
        <div className={classes.control}>
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>
        <div className={classes.control}>
          <input
            type="checkbox"
            id="linkedin"
            name="acquisition"
            value="linkedin"
          />
          <label htmlFor="google">LinkedIn</label>
        </div>

        <div className={classes.control}>
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className={classes.control}>
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>
      <div className={classes.control}>
        {errors && errors.acquisitionChannel && (
          <Error message={errors.acquisitionChannel}></Error>
        )}
      </div>
    </div>
  );
}
