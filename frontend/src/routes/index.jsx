// routes/index.js
import adminRoutes from './adminRoute';
import salesRoutes from './salesRoute';
import pmRoutes from './pmRoute';
import engineerRoutes from './engineerRoute';
import administratorRoutes from './administratorRoute';

const routes = [
  ...adminRoutes,
  ...salesRoutes,
  ...pmRoutes,
  ...engineerRoutes,
  ...administratorRoutes,
 
];

export default routes;
