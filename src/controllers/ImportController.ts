import { Request, Response } from 'express';
import { Op } from 'sequelize';
import PDFDocument from 'pdfkit';
import csv from 'csv-parser';
import fs from 'fs';
import { Boleto } from '../models/Boleto';
import { Lote } from '../models/Lote';

// 👉 Função de importar CSV (atividade 1)
export const importCSV = (req: Request, res: Response): void => {
  const filePath = req.file?.path;

  if (!filePath) {
    return res.status(400).json({ error: 'Arquivo CSV não enviado.' });
  }

  const results: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        for (const row of results) {
          const { nome, unidade, valor, linha_digitavel } = row;
          const nomeLote = String(unidade).padStart(4, '0');

          const lote = await Lote.findOne({ where: { nome: nomeLote } });
          if (!lote) continue;

          await Boleto.create({
            nome_sacado: nome,
            id_lote: lote.id,
            valor: parseFloat(valor),
            linha_digitavel,
            ativo: true,
            criado_em: new Date(),
          });
        }

        fs.unlinkSync(filePath);
        return res.status(200).json({ message: 'Boletos importados com sucesso!' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao processar boletos do CSV' });
      }
    });
};

// 👉 Função de listar e gerar PDF (atividade 4 e 5)
export const listarBoletos = async (req: Request, res: Response) => {
  try {
    const { nome, id_lote, valor_inicial, valor_final, relatorio } = req.query;

    const where: any = {};

    if (nome) {
      where.nome_sacado = { [Op.like]: `%${nome}%` };
    }

    if (id_lote) {
      where.id_lote = Number(id_lote);
    }

    if (valor_inicial || valor_final) {
      where.valor = {};
      if (valor_inicial) where.valor[Op.gte] = parseFloat(valor_inicial as string);
      if (valor_final) where.valor[Op.lte] = parseFloat(valor_final as string);
    }

    const boletos = await Boleto.findAll({ where });

    if (relatorio === '1') {
      const doc = new PDFDocument();
      const buffers: any[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        const base64 = pdfData.toString('base64');
        return res.json({ base64 });
      });

      doc.fontSize(14).text('Relatório de Boletos', { align: 'center' });
      doc.moveDown();

      doc.fontSize(10).text('ID | Nome | ID Lote | Valor | Linha Digitável');
      doc.moveDown();

      boletos.forEach((boleto) => {
        doc.fontSize(10).text(
          `${boleto.id} | ${boleto.nome_sacado} | ${boleto.id_lote} | R$${boleto.valor} | ${boleto.linha_digitavel}`
        );
      });

      doc.end();
    } else {
      return res.status(200).json(boletos);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar boletos.' });
  }
};
