import { describe , test, expect } from 'vitest';
import app from './server.ts'
import request from 'supertest';

describe ('GET /Destinations', () => {
        test('should return an array of destinations', async ()=> {
            const response = await request(app)
            .get('/Destinations')
            .expect(200);
            
            expect(response.body).toBeInstanceOf(Array);
        })
    }
)

describe ('POST /InputLocation', () => {
    test('should accept a location and respond with a success message', async () => {
        const response = await request(app)
        .post('/InputLocation')
        .send({ CurrentLocation: "paris"})
        .expect(200);

        expect(response.body.message).toBeInstanceOf(String);
        })
}
