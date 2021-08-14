const request = require('supertest');
const api = require('./api');


describe('POST ENDPOINTS', () => {

  it('should get all posts', async () => {
    const response = await request(api).get('/api/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(2)
  });

  it('should fail if title does not exist', async () => {
    const response = await request(api).post('/api/posts').send({
      content: 'bla bla',
    });
    expect(response.statusCode).toBe(422)
    expect(response.body.message).toBe('validation error');
  });

 it('should create a new post', async () => {
  const response = await request(api).post('/api/posts').send({
    content: 'bla bla',
    title: 'new title'
  });
  expect(response.statusCode).toBe(201)
  expect(response.body.message).toBe('post created');
  expect(response.body.data).toHaveProperty('title');
  expect(response.body.data.title).toBe('new title');
 });
})




