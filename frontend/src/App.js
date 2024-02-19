import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

import Loginpage from './views/Login/Loginpage'
import Dashboard from './views/Dashboard'
import { MyNav } from './views/LandingPage/Nav'
import { Banner } from './views/LandingPage/Banner'
import ClientPage from './views/Client/ClientPage'



function App() {
  return (
    <Router>
      <AuthProvider>
        {/* < Navbar/> */}
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Loginpage} path="/login" />
          {/* <Route component={Registerpage} path="/register" exact /> */}
          <Route component={Home} path="/" exact />
          <Route component={ClientPage} path="/client" exact />
        </Switch>
      </AuthProvider>
    </Router>
  )
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

export default App