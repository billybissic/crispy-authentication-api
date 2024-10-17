import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { access_levels, access_levelsId } from './access_levels';
import type { users, usersId } from '../old-models/users';

export interface user_access_levelsAttributes {
  user_id: number;
  level_id: number;
}

export type user_access_levelsPk = "user_id" | "level_id";
export type user_access_levelsId = user_access_levels[user_access_levelsPk];
export type user_access_levelsCreationAttributes = user_access_levelsAttributes;

export class user_access_levels extends Model<user_access_levelsAttributes, user_access_levelsCreationAttributes> implements user_access_levelsAttributes {
  user_id!: number;
  level_id!: number;

  // user_access_levels belongsTo access_levels via level_id
  level!: access_levels;
  getLevel!: Sequelize.BelongsToGetAssociationMixin<access_levels>;
  setLevel!: Sequelize.BelongsToSetAssociationMixin<access_levels, access_levelsId>;
  createLevel!: Sequelize.BelongsToCreateAssociationMixin<access_levels>;
  // user_access_levels belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_access_levels {
    return user_access_levels.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    level_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'access_levels',
        key: 'level_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_access_levels',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "level_id" },
        ]
      },
      {
        name: "user_access_levels_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_access_levels_access_levels_level_id_fk",
        using: "BTREE",
        fields: [
          { name: "level_id" },
        ]
      },
    ]
  });
  }
}
