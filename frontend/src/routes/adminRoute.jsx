// routes/adminRoute.js

import AdminDashboard from '../component/Admin/AdminDashboard';

const adminRoutes = [
  {
    path: '/admin/dashboard',
    exact: true,
    component: AdminDashboard,
    allowedRoles: [4] 
  },
  {
    path: '/admin/miau',
    exact: true,
    component: AdminDashboard,
    allowedRoles: [4] 
  }
];

export default adminRoutes;
