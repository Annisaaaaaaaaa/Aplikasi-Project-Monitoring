import AdminDashboard from '../component/Admin/AdminDashboard';
import UserList from '../component/Administrator/USerList';
import AddUser from '../component/Administrator/AddUser';
import ClientPage from '../views/Client/ClientPage'
import Client_admin from '../views/Admin/Client_admin';
import Project_admin from '../views/Admin/Project_admin';
import Document_admin from '../views/Admin/Document_admin';
import Users_admin from '../views/Admin/Users_admin';
import Invoice_admin from '../views/Admin/Invoice_admin';
import Payment_admin from '../views/Admin/Payment_admin';
import Form_Tambah_Client from '../views/Admin/Tambah_Form_Client';
<<<<<<< HEAD
import InvoiceEditForm from '../views/Admin/Edit_Form_Invoice';
import Form_Tambah_Doc from '../views/Admin/Tambah_Form_Doc';
// import Update_doc from '../views/Admin/Edit_Form_Doc';
import Tambah_Form_Invoice from '../views/Admin/Tambah_Form_Invoice';
import Edit_doc from '../views/Admin/Edit_Form_Doc';
// import Form_Tambah_Payment from '../views/Admin/Tambah_Form_Payment';
// import PaymentEditForm from '../views/Admin/Edit_Form_Payment';
=======
import Form_Edit_Client from '../views/Admin/Edit_Form_Client';
import Form_Tambah_Project from '../views/Admin/Tambah_Form_Project';
import InvoiceEditForm from '../views/Admin/Edit_Form_Invoice';
import Form_Tambah_Doc from '../views/Admin/Tambah_Form_Doc';
import Update_doc from '../views/Admin/Edit_Form_Doc';
import Tambah_Form_Invoice from '../views/Admin/Tambah_Form_Invoice';
import Form_Tambah_Payment from '../views/Admin/Tambah_Form_Payment';
import PaymentEditForm from '../views/Admin/Edit_Form_Payment';
// import Form_Edit_Client from '../views/Admin/Edit_Form_Client';
import DetailFormInvoice from '../component/Invoice/InvoicePage';
import DetailFormPayment from '../component/Payment/PaymentPage';
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced

const adminRoutes = [
  {
    path: '/admin/dashboard',
    exact: true,
    component: AdminDashboard,
    allowedRoles: [4] 
  },
  {
    path: '/admin/user',
    exact: true,
    component: UserList,
    allowedRoles: [4]
  },
  {
    path: '/admin/user/tambah',
    exact: true,
    component: AddUser,
    allowedRoles: [4]
  },
  {
    path: '/admin/client',
    exact: true,
    component: ClientPage,
    allowedRoles: [4]
  },

  {
    path: '/client-admin',
    exact: true,
    component: Client_admin,
    allowedRoles: [4, 2, 3, 1] 
  },
  {
    path: '/project-admin',
    exact: true,
    component: Project_admin,
    allowedRoles: [4]
  },
  {
    path: '/document-admin',
    exact: true,
    component: Document_admin,
    allowedRoles: [4, 3, 1]
  },
  {
    path: '/users-admin',
    exact: true,
    component: Users_admin,
    allowedRoles: [4]
  },
  {
    path: '/invoice-admin',
    exact: true,
    component: Invoice_admin,
    allowedRoles: [4] 
  },
  {
    path: '/payment-admin',
    exact: true,
    component: Payment_admin,
    allowedRoles: [4]
  },
  {
    path: '/Form_Tambah_Client',
    exact: true,
    component: Form_Tambah_Client,
    allowedRoles: [4]
  },
  {
<<<<<<< HEAD
=======
    path: '/admin/Edit_Form_Client/:clientId',
    exact: true,
    component: Form_Edit_Client,
    allowedRoles: [4]
  },
  {
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
    path: '/Form_Tambah_Invoice',
    exact: true,
    component: Tambah_Form_Invoice,
    allowedRoles: [4]
  },
  {
    path: '/invoice-edit/:invoiceId',
    exact: true,
    component: InvoiceEditForm,
    allowedRoles: [4] 
  },
<<<<<<< HEAD

=======
  {
    path: '/invoice-detail/:invoiceId',
    exact: true,
    component: DetailFormInvoice,
    allowedRoles: [4] 
  },
  {
    path: '/payment-detail/:paymentId',
    exact: true,
    component: DetailFormPayment,
    allowedRoles: [4] 
  },
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
  {
    path: '/Form_Tambah_Document',
    exact: true,
    component: Form_Tambah_Doc,
    allowedRoles: [4]
  },
  {
<<<<<<< HEAD
    path: '/edit_doc/:documentId',
    exact: true,
    component: Edit_doc,
    allowedRoles: [4]
  }
  // {
  //   path: '/Form_Tambah_Document',
  //   exact: true,
  //   component: Form_Tambah_Doc,
  //   allowedRoles: [4]
  // },
  // {
  //   path: '/doc-edit/:documentId',
  //   exact: true,
  //   component: Update_doc,
  //   allowedRoles: [4]
  // },
  // {
  //   path: '/Form_Tambah_Payment',
  //   exact: true,
  //   component: Form_Tambah_Payment,
  //   allowedRoles: [4]
  // },
  // {
  //   path: '/payment-edit/:paymentId',
  //   exact: true,
  //   component: PaymentEditForm,
  //   allowedRoles: [4]
  // }
=======
    path: '/doc-edit/:documentId',
    exact: true,
    component: Update_doc,
    allowedRoles: [4]
  },
  {
    path: '/Form_Tambah_Payment',
    exact: true,
    component: Form_Tambah_Payment,
    allowedRoles: [4]
  },
  {
    path: '/payment-edit/:paymentId',
    exact: true,
    component: PaymentEditForm,
    allowedRoles: [4]
  }
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
  
];

export default adminRoutes;