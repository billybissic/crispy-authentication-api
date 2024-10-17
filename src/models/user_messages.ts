import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from '../old-models/users';

export interface user_messagesAttributes {
  message_id: number;
  sender_id: number;
  receiver_id: number;
  message_text?: string;
  message_time: Date;
  is_read?: number;
  created_at?: Date;
}

export type user_messagesPk = "message_id";
export type user_messagesId = user_messages[user_messagesPk];
export type user_messagesOptionalAttributes = "message_id" | "message_text" | "is_read" | "created_at";
export type user_messagesCreationAttributes = Optional<user_messagesAttributes, user_messagesOptionalAttributes>;

export class user_messages extends Model<user_messagesAttributes, user_messagesCreationAttributes> implements user_messagesAttributes {
  message_id!: number;
  sender_id!: number;
  receiver_id!: number;
  message_text?: string;
  message_time!: Date;
  is_read?: number;
  created_at?: Date;

  // user_messages belongsTo users via receiver_id
  receiver!: users;
  getReceiver!: Sequelize.BelongsToGetAssociationMixin<users>;
  setReceiver!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createReceiver!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // user_messages belongsTo users via sender_id
  sender!: users;
  getSender!: Sequelize.BelongsToGetAssociationMixin<users>;
  setSender!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createSender!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_messages {
    return user_messages.init({
    message_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    message_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user_messages',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "message_id" },
        ]
      },
      {
        name: "user_messages_users_sender_id_fk",
        using: "BTREE",
        fields: [
          { name: "sender_id" },
        ]
      },
      {
        name: "user_messages_users_receiver_id_fk",
        using: "BTREE",
        fields: [
          { name: "receiver_id" },
        ]
      },
    ]
  });
  }
}
