import express from 'express';
import appRouter from './app';
import dashboardRouter from './dashboard';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/dashboard',
        route: dashboardRouter,
    },
    {
        path: '/app',
        route: appRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default router;
