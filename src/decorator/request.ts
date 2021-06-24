import { REQ_METHOD } from "../utils/util";

// 使用工厂模式生成所需要的请求函数
function getReqDecrator(method: REQ_METHOD) {
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

export const get = getReqDecrator(REQ_METHOD.get);
export const post = getReqDecrator(REQ_METHOD.post);
