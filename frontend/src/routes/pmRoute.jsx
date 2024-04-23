// routes/pmRoute.js

import PMDashboard from '../component/PM/PMDashboard';
<<<<<<< HEAD
import AktivitiesProjectList from '../component/PM/ActivityList'
import AddAktivitiesProject from '../component/PM/AddActivity'
import EditAktivitiesProject from '../component/PM/EditActivity'
=======
import header from '../component/header';
import sidebar from '../component/sidebar';
>>>>>>> fafb99055096343141f8c333118656595f67a770

const pmRoutes = [
  {
    path: '/pm/dashboard',
    exact: true,
    component: PMDashboard, header, sidebar,
    allowedRoles: [1] 
  },
  {
    path: '/pm/dashboard/aktivitas',
    exact: true,
    component: AktivitiesProjectList,
    allowedRoles: [1,3] 
  },
  {
    path: '/pm/aktivitas/tambah',
    exact: true,
    component: AddAktivitiesProject,
    allowedRoles: [1,3] 
  },
  {
    path: '/pm/aktivitas/edit/:id', 
    exact: true,
    component: EditAktivitiesProject,
    allowedRoles: [1,2,3,4,5], //Role yang boleh akses
  },
];

export default pmRoutes;