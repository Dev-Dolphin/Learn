import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import configureViewEngine from './configs/viewEngine';

import initWebRoutes from './routes/web';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configureViewEngine(app);
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});