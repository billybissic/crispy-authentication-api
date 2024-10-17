import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_notificationsAttributes {
  notification_id: number;
  user_id: number;
  notification_title: string;
  notification_text?: string;
  notification_time: Date;
  is_read?: number;
}

export type user_notificationsPk = "notification_id";
export type user_notificationsId = user_notifications[user_notificationsPk];
export type user_notificationsOptionalAttributes = "notification_id" | "notification_text" | "is_read";
export type user_notificationsCreationAttributes = Optional<user_notificationsAttributes, user_notificationsOptionalAttributes>;

export class user_notifications extends Model<user_notificationsAttributes, user_notificationsCreationAttributes> implements user_notificationsAttributes {
  notification_id!: number;
  user_id!: number;
  notification_title!: string;
  notification_text?: string;
  notification_time!: Date;
  is_read?: number;

  // user_notifications belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_notifications {
    return user_notifications.init({
    notification_id: {
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
    notification_title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    notification_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notification_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user_notifications',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notification_id" },
        ]
      },
      {
        name: "user_notifications_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
