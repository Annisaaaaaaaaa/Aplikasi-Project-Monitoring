import AdminDashboard from '../component/Admin/AdminDashboard';
import UserList from '../component/Administrator/USerList';
import AddUser from '../component/Administrator/AddUsser';
import ClientPage from '../views/Client/ClientPage'
import Client_admin from '../views/Admin/Client_admin';
import Project_admin from '../views/Admin/Project_admin';
import Document_admin from '../views/Admin/Document_admin';
import Users_admin from '../views/Admin/Users_admin';
import Invoice_admin from '../views/Admin/Invoice_admin';
import Payment_admin from '../views/Admin/Payment_admin';
import Form_Tambah_Client from '../views/Admin/Tambah_Form_Client';
import Form_Edit_Client from '../views/Admin/Edit_Form_Client';
import Form_Tambah_Project from '../views/Admin/Tambah_Form_Project';
import InvoiceEditForm from '../views/Admin/Edit_Form_Invoice';
import Tambah_Form_Invoice from '../views/Admin/Tambah_Form_Invoice';
import Navbar from '../component/header';
import Sidebar from '../component/sidebar';
import ProjectInitialForm from '../component/Project/ProjectInitialForm';
import EditProjectForm from '../component/Project/ProjectEngineerForm';
import EditProjectInform from '../component/Project/ProjectInformForm';
import EditProjectDetail from '../component/Project/ProjectDetailForm';
import EditProjectStepper from '../views/Admin/Edit_Form_Project';

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
    allowedRoles: [4] 
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
    allowedRoles: [4]
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
    path: '/client-edit/:clientId',
    exact: true,
    component: Form_Edit_Client,
    allowedRoles: [4] 
  },
  {
    path: '/Form_Tambah_Project',
    exact: true,
    component: Form_Tambah_Project,
    allowedRoles: [4]
  },
  {
    path: '/project/initial',
    exact: true,
    component: ProjectInitialForm,
    allowedRoles: [4]
  },
  {
    path: '/project-edit/:projectId',
    exact: true,
    component: EditProjectStepper,
    allowedRoles: [4] 
  },
  {
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
  {
    exact: true,
    component: Navbar,
    allowedRoles: [4]
  },
  {
    exact: true,
    component: Sidebar,
    allowedRoles: [4]
  },
];

export default adminRoutes;
