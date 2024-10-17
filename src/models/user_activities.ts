import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_activitiesAttributes {
  activity_id: number;
  user_id: number;
  activity_name: string;
  activity_description?: string;
  activity_start_time: Date;
  activity_end_time: Date;
  created_at?: Date;
}

export type user_activitiesPk = "activity_id";
export type user_activitiesId = user_activities[user_activitiesPk];
export type user_activitiesOptionalAttributes = "activity_id" | "activity_description" | "created_at";
export type user_activitiesCreationAttributes = Optional<user_activitiesAttributes, user_activitiesOptionalAttributes>;

export class user_activities extends Model<user_activitiesAttributes, user_activitiesCreationAttributes> implements user_activitiesAttributes {
  activity_id!: number;
  user_id!: number;
  activity_name!: string;
  activity_description?: string;
  activity_start_time!: Date;
  activity_end_time!: Date;
  created_at?: Date;

  // user_activities belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_activities {
    return user_activities.init({
    activity_id: {
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
    activity_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    activity_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    activity_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    activity_end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_activities',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "activity_id" },
        ]
      },
      {
        name: "user_activities_users_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
