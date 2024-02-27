// Navigation.js
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import routes from './index';
import Login from '../views/Login/Loginpage'; 
import React, { useContext } from 'react'; 
import AuthContext from '../context/AuthContext';



const Navigation = () => {
  const { authTokens } = useContext(AuthContext); 

  return (
    <Switch>
      <Route path="/login" exact component={Login} />

      {routes.map((route, index) => (
        <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
          allowedRoles={route.allowedRoles}
        />
      ))}
      <Redirect to="/login" />
    </Switch>
  );
};

export default Navigation;


