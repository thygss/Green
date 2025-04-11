import { Router } from 'express';
import multer from 'multer';
import { importCSV } from '../controllers/ImportController';

const router = Router();
const upload = multer({ dest: 'uploads/csv/' });

router.post('/csv', upload.single('file'), importCSV);

export default router;
