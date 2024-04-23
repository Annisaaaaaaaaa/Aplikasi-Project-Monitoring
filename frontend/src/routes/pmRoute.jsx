// routes/pmRoute.js

import PMDashboard from '../component/PM/PMDashboard';
import header from '../component/header';
import sidebar from '../component/sidebar';

const pmRoutes = [
  {
    path: '/pm/dashboard',
    exact: true,
    component: PMDashboard,
    allowedRoles: [1, 2, 3, 4, 5] 
  }
];

export default pmRoutes;
