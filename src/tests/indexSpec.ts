import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('tests the image endpoint', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(200);
  });
  it('tests invalid filename query parameter', async () => {
    const response = await request.get('/api/images?fiii=fjord');
    expect(response.status).toBe(200);
  });
});
