import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('invalid route', async () => {
    const response = await request.get('invalid_route/');
    expect(response.status).toBe(404);
  });
  it('tests the image endpoint', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(200);
  });
  it('tests invalid filename query parameter', async () => {
    const response = await request.get('/api/images?fiii=fjord');
    expect(response.status).toBe(200);
  });
  it('tests invalid file', async () => {
    const response = await request.get('/api/images?filename=fjor');
    console.log(response.body);
    expect(response.body.message).toEqual('File does not exist');
    expect(response.status).toBe(200);
  });
});
