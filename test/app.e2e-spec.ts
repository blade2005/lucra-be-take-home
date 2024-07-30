import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('/games (GET)', () => {
    return request(app.getHttpServer())
      .get('/games')
      .accept('json')
      .expect(200)
      .expect(function (res) {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });
  it('/games (POST)', () => {
    // TODO: Implement better testing of returned data, zod would be a good option.
    return request(app.getHttpServer())
      .post('/games')
      .query({ rows: 5, columns: 10 })
      .accept('json')
      .expect(
        201,
        expect.objectContaining({
          id: expect.anything(),
          status: 'PENDING',
          rows: 5,
          columns: 10,
          cells: expect.anything(),
        }),
      );
  });
});
