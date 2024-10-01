import { Router } from 'express';

const versionedRoutes = [
    { version: 'v1', router: require('./v1').default },
    { version: 'v2', router: require('./v2').default },
];

const router = Router();

versionedRoutes.forEach(({ version, router: route }) => {
    router.use(`/${version}`, route);
});

export default router;