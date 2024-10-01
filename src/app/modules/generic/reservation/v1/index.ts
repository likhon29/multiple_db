import express from 'express';
import { companyDbMiddleware } from '../../../../middlewares/companyDbMiddleware';


const router = express.Router();


router.use(companyDbMiddleware);

router.get('/list', (req, res) => {
    res.send('Reservation Route');
}
);



export const ReservationRoutes = router;