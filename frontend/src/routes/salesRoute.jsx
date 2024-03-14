// routes/pmRoute.js

import SalesDashboard from '../component/Sales/SalesDashboard';

const salesRoutes = [
  {
    path: '/sales/dashboard',
    exact: true,
    component: SalesDashboard,
    allowedRoles: [2] 
  }
];

export default salesRoutes;
