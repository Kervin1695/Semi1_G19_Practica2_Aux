import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.RDS_DB,
    process.env.RDS_USER,
    process.env.RDS_PASSWORD,
    {
        host: process.env.RDS_HOST,
        dialect: 'mysql',
        port: process.env.RDS_PORT,
        logging: false,
    }
);