import express = require('express');
import cors = require('cors');
import configureRoutes from './routes/index';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
    .then(async () => {})
    .catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    })
);*/
app.use(cors());

configureRoutes(app);
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
