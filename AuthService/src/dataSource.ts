import dotenv from "dotenv";
import 'reflect-metadata'
import { DataSource } from 'typeorm'
//configure env;
dotenv.config({ path: __dirname+'/.env' });
const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/entity/*.{ts,js}`],
    migrations: [`${__dirname}/migrations/*.{ts,js}`],
})