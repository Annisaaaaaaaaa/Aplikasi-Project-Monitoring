import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import routes from './index';
import React from 'react';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import Login from '../views/Login/Loginpage';

const Navigation = () => {
  const { authTokens } = useContext(AuthContext);

  return (
    <Switch>
      {routes.map((route, index) => (
        <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
          allowedRoles={route.allowedRoles}
        />
      ))}
      <Route path="/login" exact component={Login} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Navigation;
