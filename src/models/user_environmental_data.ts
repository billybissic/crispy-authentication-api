import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_environmental_dataAttributes {
  environmental_data_id: number;
  user_id: number;
  temperature?: number;
  humidity?: number;
  air_quality?: number;
  noise_level?: number;
  location?: string;
  measurement_time?: Date;
  created_at?: Date;
}

export type user_environmental_dataPk = "environmental_data_id";
export type user_environmental_dataId = user_environmental_data[user_environmental_dataPk];
export type user_environmental_dataOptionalAttributes = "environmental_data_id" | "temperature" | "humidity" | "air_quality" | "noise_level" | "location" | "measurement_time" | "created_at";
export type user_environmental_dataCreationAttributes = Optional<user_environmental_dataAttributes, user_environmental_dataOptionalAttributes>;

export class user_environmental_data extends Model<user_environmental_dataAttributes, user_environmental_dataCreationAttributes> implements user_environmental_dataAttributes {
  environmental_data_id!: number;
  user_id!: number;
  temperature?: number;
  humidity?: number;
  air_quality?: number;
  noise_level?: number;
  location?: string;
  measurement_time?: Date;
  created_at?: Date;

  // user_environmental_data belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_environmental_data {
    return user_environmental_data.init({
    environmental_data_id: {
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
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    air_quality: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    noise_level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    measurement_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_environmental_data',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "environmental_data_id" },
        ]
      },
      {
        name: "user_environmental_data_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
