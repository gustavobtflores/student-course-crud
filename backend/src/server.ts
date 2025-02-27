import express from "express";
import "dotenv/config";
import { routes } from "./routes";
import bodyParser from "body-parser";
import * as database from "./database";

database.connect();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use(routes);
