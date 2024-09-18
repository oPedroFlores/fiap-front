// Login.js
import React from 'react';
import styles from '../css/pages/Login.module.css';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { userLoginFunc, error, loading } = React.useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    userLoginFunc(email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? 'Enviando...' : 'Entrar'}
        </button>

        <p>
          Ainda não possui uma conta? <a href="/register">Clique aqui</a>
        </p>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
