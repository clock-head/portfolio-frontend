import React, { useState, Fragment } from 'react';

export default function ArticleBody({ title, content }) {
  return (
    <Fragment>
      <main>
        <article>
          <header>
            <h1>{title}</h1>
          </header>

          {/* content is saved as an array of objects */}

          <section>
            {content.map((paragraph) => {
              return <p>{paragraph}</p>;
            })}
          </section>
        </article>
      </main>
    </Fragment>
  );
}
