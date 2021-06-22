import { Router, Request, Response } from "express";
import BoAnalyzer from "./analyzer";
import Crowler from "./crowler";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("hello kbobo");
});

router.get("/getInfo", (req: Request, res: Response) => {
  const url = "https://www.umei.net/bizhitupian/meinvbizhi/yangyanmeinv.htm";
  const bAnalyzer = BoAnalyzer.getInstance();
  new Crowler(url, bAnalyzer);
  res.send("getInfo, success");
});

export default router;
