import express from "express";
import { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { Security } from "./utils/security";
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

const PORT = process.env.PORT as number | undefined


const start = async () => {
  try {
    // AppDataSource.initialize();
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    
  } catch (e) {
    console.log(e);
  }
}

start();