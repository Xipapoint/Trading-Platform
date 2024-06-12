import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
const app: Application = express();

app.use(helmet());
// Cors
app.use(cors());
//configure env;
dotenv.config({ path: __dirname+'/.env' });
// Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT:number = 5000 ;
const db_uri: string | undefined = process.env.DATABASE_URL;


const start = async () => {
    try {
      if(db_uri !== undefined){
        await mongoose.connect(db_uri);
      } else {
        console.log("DB URL IS OUT OF REACH");
      }

      app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();