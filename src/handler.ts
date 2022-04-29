import { NextFunction, Request, Response, Router } from 'express';

/**
 * @class Handler
 * @description Membuat handler baru
 * @param path {string} - Endpoint utama dari handler
 * @param _child.function {function} - Function untuk router
 * @param _child.method {string} -  Contoh: "post", "get", "put", "delete"
 * @param _child.childPath {string} - Contoh: "/user/:id"
 *
 */
export class Handler {
  public router = Router();
  private child: {
    childPath: string;
    /**
     *
     * @param req {Request} - Request dari express
     * @param res {Response} - Response dari express
     * @param next {NextFunction} - Next function dari express
     */
    function(req: Request, res: Response, next?: NextFunction): Promise<void>;
    method: string;
  }[];
  constructor(
    public readonly path: string,
    ..._child: {
      childPath: string;
      function(req: Request, res: Response, next?: NextFunction): Promise<void>;
      method: string;
    }[]
  ) {
    this.child = _child;
    this.initRoute();
  }

  private initRoute(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _router = this.router as any;
    this.child.forEach((r) => {
      _router[`${r.method}`](`${r.childPath}`, r.function);
    });
  }
}
