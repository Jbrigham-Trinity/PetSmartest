const request = require('supertest');
const app = require('./app');

describe('Test Express App', () => {
  test('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello World');
  });
});
