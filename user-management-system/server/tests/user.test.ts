import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/User';
import jwt from 'jsonwebtoken';

describe('User Routes', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);

    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();
    userId = user._id.toString();

    token = jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET!);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/users/profile', () => {
    it('should get user profile', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'Test User');
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });
  });

  describe('PUT /api/users/profile', () => {
    it('should update user profile', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated User',
          bio: 'This is a test bio',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'Updated User');
      expect(res.body).toHaveProperty('bio', 'This is a test bio');
    });
  });

  describe('GET /api/users', () => {
    it('should get all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a user by id', async () => {
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'Updated User');
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });
  });
});