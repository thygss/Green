import { Router } from 'express';
import { listarBoletos } from '../controllers/ImportController';

const router = Router();

router.get('/boletos', listarBoletos);

export default router;
