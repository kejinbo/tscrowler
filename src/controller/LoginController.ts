import "reflect-metadata";
import { Request, Response } from "express";
import { controller, get, post } from "../decorator";
import { getResponseData } from "../utils/util";

interface BodyRequest extends Request {
  body: {
    [propName: string]: string | undefined;
  };
}

@controller
export class LoginController {
  @get("/logout")
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(200, "退出登录", {}));
  }

  @post("/login")
  login(req: BodyRequest, res: Response) {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.json(getResponseData(-101, "已经登陆过", {}));
    } else {
      if (password === "123" && req.session) {
        req.session.login = true;
        res.json(getResponseData(200, "登录成功", {}));
      } else {
        res.json(getResponseData(-101, "登录失败", {}));
      }
    }
  }

  @get("/")
  home(req: BodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.send(`
      <html>
        <body>
          <a href='/getInfo'>爬取内容</a>
          <a href='/showData'>展示内容</a>
          <a href='/logout'>退出</a>
        </body>
      </html>
    `);
    } else {
      res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button>登陆</button>
          </form>
        </body>
      </html>
    `);
    }
  }
}
