declare module "express-http-proxy" {
  import { RequestHandler, Request, Response } from "express";
  import { RequestOptions, IncomingHttpHeaders, OutgoingHttpHeaders } from "http";
  import { Response as StaticCoreResponse } from "express-serve-static-core";
  
  interface ProxyOptions {
      filter?: (req: Request, res: Response) => boolean | Promise<boolean>;
      proxyReqPathResolver?: (req: Request) => string;
      proxyReqOptDecorator?: (proxyReqOpts: RequestOptions, srcReq: Request) => RequestOptions;
      proxyReqBodyDecorator?: (bodyContent: string, srcReq: Request) => string | Promise<string>;
      userResHeaderDecorator?: (headers: IncomingHttpHeaders, userReq: Request, userRes: StaticCoreResponse, proxyReq: Request, proxyRes: StaticCoreResponse) => OutgoingHttpHeaders;
      userResDecorator?: (proxyRes: StaticCoreResponse, proxyResData: Buffer, userReq: Request, userRes: StaticCoreResponse) => string | Buffer | Promise<Buffer>;
  }
  
  function proxy(host: string, options?: ProxyOptions): RequestHandler;
  export = proxy;
}
