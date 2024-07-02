import express,{ NextFunction, Request, Response } from "express";
import { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { AppDataSource } from "./dataSource";
import { router } from "./router";
import { json } from "body-parser";
import { createConnection } from "typeorm";
const app: Application = express();

app.use(helmet());
// Cors
app.use(cors());
// Parser
app.use(express.json());
//configure env;
dotenv.config({ path: __dirname+'/.env' });
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/api', router)

const PORT = process.env.PORT as number | undefined

const start = async () => {
  try {
    AppDataSource.initialize();
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

    
  } catch (e) {
    console.log(e);
  }
}

start();