import React from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import ClientPage from './views/Client/ClientPage'


// Import dashboard components
import PMDashboard from './component/PM/PMDashboard';
import SalesDashboard from './component/Sales/SalesDashboard';
import AdministratorDashboard from './component/Administrator/AdministratorDashboard';
import AdminDashboard from './component/Admin/AdminDashboard';
import EngineerDashboard from './component/Engineer/EngineerDashboard';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Loginpage} />
          <PrivateRoute exact path="/pm/dashboard" component={PMDashboard} />
          <PrivateRoute exact path="/sales/dashboard" component={SalesDashboard} />
          <PrivateRoute exact path="/administrator/dashboard" component={AdministratorDashboard} />
          <PrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <PrivateRoute exact path="/engineer/dashboard" component={EngineerDashboard} />
          {/* Add more PrivateRoute components for other routes */}
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