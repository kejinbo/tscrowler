import { Router, RequestHandler } from "express";
export const router = Router();

enum REQ_METHOD {
  "get" = "get",
  "post" = "post",
}

// 类修饰器，参数是构造函数
export function controller(constructor: any) {
  for (let key in constructor.prototype) {
    const path = Reflect.getMetadata("path", constructor.prototype, key);
    const method: REQ_METHOD = Reflect.getMetadata("method", constructor.prototype, key);
    const handler = constructor.prototype[key];
    const middleware = Reflect.getMetadata("middleware", constructor.prototype, key);
    if (path && handler && method) {
      if (middleware) {
        router[method](path, middleware, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
}

// 使用工厂模式生成所需要的请求函数
function getReqDecrator(method: string) {
  return function (path: string) {
    // 方法修饰器 第一个参数
    // 普通方法，target 对应的是类的 prototype
    // 静态方法，target 对应的是类的构造函数
    return function (target: any, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", method, target, key);
    };
  };
}

// 中间件装饰器
export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}

export const get = getReqDecrator("get");
export const post = getReqDecrator("post");
