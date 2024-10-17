import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface administratorsAttributes {
    admin_id: number;
    uuid: string;
}

export type administratorsPk = "admin_id" | "uuid";
export type admin_id = administrators[administratorsPk];
export type administratorsOptionalAttributes = "admin_id" | "uuid";
export type admninistratorsCreationAttributes = Optional<administratorsAttributes, administratorsOptionalAttributes>;

export class administrators extends Model<administratorsAttributes, admninistratorsCreationAttributes> implements administratorsAttributes {
    admin_id!: number;
    uuid!: string;


    static initModel(sequelize: Sequelize.Sequelize): typeof administrators {
        return administrators.init({
            admin_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            uuid: {
                type: DataTypes.STRING(512),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'administrators',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "admin_id" },
                    ]
                },
            ]
        });
    }
}
