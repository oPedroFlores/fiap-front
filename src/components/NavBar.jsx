import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/components/NavBar.module.css';
import logoBlog from '../_assets/img/logo-nobg.png';
import loginIcon from '../_assets/img/login-icon.jpg';
import { UserContext } from '../contexts/UserContext';
const NavBar = () => {
  const { logged, data, userLogout } = React.useContext(UserContext);
  return (
    <nav className={styles.navBar}>
      <div>
        <img
          src={logoBlog}
          alt="Logo do blog"
          className={styles['logo-blog']}
          width={80}
          height={80}
        />
        <div className={styles['link-container']}>
          <Link to="/">Home</Link>

          {data && data.role === 'professor' ? (
            <Link to="/completed">Cadastrar Post</Link>
          ) : (
            ''
          )}
          {!data && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Cadastrar</Link>
            </>
          )}
        </div>
      </div>
      {!logged ? (
        <Link to="/login" className={styles['login-link']}>
          <img
            src={loginIcon}
            alt="Icone do login"
            className={styles['login-icon']}
            width={40}
            height={40}
          />
        </Link>
      ) : (
        ``
      )}

      {data && (
        <div className={styles['user-info']}>
          <p>
            Seja bem vindo, <span>{data.name}</span>!
          </p>
          <button className={styles['logout-button']} onClick={userLogout}>
            Deslogar
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
