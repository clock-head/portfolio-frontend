import React, { useState, useRef, Fragment, useEffect } from 'react';

export default function ArticleBody({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <article>
        <section>
          <p>{post.content}</p>
        </section>
      </article>
    </div>
  );
}
