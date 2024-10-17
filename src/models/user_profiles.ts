import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_profilesAttributes {
  profile_id: number;
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  profile_image_url?: string;
  created_at?: Date;
}

export type user_profilesPk = "profile_id";
export type user_profilesId = user_profiles[user_profilesPk];
export type user_profilesOptionalAttributes = "profile_id" | "phone_number" | "address" | "city" | "state" | "zip_code" | "country" | "profile_image_url" | "created_at";
export type user_profilesCreationAttributes = Optional<user_profilesAttributes, user_profilesOptionalAttributes>;

export class user_profiles extends Model<user_profilesAttributes, user_profilesCreationAttributes> implements user_profilesAttributes {
  profile_id!: number;
  user_id!: number;
  email!: string;
  first_name!: string;
  last_name!: string;
  date_of_birth!: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  profile_image_url?: string;
  created_at?: Date;

  // user_profiles belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_profiles {
    return user_profiles.init({
    profile_id: {
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
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    profile_image_url: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_profiles',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "profile_id" },
        ]
      },
      {
        name: "user_profiles_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
