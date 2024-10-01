import { Router } from "express";
import { CompanyRoutes } from "../../modules/global/company/v2";

const v2Router = Router();

const v2Routes: any[] = [
    {
        path: "/company",
        route: CompanyRoutes,
    }
];

v2Routes.forEach((route) => v2Router.use(route.path, route.route));

export default v2Router;