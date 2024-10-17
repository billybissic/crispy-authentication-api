import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_settingsAttributes {
  user_id: number;
  notification_sound_enabled?: number;
  email_notification_enabled?: number;
  sms_notification_enabled?: number;
}

export type user_settingsPk = "user_id";
export type user_settingsId = user_settings[user_settingsPk];
export type user_settingsOptionalAttributes = "user_id" | "notification_sound_enabled" | "email_notification_enabled" | "sms_notification_enabled";
export type user_settingsCreationAttributes = Optional<user_settingsAttributes, user_settingsOptionalAttributes>;

export class user_settings extends Model<user_settingsAttributes, user_settingsCreationAttributes> implements user_settingsAttributes {
  user_id!: number;
  notification_sound_enabled?: number;
  email_notification_enabled?: number;
  sms_notification_enabled?: number;

  // user_settings belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_settings {
    return user_settings.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    notification_sound_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    email_notification_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    sms_notification_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'user_settings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_settings_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
