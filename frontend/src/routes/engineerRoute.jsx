// routes/engineerRoute.js

import EngineerDashboard from '../component/Engineer/EngineerDashboard';

const engineerRoutes = [
  {
    path: '/engineer/dashboard',
    exact: true,
    component: EngineerDashboard,
    allowedRoles: [5]
  }
];

export default engineerRoutes;
