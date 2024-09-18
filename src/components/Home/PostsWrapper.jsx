import React from 'react';
import Post from './Post';
import styles from '../../css/pages/Home.module.css';

const PostsWrapper = ({ posts }) => {
  return (
    <div className={styles.postsWrapper}>
      {posts.map((post, index) => (
        <Post key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};

export default PostsWrapper;
