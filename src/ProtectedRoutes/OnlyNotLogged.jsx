// OnlyNotLogged.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const OnlyNotLogged = () => {
  const { logged, loading } = React.useContext(UserContext);

  if (loading) return <p>Carregando...</p>;
  if (logged === false) return <Outlet />;
  else if (logged === true) return <Navigate to="/" />;
  else return null;
};

export default OnlyNotLogged;
