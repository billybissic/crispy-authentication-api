import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { groups, groupsId } from './groups';

export interface group_password_resetsAttributes {
  reset_id: number;
  group_id: number;
  reset_token: string;
  expiration_time: Date;
  is_valid?: number;
}

export type group_password_resetsPk = "reset_id";
export type group_password_resetsId = group_password_resets[group_password_resetsPk];
export type group_password_resetsOptionalAttributes = "reset_id" | "is_valid";
export type group_password_resetsCreationAttributes = Optional<group_password_resetsAttributes, group_password_resetsOptionalAttributes>;

export class group_password_resets extends Model<group_password_resetsAttributes, group_password_resetsCreationAttributes> implements group_password_resetsAttributes {
  reset_id!: number;
  group_id!: number;
  reset_token!: string;
  expiration_time!: Date;
  is_valid?: number;

  // group_password_resets belongsTo groups via group_id
  group!: groups;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<groups>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<groups, groupsId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<groups>;

  static initModel(sequelize: Sequelize.Sequelize): typeof group_password_resets {
    return group_password_resets.init({
    reset_id: {
      autoIncrement: true,
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
    reset_token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expiration_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'group_password_resets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reset_id" },
        ]
      },
      {
        name: "group_password_resets_groups_group_id_fk",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
  }
}
