import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_devicesAttributes {
  device_id: number;
  user_id: number;
  device_name?: string;
  device_mac_address?: string;
  device_ip_address?: string;
  last_used?: Date;
}

export type user_devicesPk = "device_id";
export type user_devicesId = user_devices[user_devicesPk];
export type user_devicesOptionalAttributes = "device_id" | "device_name" | "device_mac_address" | "device_ip_address" | "last_used";
export type user_devicesCreationAttributes = Optional<user_devicesAttributes, user_devicesOptionalAttributes>;

export class user_devices extends Model<user_devicesAttributes, user_devicesCreationAttributes> implements user_devicesAttributes {
  device_id!: number;
  user_id!: number;
  device_name?: string;
  device_mac_address?: string;
  device_ip_address?: string;
  last_used?: Date;

  // user_devices belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_devices {
    return user_devices.init({
    device_id: {
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
    device_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    device_mac_address: {
      type: DataTypes.STRING(17),
      allowNull: true
    },
    device_ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    last_used: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_devices',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "device_id" },
        ]
      },
      {
        name: "user_device_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
