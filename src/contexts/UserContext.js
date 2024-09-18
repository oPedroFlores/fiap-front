// UserContext.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin, autoLogin } from '../api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function userLoginFunc(email, password) {
    setError(null);
    setLoading(true);

    try {
      const { url, options } = userLogin(email, password);
      const response = await fetch(url, options);
      const json = await response.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      const token = json.token;
      const userData = json.user;

      // Salva apenas o token no localStorage
      localStorage.setItem('token', token);

      // Armazena os dados do usuário no estado
      setData(userData);
      setLogged(true);

      navigate('/');
    } catch (err) {
      setError(err.message);
      setLogged(false);
    } finally {
      setLoading(false);
    }
  }

  async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogged(false);
    localStorage.removeItem('token');
    navigate('/login');
  }

  React.useEffect(() => {
    async function autoLoginFunc() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = autoLogin(token);
          const response = await fetch(url, options);
          const json = await response.json();

          if (!json.success) {
            throw new Error(json.message);
          }

          const userData = json.user;
          setData(userData);
          setLogged(true);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogged(false);
      }
    }

    autoLoginFunc();
  }, []);

  return (
    <UserContext.Provider
      value={{ userLoginFunc, userLogout, data, error, loading, logged }}
    >
      {children}
    </UserContext.Provider>
  );
};
