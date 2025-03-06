import { useRef, useContext, useState, useEffect } from 'react';
import classes from './WriteArticle.module.css';
import Layout from './Layout';
import Button from './Button/Button';
import { ThemeContext, useTheme } from '../store/theme-context';
import { filterThemeData, parseThemeData } from '../util/theme';
import styled from 'styled-components';
import { Input, TextAreaInput } from './Input/Input';
import ControlColumn from './FlowControl/ControlColumn';

function WriteArticle() {
  const [isFocused, setIsFocused] = useState(false);
  const [theme, themesCollection, toggleTheme] = useTheme();
  let apiUrl = sessionStorage.getItem('apiUrl');

  const title = useRef();
  const content = useRef();

  const themeData = filterThemeData(theme, themesCollection);
  const styles = {};

  if (theme !== 'space_racer' && themeData) {
    const themeStyles = parseThemeData(themeData, 'newArticle');
    styles.formFieldColor = themeStyles.formFieldColor;
    styles.formFieldActiveColor = themeStyles.formFieldActiveColor;
    styles.formFocusBorderColor = themeStyles.formFocusBorderColor;
    styles.textColor = themeStyles.formInputTextColor;
  }

  async function onSubmitArticle(e) {
    e.preventDefault();
    const enteredTitle = title.current.value;
    const enteredContent = content.current.value;

    const response = await fetch(
      `https://${apiUrl}/api/1.0/admin/submit-article`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: enteredTitle,
          slug: enteredTitle.replaceAll(' ', '_').toLowerCase(),
          content: enteredContent,
        }),
        mode: 'cors',
      }
    ).then((response) => response);

    // success or failure modal for UX
  }

  return (
    <div className={classes.body}>
      <form className={classes.form} onSubmit={onSubmitArticle}>
        <Button className="submit_button" value="submit">
          Submit
        </Button>

        <ControlColumn>
          <Input
            label="title"
            labelColor="white"
            inputRef={title}
            height="3rem"
            fontSize="1.5rem"
            marginBottom="1rem"
            marginLeft="8.5rem"
          ></Input>
          <TextAreaInput
            label="content"
            contentRef={content}
            labelColor="white"
            marginLeft="8.5rem"
          ></TextAreaInput>
        </ControlColumn>
      </form>
    </div>
  );
}

export default WriteArticle;
