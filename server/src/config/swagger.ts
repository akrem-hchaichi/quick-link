import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { Request, Response } from 'express';

// Load the Swagger JSON file
const swaggerDocument = require(path.join(__dirname, '../../swagger/swagger.json'));

export const swaggerDocs = (app: any) => {
    // Serve Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Serve Swagger JSON
    app.get('/api-docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocument);
    });

    console.log(`Swagger docs available at http://localhost:5000/api-docs`);
};