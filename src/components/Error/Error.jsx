import React from 'react';
import classes from './Error.module.css';

export default function Error({ message }) {
  return <p className={classes.error}>{message}</p>;
}
