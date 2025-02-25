import { useRef, useContext, useState } from 'react';
import classes from './WriteArticle.module.css';
import Layout from './Layout';
import Button from './Button/Button';
import { ThemeContext, useTheme } from '../store/theme-context';
import { filterThemeData, parseThemeData } from '../util/theme';
import styled from 'styled-components';
import { Input, TextAreaInput } from './Input/Input';

function WriteArticle() {
  const [isFocused, setIsFocused] = useState(false);
  const [theme, themesCollection, toggleTheme] = useTheme();

  const title = useRef();
  const content = useRef();

  const themeData = filterThemeData(theme, themesCollection);
  const styles = {};

  console.log('themeData', themeData);

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

    const response = await fetch('http://localhost:3000/admin/submit-article', {
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
    }).then((response) => response);

    console.log(response);
  }

  return (
    <div className={classes.body}>
      <form className={classes.form} onSubmit={onSubmitArticle}>
        <Button className="submit_button" value="submit">
          Submit
        </Button>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <Input
            formFieldColor={styles.formFieldColor}
            textColor={styles.textColor}
            formFieldActiveColor={styles.formFieldActiveColor}
            formFieldBorderColor={styles.formFocusBorderColor}
            titleRef={title}
          ></Input>
        </div>
        <div className={classes.control}>
          <label htmlFor="content">Content</label>
          <TextAreaInput
            formFieldColor={styles.formFieldColor}
            formFieldActiveColor={styles.formFieldActiveColor}
            formFieldBorderColor={styles.formFocusBorderColor}
            textColor={styles.textColor}
            contentRef={content}
          ></TextAreaInput>
        </div>
      </form>
    </div>
  );
}

export default WriteArticle;
