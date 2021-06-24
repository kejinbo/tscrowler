import router from "../router";
import { REQ_METHOD } from "../utils/util";

// 类修饰器，参数是构造函数
export function controller(constructor: any) {
  for (let key in constructor.prototype) {
    const path: string = Reflect.getMetadata("path", constructor.prototype, key);
    const method: REQ_METHOD = Reflect.getMetadata("method", constructor.prototype, key);
    const middlewares = Reflect.getMetadata("middlewares", constructor.prototype, key);
    const handler: any = constructor.prototype[key];
    if (path && handler && method) {
      if (middlewares && middlewares.length) {
        router[method](path, ...middlewares, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
}
