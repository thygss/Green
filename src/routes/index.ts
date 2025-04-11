import { Router } from 'express';
import importRoutes from './import.routes';
import boletoRoutes from './boletos.routes';

const router = Router();

router.use('/import', importRoutes);
router.use(boletoRoutes);

export default router;
