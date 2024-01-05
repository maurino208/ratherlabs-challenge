import express from 'express';
import bookRouter from './routes/bookRouter';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use('/api', bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});