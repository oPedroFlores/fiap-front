import React from 'react';
import styles from '../../css/pages/Home.module.css';

const Post = ({ post }) => {
  return (
    <article className={`${styles.post} animeLeftIn`}>
      <div className={styles.postContent}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <small>Criado em: {post.createdAt}</small>
        <a href={`/post/${post.id}`} className={styles.readMore}>
          Leia mais &rarr;
        </a>
      </div>
    </article>
  );
};

export default Post;
