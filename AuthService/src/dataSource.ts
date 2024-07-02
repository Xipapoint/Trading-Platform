import dotenv from "dotenv";
import path from "path";
import 'reflect-metadata'
import { DataSource } from 'typeorm'
//configure env;
dotenv.config({ path: path.resolve(__dirname, './.env') })
const port = process.env.DB_PORT as number | undefined
if(typeof process.env.DB_PASSWORD !== 'string') console.log("db password is not a string");


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // entities: [`${__dirname}/entity/*.{ts,js}`],
    // migrations: [`${__dirname}/migrations/*.{ts,js}`],
    entities: ["./src/entity/*.ts"],
    migrations: ["./src/migrations/*.ts"],
})