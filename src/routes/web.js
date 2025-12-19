import express from 'express';
import { handleHomeController, handleUserPageController } from '../controllers/homeConstroller';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/home', handleHomeController);
    router.get('/users', handleUserPageController);

    return app.use('/', router);
}

export default initWebRoutes;