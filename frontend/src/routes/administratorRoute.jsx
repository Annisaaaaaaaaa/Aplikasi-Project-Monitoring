// routes/administratorRoute.js

import AdministratorDashboard from '../component/Administrator/AdministratorDashboard';
import UserList from '../component/Administrator/USerList';
import UserAdd from '../component/Administrator/AddUser';
import UserEdit from '../component/Administrator/EditUser';
import UserImportExcel from '../component/Administrator/ImportUserExcel';
import ProjectForm from '../component/Project/TambahFormProject';
import ProjectInitials from '../component/Project/ProjectInitialForm';
import ProjectInform from '../component/Project/Inform';
import ProjectDetail from '../component/Project/Detail';
import ProjectEngineer from '../component/Project/Engineer';
import Project from '../component/Project/Project';

const administratorRoutes = [
  {
    path: '/administrator/dashboard', //url
    exact: true, //true aja semuanya
    component: AdministratorDashboard, //Semuanya, mulai dari nav, table, dll
    allowedRoles: [3], //Role yang boleh akses
  },
  {
    path: '/administrator/user', //url
    exact: true, //true aja semuanya
    component: UserList, //Semuanya, mulai dari nav, table, dll
    allowedRoles: [1,2,3,4,5], //Role yang boleh akses
  },
  {
    path: '/administrator/user/add', //url
    exact: true, //true aja semuanya
    component: UserAdd, //Semuanya, mulai dari nav, table, dll
    allowedRoles: [1,2,3,4,5], //Role yang boleh akses
  },
  {
    path: '/administrator/user/edit/:id', 
    exact: true,
    component: UserEdit,
    allowedRoles: [1,2,3,4,5], //Role yang boleh akses
  },
  {
    path: '/administrator/user/search',
    exact: true,
    component: UserList,
    allowedRoles: [1,2,3,4,5], //Role yang boleh akses
  },
  {
    path: '/administrator/user/import/excel',
    exact: true,
    component: UserImportExcel,
    allowedRoles: [1,2,3,4,5], 
  },

  {
    path: '/administrator/project',
    exact: true,
    component: ProjectForm,
    allowedRoles: [1,2,3,4,5], 
  },
  {
    path: '/administrator/project/initial',
    exact: true,
    component: ProjectInitials,
    allowedRoles: [1,2,3,4,5], 
  },
  {
    path: '/administrator/project/detail',
    exact: true,
    component: ProjectDetail,
    allowedRoles: [1,2,3,4,5], 
  },
  {
    path: '/administrator/project/informasi',
    exact: true,
    component: ProjectInform,
    allowedRoles: [1,2,3,4,5], 
  },
  {
    path: '/administrator/project/engineer',
    exact: true,
    component: ProjectEngineer,
    allowedRoles: [1,2,3,4,5], 
  },
  {
    path: '/administrator/project/edit/',
    exact: true,
    component: Project,
    allowedRoles: [1,2,3,4,5], 
  },
  {
    path: '/administrator/project/edit/:id',
    exact: true,
    component: ProjectEngineer,
    allowedRoles: [1,2,3,4,5], 
  },
  
 
];

export default administratorRoutes;



