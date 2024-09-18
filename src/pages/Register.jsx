import React from 'react';
import styles from '../css/pages/Login.module.css';
import { userRegister } from '../api';
import { UserContext } from '../contexts/UserContext';

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const { userLoginFunc } = React.useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !password || !confirmPassword || !name) {
      return setError('Preencha todos os campos');
    }

    if (password !== confirmPassword) {
      return setError('As senhas não correspondem');
    }

    try {
      setLoading(true);
      const { url, options } = userRegister(name, email, password);
      const response = await fetch(url, options);
      const json = await response.json();
      if (!json.success) {
        throw new Error(json.message || 'Erro ao registrar o usuário');
      }

      userLoginFunc(email, password);

      setSuccess(true);
      setError(null);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Registrar</h2>

        {success && (
          <p className={styles.successMessage}>
            Usuário registrado com sucesso!
          </p>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            placeholder="Digite seu nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

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

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme sua senha"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>

        <p>
          Já é cadastrado? <a href="/login">Clique aqui</a>
        </p>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
