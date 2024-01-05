import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from 'express';

import bookRouter from './routes/bookRouter';
import logger from "./utils/logger";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use('/api', bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor escuchando en el puerto ${PORT}`);
});
