import { Router } from 'express';
import { Handler } from './../src/handler';
describe('Handler class', () => {
  const handler = new Handler('test', {
    childPath: 'child',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function: async (_req, _res, _next) => {
      console.log('Child path');
    },
    method: 'get'
  });
  it('Should correct get path property value', async () => {
    expect(handler.path).toStrictEqual('test');
    expect(handler.path).not.toStrictEqual('path');
  });
  it('Should correct get express router', async () => {
    expect(handler.router).toBeDefined();
    expect(typeof handler.router).toBe(typeof Router());
  });
});
