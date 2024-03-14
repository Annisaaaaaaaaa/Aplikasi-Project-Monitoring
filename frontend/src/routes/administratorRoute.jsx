// routes/administratorRoute.js

import AdministratorDashboard from '../component/Administrator/AdministratorDashboard';
import UserList from '../component/Administrator/USerList';

const administratorRoutes = [
  {
    path: '/administrator/dashboard',
    exact: true,
    component: AdministratorDashboard,
    allowedRoles: [3]
  }
 
];

export default administratorRoutes;



