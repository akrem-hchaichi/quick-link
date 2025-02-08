import express from 'express';
import urlRoutes from './routes/urlRoutes';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { swaggerDocs } from './config/swagger';
import { requestLogger, errorLogger } from './utils/logger';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(requestLogger);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Quick-link Server!');
});

app.use('/api', urlRoutes);

app.use(errorLogger);

swaggerDocs(app);

app.use(errorHandlerMiddleware);


export default app;