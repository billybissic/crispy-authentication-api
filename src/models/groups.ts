import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface groupsAttributes {
  group_id: number;
  group_name: string;
  description?: string;
  owner_id: number;
}

export type groupsPk = "group_id";
export type groupsId = groups[groupsPk];
export type groupsOptionalAttributes = "group_id" | "description" ;
export type groupsCreationAttributes = Optional<groupsAttributes, groupsOptionalAttributes>;

export class groups extends Model<groupsAttributes, groupsCreationAttributes> implements groupsAttributes {
  group_id!: number;
  group_name!: string;
  description?: string;
  owner_id!: number;

  // groups belongsTo users via owner_id
  owner!: users;
  getOwner!: Sequelize.BelongsToGetAssociationMixin<users>;
  setOwner!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createOwner!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof groups {
    return groups.init({
    group_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'groups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "groups_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
    ]
  });
  }
}
