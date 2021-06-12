const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { newContact, newUser } = require('./data/data');
const app = require('../app');

const db = require('../model/db');
const Contact = require('../model/schema/contact');
const User = require('../model/schema/user');
const Users = require('../model/users');

describe('E2E test routes api/contacts', () => {
  let user, token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUser.email });
    user = await Users.create(newUser);
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, JWT_SECRET_KEY);
    await Users.updateToken(user._id, token);
  });

  beforeEach(async () => {
    await Contact.deleteMany();
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUser.email });
    await mongo.disconnect();
  });

  describe('should handle GET request', () => {
    it('should response 200 status for GET all contacts', async () => {
      const res = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
    });

    it('should response 200 status for GET contact by id', async () => {
      const contact = await Contact.create({
        ...newContact,
        owner: user._id,
      });
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contactWithId.id).toBe(String(contact._id));
    });

    it('should response 400 status for GET contact by id', async () => {
      const res = await request(app)
        .get(`/api/contacts/123`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
    });
  });

  describe('should handle POST request', () => {
    it('should response 201 status CREATE contact', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(newContact);
      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
    });

    it('should response 400 status CREATE contact without required field PHONE', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Alex' });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
    });

    it('should response 400 status CREATE contact without required field NAME', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ phone: '123-45-67' });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
    });
  });

  describe('should handle PUT request', () => {
    it('should response 200 status CREATE contact', async () => {
      const contact = await Contact.create({
        ...newContact,
        owner: user._id,
      });
      const res = await request(app)
        .patch(`/api/contacts/${contact.id}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'John' });
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contactWithId.name).toBe('John');
    });
  });
  describe('should handle DELETE request', () => {});
  describe('should handle PATCH request', () => {});
});
