// routes/administratorRoute.js

import AdministratorDashboard from '../component/Administrator/AdministratorDashboard';
import UserList from '../component/Administrator/USerList';

const administratorRoutes = [
  {
    path: '/administrator/dashboard', //url
    exact: true, //true aja semuanya
    component: AdministratorDashboard, //Semuanya, mulai dari nav, table, dll
    allowedRoles: [3], //Role yang boleh akses
  }
 
];

export default administratorRoutes;



