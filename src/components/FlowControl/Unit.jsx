import classes from './Unit.module.css';

export default function Unit({ children, ...props }) {
  return <div style={{ alignSelf: props.alignment }}>{children}</div>;
}
