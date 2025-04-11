import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/config';
import { Lote } from './Lote';

export class Boleto extends Model {}

Boleto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_sacado: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  id_lote: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  linha_digitavel: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  tableName: 'boletos',
  timestamps: false,
});

Boleto.belongsTo(Lote, {
  foreignKey: 'id_lote',
});
