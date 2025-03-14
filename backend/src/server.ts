import express from "express";
import "dotenv/config";
import { routes } from "./routes";
import bodyParser from "body-parser";
import * as database from "./database";
import cors from "cors";
import morgan from "morgan";

database.connect();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use(routes);
