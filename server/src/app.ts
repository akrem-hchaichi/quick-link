import express from 'express';
import urlRoutes from './routes/urlRoutes';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { swaggerDocs } from './config/swagger';
import { requestLogger, errorLogger } from './utils/logger';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Log HTTP requests
app.use(requestLogger);

// Existing middleware
app.use(express.json());

// Routes
app.use('/api', urlRoutes);

// Log HTTP errors
app.use(errorLogger);

// Swagger
swaggerDocs(app);

// Error handling
app.use(errorHandlerMiddleware);


export default app;