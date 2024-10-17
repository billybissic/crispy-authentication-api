import type { Sequelize } from "sequelize";
import { authentication_configurations as _authentication_configurations } from "./authentication_configurations";
import type { authentication_configurationsAttributes, authentication_configurationsCreationAttributes } from "./authentication_configurations";

export {
  _authentication_configurations as authentication_configurations,
};

export type {
  authentication_configurationsAttributes,
  authentication_configurationsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const authentication_configurations = _authentication_configurations.initModel(sequelize);


  return {
    authentication_configurations: authentication_configurations,
  };
}
