import type { Sequelize } from "sequelize";
import { users as _users } from "../models/users";
import type { usersAttributes, usersCreationAttributes } from "../models/users";

export {
  _users as users,
};

export type {
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const users = _users.initModel(sequelize);


  return {
    users: users,
  };
}
