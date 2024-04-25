import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
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
import Form_Tambah_Doc from './views/Admin/Tambah_Form_Doc';
import Form_Edit_Doc from './views/Admin/Edit_Form_Doc'
import { MyNav } from './views/LandingPage/Nav';
import { Banner } from './views/LandingPage/Banner';
import ClientPage from './views/Client/ClientPage';
import { DocumentProvider } from './context/DocumentContext';
import { InvoiceProvider } from './context/InvoiceContext';
import { PaymentProvider } from './context/PaymentContext';
import { ClientProvider } from './context/ClientContext';
import { ProjectProvider } from './context/ProjectContext';
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

            {/* Admin */}
          {/* <Route component={ClientAdminFunction} path="/client-admin" />
          <Route component={ProjectAdminFunction} path="/project-admin" />
          <Route component={DocumentAdminFunction} path="/document-admin" />
          <Route component={UsersAdminFunction} path="/users-admin" />
          <Route component={InvoiceAdminFunction} path="/invoice-admin" />
          <Route component={PaymentAdminFunction} path="/payment-admin" /> */}
          {/* <Route component={FormTambahClientFunction} path="/Form_Tambah_Client" />
          <Route component={FormTambahInvoiceFunction} path="/Form_Tambah_Invoice" />
          <Route component={FormEditInvoiceFunction} path="/invoice-edit/:invoiceId" />
          <Route component={FormTambahDocumentFunction} path="/Form_Tambah_Document"/>
          <Route component={FormEditDocFunction} path="/doc-edit/:documentId" /> */}

          {/* <Route component={Home} path="/" exact /> */}
          {/* <Route component={ClientPage} path="/client" exact /> */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// function FormTambahDocumentFunction() {
//   return (
//     <div>
//       <Form_Tambah_Doc />
//     </div>
//   );
// }

// function FormTambahClientFunction() {
//   return (
//     <div>
//       <Form_Tambah_Client />
//     </div>
//   );
// }

// function FormTambahInvoiceFunction() {
//   return (
//     <div>
//       <Form_Tambah_Invoice />
//     </div>
//   );
// }

// function FormEditInvoiceFunction() {
//   return (
//     <div>
//       <Form_Edit_Invoice />
//     </div>
//   );
// }

// function FormEditDocFunction() {
//   return (
//     <div>
//       <Form_Edit_Doc />
//     </div>
//   );
// }

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

