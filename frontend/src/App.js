import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from './context/AuthContext';
import Loginpage from './views/Login/Loginpage';
import Registerpage from './views/Registerpage';
import Dashboard from './views/Admin/Dashboard_admin';
import Client_admin from './views/Admin/Client_admin';
import Project_admin from './views/Admin/Project_admin';
import Document_admin from './views/Admin/Document_admin';
import Users_admin from './views/Admin/Users_admin';
import Invoice_admin from './views/Admin/Invoice_admin';
import Payment_admin from './views/Admin/Payment_admin';
import Form_Tambah_Client from './views/Admin/Tambah_Form_Client';
import Form_Tambah_Invoice from './views/Admin/Tambah_Form_Invoice';
import Form_Edit_Invoice from './views/Admin/Edit_Form_Invoice';
import { MyNav } from './views/LandingPage/Nav';
import { Banner } from './views/LandingPage/Banner';
import ClientPage from './views/Client/ClientPage';
import { DocumentProvider } from './context/DocumentContext';
import { InvoiceProvider } from './context/InvoiceContext';
import { PaymentProvider } from './context/PaymentContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Loginpage} path="/login" />

          {/* Admin */}
          <Route component={ClientAdminFunction} path="/client-admin" />
          <Route component={ProjectAdminFunction} path="/project-admin" />
          <Route component={DocumentAdminFunction} path="/document-admin" />
          <Route component={UsersAdminFunction} path="/users-admin" />
          <Route component={InvoiceAdminFunction} path="/invoice-admin" />
          <Route component={PaymentAdminFunction} path="/payment-admin" />
          <Route component={FormTambahClientFunction} path="/Form_Tambah_Client" />
          <Route component={FormTambahInvoiceFunction} path="/Form_Tambah_Invoice" />
          <Route component={FormEditInvoiceFunction} path="/invoice-edit/:invoiceId" />

          <Route component={Home} path="/" exact />
          <Route component={ClientPage} path="/client" exact />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

function FormTambahClientFunction() {
  return (
    <div>
      <Form_Tambah_Client />
    </div>
  );
}

function FormTambahInvoiceFunction() {
  return (
    <div>
      <Form_Tambah_Invoice />
    </div>
  );
}

function FormEditInvoiceFunction() {
  return (
    <div>
      <Form_Edit_Invoice />
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

function ProjectAdminFunction() {
  return (
    <div>
      <Project_admin />
    </div>
  );
}

function DocumentAdminFunction() {
  return (
    <div>
      <DocumentProvider>
        <Document_admin />
      </DocumentProvider>
    </div>
  );
}

function UsersAdminFunction() {
  return (
    <div>
      <Users_admin />
    </div>
  );
}

function InvoiceAdminFunction() {
  return (
    <div>
      <InvoiceProvider>
        <Invoice_admin />
      </InvoiceProvider>
    </div>
  );
}

function PaymentAdminFunction() {
  return (
    <div>
      <PaymentProvider>
        <Payment_admin/>
      </PaymentProvider>
    </div>
  );
}

export default App;