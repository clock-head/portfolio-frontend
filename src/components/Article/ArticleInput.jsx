import React, { useRef, useEffect } from 'react';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';

import classes from './ArticleInput.module.css';

export default function ArticleInput() {
  const editorRef = useRef(null);

  useEffect(() => {
    const state = EditorState.create({
      schema,
    });

    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        let newState = view.state.apply(transaction);

        view.updateState(newState);
      },
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div
      className={classes.editor}
      ref={editorRef}
      tabIndex={0}
      onClick={() => editorRef.current.focus()}
    ></div>
  );
}
