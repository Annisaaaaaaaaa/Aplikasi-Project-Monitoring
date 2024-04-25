// routes/pmRoute.js

import SalesDashboard from '../component/Sales/SalesDashboard';
import Project_admin from '../views/Admin/Project_admin';
import Form_Tambah_Project from '../views/Admin/Tambah_Form_Project';
import ProjectInitialForm from '../component/Project/ProjectInitialForm';
import EditProjectStepper from '../views/Admin/Edit_Form_Project';
import ProjectDetailPage from '../component/Project/HalamanDetail';

const salesRoutes = [
  {
    path: '/sales/dashboard',
    exact: true,
    component: SalesDashboard,
    allowedRoles: [2] 
  },
  {
    path: '/project-admin',
    exact: true,
    component: Project_admin,
    allowedRoles: [2]
  },
  {
    path: '/Form_Tambah_Project',
    exact: true,
    component: Form_Tambah_Project,
    allowedRoles: [2]
  },
  {
    path: '/project/initial',
    exact: true,
    component: ProjectInitialForm,
    allowedRoles: [2]
  },
  {
    path: '/project-edit/:projectId',
    exact: true,
    component: EditProjectStepper,
    allowedRoles: [2] 
  },
  {
    path: '/project-detail/:projectId',
    exact: true,
    component: ProjectDetailPage,
    allowedRoles: [2] 
  },
];

export default salesRoutes;
