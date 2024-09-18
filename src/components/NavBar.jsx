import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/components/NavBar.module.css';
import logoBlog from '../_assets/img/logo-blog.jpg'
import loginIcon from '../_assets/img/login-icon.jpg'

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <img 
        src={logoBlog}
        alt="Logo do blog" 
        className={styles['logo-blog']}
        width={80}
        height={80} />
      <div className={styles['link-container']}>
        <Link to="/">Home</Link>
        <Link to="/completed">Cadastrar Post</Link>
      </div>
      <Link to="/login" className={styles['login-link']}>
      <img 
        src={loginIcon}
        alt="Icone do login" 
        className={styles['login-icon']}
        width={40}
        height={40} />
      </Link>
    </nav>
  );
};

export default NavBar;
