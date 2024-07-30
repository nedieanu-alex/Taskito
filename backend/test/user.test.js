import request from 'supertest';
import server from '../index.js';
import User from '../models/User.js';

beforeAll(async () => {
  await User.deleteMany({});
});

describe('User Authentication', () => {
  describe('/POST register', () => {
    it('it should register a new user', async () => {
      const user = {
        username: "testuser",
        email: "testuser@example.com",
        password: "123456"
      };

      const res = await request(server)
        .post('/api/users/register')
        .send(user);

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
    });
  });

  describe('/POST login', () => {
    it('it should login the user and return a token', async () => {
      const user = {
        email: "testuser@example.com",
        password: "123456"
      };

      const res = await request(server)
        .post('/api/users/login')
        .send(user);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('token');
    });
  });
});
