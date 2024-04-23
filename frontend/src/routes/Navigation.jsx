import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import routes from './index';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import Login from '../views/Login/Loginpage';
import { DocumentProvider } from '../context/DocumentContext';
import { ClientProvider } from '../context/ClientContext';
import { InvoiceProvider } from '../context/InvoiceContext';
import { PaymentProvider } from '../context/PaymentContext';
import { ProjectProvider } from '../context/ProjectContext';
<<<<<<< HEAD
import { ActivityProvider } from '../context/ActivityContext';
import { UserProvider } from '../context/UserContext';
import { ProfileProvider } from '../context/ProfileContext';
=======
>>>>>>> fafb99055096343141f8c333118656595f67a770

const Navigation = () => {
  const { authTokens } = useContext(AuthContext);
  const [redirectTo, setRedirectTo] = useState(null);

  return (
<<<<<<< HEAD
    <UserProvider>
      <ProfileProvider>
        <ProjectProvider>
          <PaymentProvider>
            <InvoiceProvider>
              <DocumentProvider>
                <ClientProvider>
                  <ActivityProvider>
                    <Router>
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
                        <Route render={({ location }) => {
                          if (!authTokens) {
                            // Jika pengguna belum login, simpan halaman yang ingin diakses
                            setRedirectTo(location.pathname);
                            return <Redirect to="/login" />;
                          } else if (redirectTo) {
                            // Jika pengguna sudah login dan ada halaman yang disimpan, arahkan ke halaman tersebut
                            const redirectToPath = redirectTo;
                            setRedirectTo(null); // Reset redirectTo setelah digunakan
                            return <Redirect to={redirectToPath} />;
                          } else {
                            // Jika pengguna sudah login tetapi tidak ada halaman yang disimpan, arahkan ke halaman asal yang ditentukan
                            return <Redirect to="/pm/dashboard" />;
                          }
                        }} />
                      </Switch>
                    </Router>
                  </ActivityProvider>
                </ClientProvider>
              </DocumentProvider>
            </InvoiceProvider>
          </PaymentProvider>
        </ProjectProvider>
        </ProfileProvider>
    </UserProvider>
=======
    <ProjectProvider>
    <PaymentProvider>
    <InvoiceProvider>
    <DocumentProvider>
    <ClientProvider>
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
    </ClientProvider>
    </DocumentProvider>
    </InvoiceProvider>
    </PaymentProvider>
    </ProjectProvider>
>>>>>>> fafb99055096343141f8c333118656595f67a770
  );
};

export default Navigation;
