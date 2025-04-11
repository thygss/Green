import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/config';

interface LoteAttributes {
  id: number;
  nome: string;
  ativo?: boolean;
  criado_em?: Date;
}

interface LoteCreationAttributes extends Optional<LoteAttributes, 'id'> {}

export class Lote extends Model<LoteAttributes, LoteCreationAttributes>
  implements LoteAttributes {
  public id!: number;
  public nome!: string;
  public ativo!: boolean;
  public criado_em!: Date;
}

Lote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'lotes',
    timestamps: false,
  }
);
