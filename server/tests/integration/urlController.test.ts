import request from 'supertest';
import app from '../../src/app';
import Url from '../../src/models/urlModel';

describe('UrlController', () => {
    beforeEach(async () => {
        // Clear the database before each test
        await Url.deleteMany({});
    });

    describe('POST /api/urls', () => {
        it('should create a new URL', async () => {
            const response = await request(app)
                .post('/api/urls')
                .send({ longUrl: 'https://www.example.com' });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('shortId');
            expect(response.body.longUrl).toBe('https://www.example.com');
        });

        it('should return 400 for invalid longUrl', async () => {
            const response = await request(app)
                .post('/api/urls')
                .send({ longUrl: 'invalid-url' });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });
    });

    describe('GET /api/urls', () => {
        it('should return all URLs', async () => {
            // Create a URL
            await request(app)
                .post('/api/urls')
                .send({ longUrl: 'https://www.example.com' });

            const response = await request(app).get('/api/urls');

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(1);
        });
    });

    describe('GET /api/urls/:shortId', () => {
        it('should return a URL by shortId', async () => {
            // Create a URL
            const createResponse = await request(app)
                .post('/api/urls')
                .send({ longUrl: 'https://www.example.com' });

            expect(createResponse.status).toBe(201); // Ensure the creation was successful
            const shortId = createResponse.body.shortId;

            // Fetch the URL using shortId
            const response = await request(app).get(`/api/urls/${shortId}`);

            expect(response.status).toBe(200);
            expect(response.body.shortId).toBe(shortId);
        });

        it('should return 404 for an invalid shortId', async () => {
            const response = await request(app).get('/api/urls/invalidShortId');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('URL not found');
        });
    });

    describe('PUT /api/urls/:shortId', () => {
        it('should update a URL', async () => {
            // Create a URL
            const createResponse = await request(app)
                .post('/api/urls')
                .send({ longUrl: 'https://www.example.com' });

            const shortId = createResponse.body.shortId;
            const response = await request(app)
                .put(`/api/urls/${shortId}`)
                .send({ longUrl: 'https://www.updated-example.com' });

            expect(response.status).toBe(200);
            expect(response.body.longUrl).toBe('https://www.updated-example.com');
        });

        it('should return 404 for an invalid shortId', async () => {
            const response = await request(app)
                .put('/api/urls/invalidShortId')
                .send({ longUrl: 'https://www.example.com' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('URL not found'); 
        });
    });


    describe('DELETE /api/urls/:shortId', () => {
        it('should delete a URL', async () => {
            // Create a URL
            const createResponse = await request(app)
                .post('/api/urls')
                .send({ longUrl: 'https://www.example.com' });

            const shortId = createResponse.body.shortId;
            const response = await request(app).delete(`/api/urls/${shortId}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('URL deleted successfully');
        });

        it('should return 404 for an invalid shortId', async () => {
            const response = await request(app).delete('/api/urls/invalidShortId');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('URL not found');
        });
    });
});