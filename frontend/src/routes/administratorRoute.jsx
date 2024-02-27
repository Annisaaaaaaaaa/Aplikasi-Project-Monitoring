// routes/administratorRoute.js

import AdministratorDashboard from '../component/Administrator/AdministratorDashboard';

const administratorRoutes = [
  {
    path: '/administrator/dashboard',
    exact: true,
    component: AdministratorDashboard,
    allowedRoles: [3]
  },
  {
    path: '/administrator/user',
    exact: true,
    component: AdministratorDashboard,
    allowedRoles: [3]
  },
  {
    path: '/administrator/user/tambah',
    exact: true,
    component: AdministratorDashboard,
    allowedRoles: [3]
  },
 
];

export default administratorRoutes;



