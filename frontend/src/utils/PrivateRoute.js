import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { authTokens } = useContext(AuthContext);

  if (!authTokens || !authTokens.access) {
    // Jika authTokens tidak tersedia atau tidak memiliki properti access, redirect ke halaman login
    return <Redirect to="/login" />;
  }

  let decodedToken;
  try {
    decodedToken = jwt_decode(authTokens.access);
  } catch (error) {
    console.error('Error decoding token:', error);
    console.error('Token yang gagal di-decode:', authTokens.access);
    // Redirect ke halaman login jika terjadi kesalahan saat decoding token
    return <Redirect to="/login" />;
  }

  if (!decodedToken.groups || decodedToken.groups.length === 0) {
    // Jika tidak ada grup pengguna dalam token, redirect ke halaman login
    return <Redirect to="/login" />;
  }

  const firstGroup = decodedToken.groups[0];

  // Jika tidak ada roles yang diizinkan, atau jika pengguna memiliki salah satu role yang diizinkan
  if (!allowedRoles || allowedRoles.includes(firstGroup)) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    // Redirect ke halaman sesuai dengan grup pengguna
    switch (firstGroup) {
      case 1:
        return <Redirect to="/pm/dashboard" />;
      case 2:
        return <Redirect to="/sales/dashboard" />;
      case 3:
        return <Redirect to="/administrator/dashboard" />;
      case 4:
        return <Redirect to="/admin/dashboard" />;
      case 5:
        return <Redirect to="/engineer/dashboard" />;
      default:
        return <Redirect to="/login" />;
    }
  }
};

export default PrivateRoute;
