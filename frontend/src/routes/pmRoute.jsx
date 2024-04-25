// routes/pmRoute.js

import PMDashboard from '../component/PM/PMDashboard';
import AktivitiesProjectList from '../component/PM/ActivityList'
import AddAktivitiesProject from '../component/PM/AddActivity'
import EditAktivitiesProject from '../component/PM/EditActivity'
import Project_admin from '../views/Admin/Project_admin';
import Form_Tambah_Project from '../views/Admin/Tambah_Form_Project';
import ProjectInitialForm from '../component/Project/ProjectInitialForm';
import EditProjectStepper from '../views/Admin/Edit_Form_Project';
import ProjectDetailPage from '../component/Project/HalamanDetail';

const pmRoutes = [
  {
    path: '/pm/dashboard',
    exact: true,
    component: PMDashboard, 
    allowedRoles: [1] 
  },
  {
    path: '/pm/dashboard/aktivitas',
    exact: true,
    component: AktivitiesProjectList,
    allowedRoles: [1,3] 
  },
  {
    path: '/pm/aktivitas/tambah',
    exact: true,
    component: AddAktivitiesProject,
    allowedRoles: [1,3] 
  },
  {
    path: '/pm/aktivitas/edit/:id', 
    exact: true,
    component: EditAktivitiesProject,
    allowedRoles: [1,2,3,4,5], //Role yang boleh akses
  },
  {
    path: '/project-admin',
    exact: true,
    component: Project_admin,
    allowedRoles: [1]
  },
  {
    path: '/Form_Tambah_Project',
    exact: true,
    component: Form_Tambah_Project,
    allowedRoles: [1]
  },
  {
    path: '/project/initial',
    exact: true,
    component: ProjectInitialForm,
    allowedRoles: [1]
  },
  {
    path: '/project-edit/:projectId',
    exact: true,
    component: EditProjectStepper,
    allowedRoles: [1] 
  },
  {
    path: '/project-detail/:projectId',
    exact: true,
    component: ProjectDetailPage,
    allowedRoles: [1] 
  },
];

export default pmRoutes;