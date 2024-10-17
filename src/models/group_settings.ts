import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { groups, groupsId } from './groups';

export interface group_settingsAttributes {
  group_settings_id: number;
  group_id: number;
  notification_sound_enabled?: number;
  email_notification_enabled?: number;
  sms_notification_enabled?: number;
}

export type group_settingsPk = "group_settings_id";
export type group_settingsId = group_settings[group_settingsPk];
export type group_settingsOptionalAttributes = "notification_sound_enabled" | "email_notification_enabled" | "sms_notification_enabled";
export type group_settingsCreationAttributes = Optional<group_settingsAttributes, group_settingsOptionalAttributes>;

export class group_settings extends Model<group_settingsAttributes, group_settingsCreationAttributes> implements group_settingsAttributes {
  group_settings_id!: number;
  group_id!: number;
  notification_sound_enabled?: number;
  email_notification_enabled?: number;
  sms_notification_enabled?: number;

  // group_settings belongsTo groups via group_id
  group!: groups;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<groups>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<groups, groupsId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<groups>;

  static initModel(sequelize: Sequelize.Sequelize): typeof group_settings {
    return group_settings.init({
    group_settings_id: {
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
    tableName: 'group_settings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_settings_id" },
        ]
      },
      {
        name: "group_settings_groups_group_id_fk",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
  }
}
