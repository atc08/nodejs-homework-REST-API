const fs = require('fs/promises');
const request = require('supertest');
const { newTestUser } = require('./data/data');
const app = require('../app');

const db = require('../model/db');
const User = require('../model/schema/user');
const Users = require('../model/users');

jest.mock('cloudinary');

describe('E2E test routes api/users', () => {
  let token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newTestUser.email });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newTestUser.email });
    await mongo.disconnect();
  });

  it('should response 201 status for POST registration user', async () => {
    const res = await request(app).post('/api/users/signup').send(newTestUser);
    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();
  });

  it('should response 409 status for POST registration user', async () => {
    const res = await request(app).post('/api/users/signup').send(newTestUser);
    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
  });

  it('should response 200 status for POST login user', async () => {
    const res = await request(app).post('/api/users/login').send(newTestUser);
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    token = res.body.data.token;
  });

  it('should response 401 status for POST login user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '12345679' });
    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
  });

  it('should response 200 status for PATCH upload avatar user', async () => {
    const buf = await fs.readFile('./test/data/AVATAR_04.jpg');
    const res = await request(app)
      .patch('/api/users/avatar')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', buf, 'AVATAR_04.jpg');
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.data.avatarUrl).toBe('avatar');
  });
});
