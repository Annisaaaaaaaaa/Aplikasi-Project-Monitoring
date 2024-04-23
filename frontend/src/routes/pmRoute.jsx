// routes/pmRoute.js

import PMDashboard from '../component/PM/PMDashboard';
import header from '../component/header';
import sidebar from '../component/sidebar';

const pmRoutes = [
  {
    path: '/pm/dashboard',
    exact: true,
    component: PMDashboard, header, sidebar,
    allowedRoles: [1] 
  }
];

export default pmRoutes;