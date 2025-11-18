import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

dotenv.config();

const port =  3000;


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//const staticPath = path.join(__dirname, "");

app.use(express.static(__dirname));
app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
