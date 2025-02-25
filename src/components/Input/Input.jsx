import React, { useContext, useState } from 'react';
import classes from './Input.module.css';

export const Input = ({
  formFieldColor,
  textColor,
  formFieldActiveColor,
  formFieldBorderColor,
  titleRef,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = {
    backgroundColor: isFocused ? formFieldActiveColor : formFieldColor,
    color: textColor,
    border: isFocused ? formFieldBorderColor : '',
    outline: 'none',
    display: 'block',
    height: '3rem',
    width: '70%',
    borderRadius: '5px',
    fontSize: '1.5rem',
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  // @media (min-width: 60rem) {
  //   margin-left: 8.5rem;
  // }

  return (
    <>
      {/* <Input></Input> */}
      <input
        style={inputStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        className={classes.input}
        ref={titleRef}
      ></input>
    </>
  );
};

export const TextAreaInput = ({
  formFieldColor,
  textColor,
  formFieldActiveColor,
  formFieldBorderColor,
  contentRef,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const textAreaStyle = {
    backgroundColor: isFocused ? formFieldActiveColor : formFieldColor,
    border: isFocused ? formFieldBorderColor : '',
    color: textColor,
    outline: 'none',
    display: 'block',
    minHeight: '30vh',
    maxHeight: '40vh',
    width: '80%',
    borderRadius: '5px',
    fontSize: '1rem',
  };

  // const TextAreaInput = styled.textarea`
  //   background-color: ${formFieldColor};
  //   color: ${textColor};
  //   outline: none;
  //   display: block;
  // min-height: 30vh;
  // max-height: 40vh;
  // width: 80%;
  // border-radius: 5px;
  // font-size: 1rem;

  // @media (min-width: 60rem) {
  //   margin-left: 8.5rem;
  // }
  // `;

  return (
    <>
      <textarea
        style={textAreaStyle}
        className={classes.textArea}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={contentRef}
      ></textarea>
    </>
  );
};
