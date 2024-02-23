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
import Invoice_admin from './views/Admin/Invoice_admin'
import Payment_admin from './views/Admin/Payment_admin'
import { MyNav } from './views/LandingPage/Nav'
import { Banner } from './views/LandingPage/Banner'
import ClientPage from './views/Client/ClientPage'
import { DocumentProvider } from './context/DocumentContext'



function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Loginpage} path="/login" />

          {/* Admin */}
          <Route component={ClientAdminFunction} path="/client-admin" />
          <Route component={ProjectAdminFunctionn} path="/project-admin" />
          <Route component={DocumentAdminFunctionn} path="/document-admin" />
          <Route component={UsersAdminFunctionn} path="/users-admin" />
          <Route component={InvoiceAdminFunctionn} path="/invoice-admin" />
          <Route component={PaymentAdminFunctionn} path="/payment-admin" />
          <Route component={formTambahClientFunction} path="/Form_Tambah_Client" />
          <Route component={Home} path="/" exact />
          <Route component={ClientPage} path="/client" exact />
        </Switch>
      </AuthProvider>
    </Router>
  )
}


function formTambahClientFunction() {
  return (
    <div>
      <Form_Tambah_Client />
    </div>
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
      <DocumentProvider>
        <Document_admin />
      </DocumentProvider>
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

function InvoiceAdminFunctionn() {
  return (
    <div>
      <Invoice_admin/>
    </div>
  );
}

function PaymentAdminFunctionn() {
  return (
    <div>
      <Payment_admin/>
    </div>
  );
}



export default App