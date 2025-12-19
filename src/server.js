import express from 'express';

import configureViewEngine from './configs/viewEngine';

import initWebRoutes from './routes/web';

const app = express();

configureViewEngine(app);
initWebRoutes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});