import classes from './ControlColumn';

export default function ControlColumn({ children }) {
  return <div className={classes['control-column']}>{children}</div>;
}
