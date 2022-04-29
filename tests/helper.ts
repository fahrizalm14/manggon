import { NextFunction, Request, Response } from 'express';
import { Handler, App } from '../src';

export const server = new App({
  port: 2000,
  middleware: [
    async (_req: Request, _res: Response, next: NextFunction) => {
      console.info('Middleware called');
      next();
    }
  ],
  handler: [
    new Handler(
      '',
      {
        childPath: '',
        method: 'get',
        function: async (_req: Request, res: Response) => {
          res.status(200).json({
            status: 'success',
            message: 'First Testing success.'
          });
        }
      },
      {
        childPath: '/second',
        method: 'post',
        function: async (_req: Request, res: Response) => {
          res.status(200).json({
            status: 'success',
            message: 'Second Testing success.'
          });
        }
      }
    )
  ],
  notFoundMessage: {
    status: 'fail',
    message: 'Not Found.'
  }
});
