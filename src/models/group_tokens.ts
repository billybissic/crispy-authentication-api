import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { groups, groupsId } from './groups';

export interface group_tokensAttributes {
  token_id: number;
  group_id: number;
  token_string: string;
  expiration_time: Date;
  is_valid?: number;
}

export type group_tokensPk = "token_id";
export type group_tokensId = group_tokens[group_tokensPk];
export type group_tokensOptionalAttributes = "token_id" | "is_valid";
export type group_tokensCreationAttributes = Optional<group_tokensAttributes, group_tokensOptionalAttributes>;

export class group_tokens extends Model<group_tokensAttributes, group_tokensCreationAttributes> implements group_tokensAttributes {
  token_id!: number;
  group_id!: number;
  token_string!: string;
  expiration_time!: Date;
  is_valid?: number;

  // group_tokens belongsTo groups via group_id
  group!: groups;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<groups>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<groups, groupsId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<groups>;

  static initModel(sequelize: Sequelize.Sequelize): typeof group_tokens {
    return group_tokens.init({
    token_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'group_id'
      }
    },
    token_string: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expiration_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'group_tokens',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token_id" },
        ]
      },
      {
        name: "group_tokens_groups_group_id_fk",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
  }
}
