import "reflect-metadata";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import BoAnalyzer from "../utils/analyzer";
import Crowler from "../utils/crowler";
import { controller, get, use } from "./decorator";
import { getResponseData } from "../utils/util";

interface BodyRequest extends Request {
  body: {
    [propName: string]: string | undefined;
  };
}

// 使用 cookie 中间件 对登录状态进行校验
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  isLogin ? next() : res.json(getResponseData(-100, "请先登录", {}));
};

@controller
class CrowlerController {
  @get("/getInfo")
  @use(checkLogin)
  getInfo(req: BodyRequest, res: Response) {
    const url = "https://www.umei.net/bizhitupian/meinvbizhi/yangyanmeinv.htm";
    const bAnalyzer = BoAnalyzer.getInstance();
    new Crowler(url, bAnalyzer);
    res.json(getResponseData(200, "获取信息成功", {}));
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response) {
    try {
      const position = path.resolve(__dirname, "../../data/ladyInfo.json");
      const result = fs.readFileSync(position, "utf8");
      res.json(getResponseData(200, "获取信息成功", JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData(-102, "数据不存在", {}));
    }
  }
}
