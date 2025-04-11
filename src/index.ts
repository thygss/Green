import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './database';
import routes from './routes'; // <- importa as rotas

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

connectDatabase();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
