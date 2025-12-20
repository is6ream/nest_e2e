import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Получаем подключение к базе данных
    connection = moduleFixture.get<Connection>(getConnectionToken());

    if (connection && connection.db) {
      const collections = await connection.db.listCollections().toArray();
      for (const collection of collections) {
        await connection.db.collection(collection.name).deleteMany({});
      }
    } else {
      throw new Error('Connection not found');
    }

    // Create a user for testing
    const userResponse = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com', isActive: true });
    createdUserId = userResponse.body._id;
  });
  afterAll(async () => {
    await app.close();
  });

  it('/orders (POST) should create an order with userId', async () => {
    const response = await request(app.getHttpServer()).post('/orders').send({
      orderId: '123',
      product: 'Product A',
      orderDate: new Date(),
      userId: createdUserId,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.userId).toBe(createdUserId);
  });

  it('/orders (GET) should retrieve all orders', async () => {
    const response = await request(app.getHttpServer()).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].userId).toBe(createdUserId);
  });

  it('/orders/:id (GET) should retrieve an order by id', async () => {
    const orderResponse = await request(app.getHttpServer())
      .post('/orders')
      .send({
        orderId: '456',
        product: 'Product B',
        orderDate: new Date(),
        userId: createdUserId,
      });

    const orderId = orderResponse.body._id;
    const response = await request(app.getHttpServer()).get(
      `/orders/${orderId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(orderId);
    expect(response.body.userId).toBe(createdUserId);
  });

  it('/orders/:id (PATCH) should update an order', async () => {
    const orderResponse = await request(app.getHttpServer())
      .post('/orders')
      .send({
        orderId: '789',
        product: 'Product C',
        orderDate: new Date(),
        userId: createdUserId,
      });

    const orderId = orderResponse.body._id;
    const response = await request(app.getHttpServer())
      .patch(`/orders/${orderId}`)
      .send({ product: 'Updated Product' });

    expect(response.status).toBe(200);
    expect(response.body.product).toBe('Updated Product');
  });

  it('/orders/:id (DELETE) should delete an order', async () => {
    const orderResponse = await request(app.getHttpServer())
      .post('/orders')
      .send({
        orderId: '101112',
        product: 'Product D',
        orderDate: new Date(),
        userId: createdUserId,
      });

    const orderId = orderResponse.body._id;
    const response = await request(app.getHttpServer()).delete(
      `/orders/${orderId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(orderId);
  });
});
