import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface user_tokensAttributes {
  token_id: number;
  user_id: number;
  token_string: string;
  expiration_time: Date;
  is_valid?: number;
}

export type user_tokensPk = "token_id";
export type user_tokensId = user_tokens[user_tokensPk];
export type user_tokensOptionalAttributes = "token_id" | "is_valid";
export type user_tokensCreationAttributes = Optional<user_tokensAttributes, user_tokensOptionalAttributes>;

export class user_tokens extends Model<user_tokensAttributes, user_tokensCreationAttributes> implements user_tokensAttributes {
  token_id!: number;
  user_id!: number;
  token_string!: string;
  expiration_time!: Date;
  is_valid?: number;

  // user_tokens belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_tokens {
    return user_tokens.init({
    token_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
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
    tableName: 'user_tokens',
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
        name: "user_tokens_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
