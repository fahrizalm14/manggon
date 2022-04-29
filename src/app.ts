import express, { Express, Router } from 'express';
import * as http from 'http';

/**
 * @class App
 * @description Membuat server baru dengan parameter option
 * @param option.port {Number} - Port yang akan digunakan
 * @param option.handler {Array} - Array handler
 * @param option.middleware {Array} - Array middleware
 * @param option.notFoundMessage {Object} - Message untuk not found
 */
export class App {
  private readonly app: Express = express();
  private server: http.Server | undefined;

  constructor(
    private readonly option: {
      port: number;
      handler: { path: string; router: Router }[];
      database?: {
        connect(): Promise<void>;
        disconnect(): Promise<void>;
        drop(): Promise<void>;
      };
      notFoundMessage?: object;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      middleware?: any[];
      plugin?: { name: string }[];
    }
  ) {
    this.initMiddlewares();
    this.initRoutes();
  }

  /**
   * Start the server and listen on the given port
   */
  public async run(): Promise<void> {
    this.server = this.app.listen(this.option.port, () => {
      console.log(`Server run on port: ${this.option.port}`);
    });
  }

  /**
   * Memberhentikan server
   */
  public async stop(): Promise<void> {
    this.server?.close();
  }

  private initRoutes(): void {
    this.option.handler.forEach((r) => {
      this.app.use(`/${r.path}`, r.router);
    });
    // Handle Not Found
    if (this.option.notFoundMessage) {
      this.app.use('*', (_req, res) => {
        res.status(404).json(this.option.notFoundMessage);
      });
    }
  }

  private initMiddlewares(): void {
    // Handle Nextfunction
    this.app.use((_req, _res, next) => {
      return next();
    });
    this.option.middleware?.forEach((m) => {
      this.app.use(m);
    });
  }
}
