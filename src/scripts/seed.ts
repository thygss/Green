import { sequelize } from '../database/config';
import { Lote } from '../models/Lote';
import { Boleto } from '../models/Boleto';

async function seed() {
  try {
    await sequelize.sync({ alter: true });

    // Criar Lotes
    const lotes = await Promise.all([
      Lote.findOrCreate({ where: { nome: '0017' }, defaults: { nome: '0017', ativo: true } }),
      Lote.findOrCreate({ where: { nome: '0018' }, defaults: { nome: '0018', ativo: true } }),
      Lote.findOrCreate({ where: { nome: '0019' }, defaults: { nome: '0019', ativo: true } }),
    ]);

    // Criar Boletos
    await Boleto.create({
      nome_sacado: 'JOSE DA SILVA',
      id_lote: lotes[0][0].id,
      valor: 182.54,
      linha_digitavel: '123456123456123456',
      ativo: true,
      criado_em: new Date(),
    });

    await Boleto.create({
      nome_sacado: 'MARCOS ROBERTO',
      id_lote: lotes[1][0].id,
      valor: 178.2,
      linha_digitavel: '123456123456123456',
      ativo: true,
      criado_em: new Date(),
    });

    await Boleto.create({
      nome_sacado: 'MARCIA CARVALHO',
      id_lote: lotes[2][0].id,
      valor: 128.0,
      linha_digitavel: '123456123456123456',
      ativo: true,
      criado_em: new Date(),
    });

    console.log('Seed executado com sucesso!');
    process.exit();
  } catch (err) {
    console.error('Erro ao rodar seed:', err);
    process.exit(1);
  }
}

seed();
