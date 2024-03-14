import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import {MyNav} from './views/LandingPage/Nav'
import {Banner} from './views/LandingPage/Banner'
import Navigation from './routes/Navigation'; // Correct path
import Login from './views/Login/Loginpage'
import PrivateRoute from "./utils/PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
            <Route component={Home} path="/" exact />          
            <Route component={Login} path="/login" exact />          
            <PrivateRoute component={Navigation} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  return (
    <div>
      <MyNav />
      <Banner />
      {/* <Features />
      <Projects /> */}
    </div>
  );
}

export default App;

