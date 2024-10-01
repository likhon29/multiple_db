import { Router } from "express";
import { CompanyRoutes } from "../../modules/global/company/v1";
import { ReservationRoutes } from "../../modules/generic/reservation/v1";

const v1Router = Router();

const moduleRoutes: any[] = [
    {
        path: "/company",
        route: CompanyRoutes,
    },
    {
        path: '/reservation',
        route: ReservationRoutes,
    }
];

moduleRoutes.forEach((route) => v1Router.use(route.path, route.route));

export default v1Router;