import express from 'express';
import bookRouter from './routes/bookRouter';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use('/api', bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
