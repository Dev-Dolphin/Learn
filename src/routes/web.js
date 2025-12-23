import express from 'express';
import { handleCreateUser, handleDeleteUser, handleHomeController, handleUpdateUser, handleUserPageController } from '../controllers/homeConstroller';
import { handleLoginController, handleRegisterController, verifyToken } from '../controllers/loginConstroller';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/home', handleHomeController);
    router.get('/users', handleUserPageController);
    router.get('/api/users', verifyToken, handleHomeController);
    router.delete('/api/users/:id', verifyToken, handleDeleteUser);
    router.post('/api/update-user', verifyToken, handleUpdateUser);
    router.post('/api/login', handleLoginController);
    router.post('/api/signup', handleRegisterController);

    return app.use('/', router);
}

export default initWebRoutes;