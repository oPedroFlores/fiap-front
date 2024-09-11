import React from 'react';
import styles from '../css/components/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <h3>Blog Da FIAP</h3>
      <a href="/" target="_blank">
        Login
      </a>
    </nav>
  );
};

export default NavBar;
