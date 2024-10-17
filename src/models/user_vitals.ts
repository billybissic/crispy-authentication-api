import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_vitalsAttributes {
  vitals_id: number;
  user_id: number;
  height?: number;
  weight?: number;
  blood_pressure?: string;
  heart_rate?: number;
  bmi?: number;
  body_fat_percentage?: number;
  muscle_mass?: number;
  bone_density?: number;
  last_checkup_date?: string;
  created_at?: Date;
}

export type user_vitalsPk = "vitals_id";
export type user_vitalsId = user_vitals[user_vitalsPk];
export type user_vitalsOptionalAttributes = "vitals_id" | "height" | "weight" | "blood_pressure" | "heart_rate" | "bmi" | "body_fat_percentage" | "muscle_mass" | "bone_density" | "last_checkup_date" | "created_at";
export type user_vitalsCreationAttributes = Optional<user_vitalsAttributes, user_vitalsOptionalAttributes>;

export class user_vitals extends Model<user_vitalsAttributes, user_vitalsCreationAttributes> implements user_vitalsAttributes {
  vitals_id!: number;
  user_id!: number;
  height?: number;
  weight?: number;
  blood_pressure?: string;
  heart_rate?: number;
  bmi?: number;
  body_fat_percentage?: number;
  muscle_mass?: number;
  bone_density?: number;
  last_checkup_date?: string;
  created_at?: Date;

  // user_vitals belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_vitals {
    return user_vitals.init({
    vitals_id: {
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
    height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    blood_pressure: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    heart_rate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bmi: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    body_fat_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    muscle_mass: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    bone_density: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    last_checkup_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_vitals',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vitals_id" },
        ]
      },
      {
        name: "user_vitals_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
