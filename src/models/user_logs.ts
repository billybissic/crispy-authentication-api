import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_logsAttributes {
  log_id: number;
  user_id: number;
  log_title: string;
  log_text?: string;
  log_time: Date;
  created_at?: Date;
}

export type user_logsPk = "log_id";
export type user_logsId = user_logs[user_logsPk];
export type user_logsOptionalAttributes = "log_id" | "log_text" | "created_at";
export type user_logsCreationAttributes = Optional<user_logsAttributes, user_logsOptionalAttributes>;

export class user_logs extends Model<user_logsAttributes, user_logsCreationAttributes> implements user_logsAttributes {
  log_id!: number;
  user_id!: number;
  log_title!: string;
  log_text?: string;
  log_time!: Date;
  created_at?: Date;

  // user_logs belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_logs {
    return user_logs.init({
    log_id: {
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
    log_title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    log_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    log_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_logs',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "log_id" },
        ]
      },
      {
        name: "user_logs_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
