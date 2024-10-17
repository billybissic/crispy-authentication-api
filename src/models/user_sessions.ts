import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_sessionsAttributes {
  session_id: number;
  user_id: number;
  token: string;
  expiration_time: Date;
  is_valid: number;
  date_added: Date;
  last_updated: Date;
}

export type user_sessionsPk = "session_id";
export type user_sessionsId = user_sessions[user_sessionsPk];
export type user_sessionsOptionalAttributes = "session_id" | "is_valid";
export type user_sessionsCreationAttributes = Optional<user_sessionsAttributes, user_sessionsOptionalAttributes>;

export class user_sessions extends Model<user_sessionsAttributes, user_sessionsCreationAttributes> implements user_sessionsAttributes {
  session_id!: number;
  user_id!: number;
  token!: string;
  expiration_time!: Date;
  is_valid!: number;
  date_added!: Date;
  last_updated!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_sessions {
    return user_sessions.init({
    session_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expiration_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    date_added: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_sessions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "session_id" },
        ]
      },
      {
        name: "user_sessions_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
