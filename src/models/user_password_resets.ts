import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_password_resetsAttributes {
  reset_id: number;
  user_id: number;
  reset_token: string;
  expiration_time: Date;
  is_valid?: number;
}

export type user_password_resetsPk = "reset_id";
export type user_password_resetsId = user_password_resets[user_password_resetsPk];
export type user_password_resetsOptionalAttributes = "reset_id" | "is_valid";
export type user_password_resetsCreationAttributes = Optional<user_password_resetsAttributes, user_password_resetsOptionalAttributes>;

export class user_password_resets extends Model<user_password_resetsAttributes, user_password_resetsCreationAttributes> implements user_password_resetsAttributes {
  reset_id!: number;
  user_id!: number;
  reset_token!: string;
  expiration_time!: Date;
  is_valid?: number;

  // user_password_resets belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_password_resets {
    return user_password_resets.init({
    reset_id: {
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
    reset_token: {
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
    tableName: 'user_password_resets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reset_id" },
        ]
      },
      {
        name: "user_password_resets_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
