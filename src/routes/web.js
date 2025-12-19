import express from 'express';
import { handleCreateUser, handleHomeController, handleUserPageController } from '../controllers/homeConstroller';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/home', handleHomeController);
    router.get('/users', handleUserPageController);
    router.post('/api/users', handleCreateUser);

    return app.use('/', router);
}

export default initWebRoutes;