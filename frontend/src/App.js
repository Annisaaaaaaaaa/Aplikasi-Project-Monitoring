import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

import Loginpage from './views/Login/Loginpage'
import Registerpage from './views/Registerpage'
import Dashboard from './views/Admin/Dashboard_admin'
import Client_admin from './views/Admin/Client_admin'
import Project_admin from './views/Admin/Project_admin'
import Document_admin from './views/Admin/Document_admin'
import Users_admin from './views/Admin/Users_admin'
import { MyNav } from './views/LandingPage/Nav'
import { Banner } from './views/LandingPage/Banner'


function App() {
  return (
    <Router>
      <AuthProvider>
        {/* < Navbar/> */}
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Loginpage} path="/login" />

          {/* Admin */}
          <Route component={ ClientAdminFunction} path="/client-admin" />
          <Route component={ ProjectAdminFunctionn } path="/project-admin" />
          <Route component={ DocumentAdminFunctionn } path="/document-admin" />
          <Route component={ UsersAdminFunctionn } path="/users-admin" />

          {/* <Route component={Registerpage} path="/register" exact /> */}
          <Route component={Home} path="/" exact />
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

function ClientAdminFunction() {
  return (
    <div>
      <Client_admin />
    </div>
  );
}

function ProjectAdminFunctionn() {
  return (
    <div>
      <Project_admin />
    </div>
  );
}

function DocumentAdminFunctionn() {
  return (
    <div>
      <Document_admin />
    </div>
  );
}

function UsersAdminFunctionn() {
  return (
    <div>
      <Users_admin />
    </div>
  );
}



export default App