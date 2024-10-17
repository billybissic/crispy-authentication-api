import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { access_levels, access_levelsId } from './access_levels';
import type { groups, groupsId } from './groups';

export interface group_access_levelsAttributes {
  group_id: number;
  level_id: number;
}

export type group_access_levelsPk = "group_id" | "level_id";
export type group_access_levelsId = group_access_levels[group_access_levelsPk];
export type group_access_levelsCreationAttributes = group_access_levelsAttributes;

export class group_access_levels extends Model<group_access_levelsAttributes, group_access_levelsCreationAttributes> implements group_access_levelsAttributes {
  group_id!: number;
  level_id!: number;

  // group_access_levels belongsTo access_levels via level_id
  level!: access_levels;
  getLevel!: Sequelize.BelongsToGetAssociationMixin<access_levels>;
  setLevel!: Sequelize.BelongsToSetAssociationMixin<access_levels, access_levelsId>;
  createLevel!: Sequelize.BelongsToCreateAssociationMixin<access_levels>;
  // group_access_levels belongsTo groups via group_id
  group!: groups;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<groups>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<groups, groupsId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<groups>;

  static initModel(sequelize: Sequelize.Sequelize): typeof group_access_levels {
    return group_access_levels.init({
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'groups',
        key: 'group_id'
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
    tableName: 'group_access_levels',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_id" },
          { name: "level_id" },
        ]
      },
      {
        name: "group_access_levels_groups_group_id_fk",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "group_access_levels_levels_level_id_fk",
        using: "BTREE",
        fields: [
          { name: "level_id" },
        ]
      },
    ]
  });
  }
}
