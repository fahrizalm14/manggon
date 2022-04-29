import { server } from './helper';
import supertest, { Response } from 'supertest';

describe('App class', () => {
  let request: supertest.SuperTest<supertest.Test>;
  beforeAll(async () => {
    await server.run();
    request = supertest('localhost:2000');
  });

  afterAll(async () => await server.stop());

  it('stop() method should be defined', () => {
    expect(server.stop).toBeDefined();
  });

  it('Should middleware called', async () => {
    const consoleSpy = jest.spyOn(console, 'info');
    expect(consoleSpy.mock.calls.length).toBe(0);
    await request.get('/');
    expect(consoleSpy.mock.calls.length).toBe(1);
    expect(consoleSpy.mock.calls[0][0]).toBe('Middleware called');
    jest.clearAllMocks();
  });

  it('GET / "Should return correct response"', async () => {
    const res: Response = await request
      .get('/')
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('First Testing success.');
  });

  it('POST / "Should return correct response"', async () => {
    const res: Response = await request
      .post('/second')
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('Second Testing success.');
  });

  it('response should return not found error', async () => {
    const res: Response = await request
      .post('/xxxxxx')
      .set('Accept', 'application/json');
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('fail');
    expect(res.body.message).toBe('Not Found.');
  });
});
