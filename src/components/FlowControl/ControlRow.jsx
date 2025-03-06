import classes from './ControlRow.module.css';

export default function ControlRow({ children }) {
  return <div className={classes['control-row']}>{children}</div>;
}
