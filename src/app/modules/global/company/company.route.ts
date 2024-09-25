import express from 'express';
import { CompanyController } from './company.controller';
import { companyDbMiddleware } from '../../../middlewares/companyDbMiddleware';


const router = express.Router();


router.use(companyDbMiddleware);


router.get('/list', CompanyController.getAllCompanies);

router.get('/:id', CompanyController.getSingleCompany);

router.post('/create', CompanyController.createCompany);

router.put('/:id', (req, res) => {
    res.send('Company Route');
}
);

router.delete('/:id', (req, res) => {
    res.send('Company Route');
}
);


export const CompanyRoutes = router;