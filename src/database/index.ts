import { sequelize } from './config';
import { Boleto } from '../models/Boleto';
import { Lote } from '../models/Lote';

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Banco conectado com sucesso!');

    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
  }
}
