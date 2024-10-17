import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_social_media_profilesAttributes {
  social_media_id: number;
  user_id: number;
  social_media_username?: string;
}

export type user_social_media_profilesPk = "social_media_id";
export type user_social_media_profilesId = user_social_media_profiles[user_social_media_profilesPk];
export type user_social_media_profilesOptionalAttributes = "social_media_id" | "social_media_username";
export type user_social_media_profilesCreationAttributes = Optional<user_social_media_profilesAttributes, user_social_media_profilesOptionalAttributes>;

export class user_social_media_profiles extends Model<user_social_media_profilesAttributes, user_social_media_profilesCreationAttributes> implements user_social_media_profilesAttributes {
  social_media_id!: number;
  user_id!: number;
  social_media_username?: string;

  // user_social_media_profiles belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_social_media_profiles {
    return user_social_media_profiles.init({
    social_media_id: {
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
    social_media_username: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_social_media_profiles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "social_media_id" },
        ]
      },
      {
        name: "social_media_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
