import { RequestHandler } from "express";
// 中间件装饰器
export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
