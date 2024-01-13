import express = require('express');
import configureRoutes from './routes/index';
import { AppDataSource } from './data-source';

AppDataSource.initialize()

    .then(async () => {
        /*console.log('Inserting a new user into the database...');

        const userController = new UserController();

        const user = new User();
        user.username = 'Timber';
        user.password = 'Saw';
        user.email = 'aa@aa.com';
        user.isSingle = true;
        await userController.save(user);
        console.log('Saved a new user with id: ' + user.id);

        console.log('Loading users from the database...');
        const users = await userController.findUsername(user.username);
        console.log('Loaded users: ', users);

        console.log(
            'Here you can setup and run express / fastify / any other framework.'
        );*/
    })
    .catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureRoutes(app);
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
