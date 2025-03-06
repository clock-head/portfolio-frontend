import { Link } from 'react-router-dom';
import getDate from '../util/date';

import classes from './PostList.module.css';

function PostList({ posts }) {
  console.log(posts);

  return (
    <ul className={classes.list}>
      {posts.map((post) => (
        <li key={post.timeStamp}>
          <Link to={`/blog/${post.timeStamp.toString()}`}>
            <img src="" alt="post image" className={classes.postImage}></img>
            <h3>{post.title}</h3>
            <p>posted on: {getDate(post.timeStamp)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
