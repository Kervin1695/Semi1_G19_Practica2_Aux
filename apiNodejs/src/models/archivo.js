import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Archivo = sequelize.define('Archivo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo : {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Archivo',
    timestamps: false
});