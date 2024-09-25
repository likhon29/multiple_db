import { Router } from "express";
import { CompanyRoutes } from "../modules/global/company";

const router = Router();

const moduleRoutes: any[] = [
    {
        path: "/company",
        route: CompanyRoutes,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;