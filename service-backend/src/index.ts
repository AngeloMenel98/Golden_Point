import express = require("express");
import cors = require("cors");
import path = require("path");
import * as dotenv from "dotenv";

// Load environment variables FIRST, before any other imports
const envFilePath = path.join(__dirname, "..", ".env");
dotenv.config({ path: envFilePath });

import configureRoutes from "./routes/index";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    })
);

configureRoutes(app);
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
