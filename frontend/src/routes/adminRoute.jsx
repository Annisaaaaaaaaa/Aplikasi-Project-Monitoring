// routes/adminRoute.js

import AdminDashboard from '../component/Admin/AdminDashboard';
import UserList from '../component/Administrator/USerList';
import AddUser from '../component/Administrator/AddUsser';
import ClientPage from '../views/Client/ClientPage'

const adminRoutes = [
  {
    path: '/admin/dashboard',
    exact: true,
    component: AdminDashboard,
    allowedRoles: [4] 
  },
  {
    path: '/admin/user',
    exact: true,
    component: UserList,
    allowedRoles: [4]
  },
  {
    path: '/admin/user/tambah',
    exact: true,
    component: AddUser,
    allowedRoles: [4]
  },
  {
    path: '/admin/client',
    exact: true,
    component: ClientPage,
    allowedRoles: [4]
  },
];

export default adminRoutes;
