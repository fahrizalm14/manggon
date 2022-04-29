import { NextFunction, Request, Response, Router } from 'express';

export class Handler {
  public router = Router();
  private child: {
    childPath: string;
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
