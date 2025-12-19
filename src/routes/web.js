import express from 'express';
import { handleCreateUser, handleDeleteUser, handleHomeController, handleUpdateUser, handleUserPageController } from '../controllers/homeConstroller';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/home', handleHomeController);
    router.get('/users', handleUserPageController);
    router.post('/api/users', handleCreateUser);
    router.delete('/api/users/:id', handleDeleteUser);
    router.post('/api/update-user', handleUpdateUser);

    return app.use('/', router);
}

export default initWebRoutes;