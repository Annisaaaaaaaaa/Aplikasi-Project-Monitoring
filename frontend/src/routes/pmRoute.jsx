// routes/pmRoute.js

import PMDashboard from '../component/PM/PMDashboard';

const pmRoutes = [
  {
    path: '/pm/dashboard',
    exact: true,
    component: PMDashboard,
    allowedRoles: [1] 
  }
];

export default pmRoutes;
