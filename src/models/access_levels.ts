import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { group_access_levels, group_access_levelsId } from './group_access_levels';
import type { groups, groupsId } from './groups';
import type { user_access_levels, user_access_levelsId } from './user_access_levels';
import type { user_group_access_levels, user_group_access_levelsId } from './user_group_access_levels';
import type { users, usersId } from '../old-models/users';

export interface access_levelsAttributes {
  level_id: number;
  level_name: string;
  description?: string;
}

export type access_levelsPk = "level_id";
export type access_levelsId = access_levels[access_levelsPk];
export type access_levelsOptionalAttributes = "level_id" | "description";
export type access_levelsCreationAttributes = Optional<access_levelsAttributes, access_levelsOptionalAttributes>;

export class access_levels extends Model<access_levelsAttributes, access_levelsCreationAttributes> implements access_levelsAttributes {
  level_id!: number;
  level_name!: string;
  description?: string;

  // access_levels hasMany group_access_levels via level_id
  group_access_levels!: group_access_levels[];
  getGroup_access_levels!: Sequelize.HasManyGetAssociationsMixin<group_access_levels>;
  setGroup_access_levels!: Sequelize.HasManySetAssociationsMixin<group_access_levels, group_access_levelsId>;
  addGroup_access_level!: Sequelize.HasManyAddAssociationMixin<group_access_levels, group_access_levelsId>;
  addGroup_access_levels!: Sequelize.HasManyAddAssociationsMixin<group_access_levels, group_access_levelsId>;
  createGroup_access_level!: Sequelize.HasManyCreateAssociationMixin<group_access_levels>;
  removeGroup_access_level!: Sequelize.HasManyRemoveAssociationMixin<group_access_levels, group_access_levelsId>;
  removeGroup_access_levels!: Sequelize.HasManyRemoveAssociationsMixin<group_access_levels, group_access_levelsId>;
  hasGroup_access_level!: Sequelize.HasManyHasAssociationMixin<group_access_levels, group_access_levelsId>;
  hasGroup_access_levels!: Sequelize.HasManyHasAssociationsMixin<group_access_levels, group_access_levelsId>;
  countGroup_access_levels!: Sequelize.HasManyCountAssociationsMixin;
  // access_levels belongsToMany groups via level_id and group_id
  group_id_groups!: groups[];
  getGroup_id_groups!: Sequelize.BelongsToManyGetAssociationsMixin<groups>;
  setGroup_id_groups!: Sequelize.BelongsToManySetAssociationsMixin<groups, groupsId>;
  addGroup_id_group!: Sequelize.BelongsToManyAddAssociationMixin<groups, groupsId>;
  addGroup_id_groups!: Sequelize.BelongsToManyAddAssociationsMixin<groups, groupsId>;
  createGroup_id_group!: Sequelize.BelongsToManyCreateAssociationMixin<groups>;
  removeGroup_id_group!: Sequelize.BelongsToManyRemoveAssociationMixin<groups, groupsId>;
  removeGroup_id_groups!: Sequelize.BelongsToManyRemoveAssociationsMixin<groups, groupsId>;
  hasGroup_id_group!: Sequelize.BelongsToManyHasAssociationMixin<groups, groupsId>;
  hasGroup_id_groups!: Sequelize.BelongsToManyHasAssociationsMixin<groups, groupsId>;
  countGroup_id_groups!: Sequelize.BelongsToManyCountAssociationsMixin;
  // access_levels hasMany user_access_levels via level_id
  user_access_levels!: user_access_levels[];
  getUser_access_levels!: Sequelize.HasManyGetAssociationsMixin<user_access_levels>;
  setUser_access_levels!: Sequelize.HasManySetAssociationsMixin<user_access_levels, user_access_levelsId>;
  addUser_access_level!: Sequelize.HasManyAddAssociationMixin<user_access_levels, user_access_levelsId>;
  addUser_access_levels!: Sequelize.HasManyAddAssociationsMixin<user_access_levels, user_access_levelsId>;
  createUser_access_level!: Sequelize.HasManyCreateAssociationMixin<user_access_levels>;
  removeUser_access_level!: Sequelize.HasManyRemoveAssociationMixin<user_access_levels, user_access_levelsId>;
  removeUser_access_levels!: Sequelize.HasManyRemoveAssociationsMixin<user_access_levels, user_access_levelsId>;
  hasUser_access_level!: Sequelize.HasManyHasAssociationMixin<user_access_levels, user_access_levelsId>;
  hasUser_access_levels!: Sequelize.HasManyHasAssociationsMixin<user_access_levels, user_access_levelsId>;
  countUser_access_levels!: Sequelize.HasManyCountAssociationsMixin;
  // access_levels hasMany user_group_access_levels via level_id
  user_group_access_levels!: user_group_access_levels[];
  getUser_group_access_levels!: Sequelize.HasManyGetAssociationsMixin<user_group_access_levels>;
  setUser_group_access_levels!: Sequelize.HasManySetAssociationsMixin<user_group_access_levels, user_group_access_levelsId>;
  addUser_group_access_level!: Sequelize.HasManyAddAssociationMixin<user_group_access_levels, user_group_access_levelsId>;
  addUser_group_access_levels!: Sequelize.HasManyAddAssociationsMixin<user_group_access_levels, user_group_access_levelsId>;
  createUser_group_access_level!: Sequelize.HasManyCreateAssociationMixin<user_group_access_levels>;
  removeUser_group_access_level!: Sequelize.HasManyRemoveAssociationMixin<user_group_access_levels, user_group_access_levelsId>;
  removeUser_group_access_levels!: Sequelize.HasManyRemoveAssociationsMixin<user_group_access_levels, user_group_access_levelsId>;
  hasUser_group_access_level!: Sequelize.HasManyHasAssociationMixin<user_group_access_levels, user_group_access_levelsId>;
  hasUser_group_access_levels!: Sequelize.HasManyHasAssociationsMixin<user_group_access_levels, user_group_access_levelsId>;
  countUser_group_access_levels!: Sequelize.HasManyCountAssociationsMixin;
  // access_levels belongsToMany users via level_id and user_id
  user_id_users!: users[];
  getUser_id_users!: Sequelize.BelongsToManyGetAssociationsMixin<users>;
  setUser_id_users!: Sequelize.BelongsToManySetAssociationsMixin<users, usersId>;
  addUser_id_user!: Sequelize.BelongsToManyAddAssociationMixin<users, usersId>;
  addUser_id_users!: Sequelize.BelongsToManyAddAssociationsMixin<users, usersId>;
  createUser_id_user!: Sequelize.BelongsToManyCreateAssociationMixin<users>;
  removeUser_id_user!: Sequelize.BelongsToManyRemoveAssociationMixin<users, usersId>;
  removeUser_id_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<users, usersId>;
  hasUser_id_user!: Sequelize.BelongsToManyHasAssociationMixin<users, usersId>;
  hasUser_id_users!: Sequelize.BelongsToManyHasAssociationsMixin<users, usersId>;
  countUser_id_users!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof access_levels {
    return access_levels.init({
    level_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    level_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'access_levels',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "level_id" },
        ]
      },
    ]
  });
  }
}
