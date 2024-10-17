import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface authentication_configurationsAttributes {
  id: number;
  config_name: string;
  config_value: string;
  date_added: string;
  last_updated: string;
}

export type authentication_configurationsPk = "id";
export type authentication_configurationsId = authentication_configurations[authentication_configurationsPk];
export type authentication_configurationsCreationAttributes = authentication_configurationsAttributes;

export class authentication_configurations extends Model<authentication_configurationsAttributes, authentication_configurationsCreationAttributes> implements authentication_configurationsAttributes {
  id!: number;
  config_name!: string;
  config_value!: string;
  date_added!: string;
  last_updated!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof authentication_configurations {
    return authentication_configurations.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    config_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    config_value: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    date_added: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_updated: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'authentication_configurations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
