import express from 'express';
import { getTipsController } from '../controller/tipsController';

const router = express.Router();

// Ruta para obtener el libro por símbolo
router.get('/book', getTipsController);

export default router;
