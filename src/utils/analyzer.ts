import * as fs from "fs";
import cheerio from "cheerio";
import { Analyzer } from "./crowler";

interface LadyPicture {
  imgUrl: string;
  title: string;
  count: number;
}

interface LadyPictureResult {
  time: number;
  data: LadyPicture[];
}

interface JsonContent {
  [propName: number]: LadyPicture[];
}

// 单例模式
export default class BoAnalyzer implements Analyzer {
  // implements 必须实现 Analyzer 里面定义的方法或属性 （analyze）
  private static instance: BoAnalyzer;

  public static getInstance() {
    if (!BoAnalyzer.instance) {
      BoAnalyzer.instance = new BoAnalyzer();
    }
    return BoAnalyzer.instance;
  }

  private getLadyInfo(html: string) {
    const $ = cheerio.load(html);
    const list = $(".TypeList").find("li");
    const LadyPictureInfos: LadyPicture[] = [];
    list.map((index, element) => {
      const imgUrl = $(element).find("a img").eq(0).attr("src") || "";
      const title = $(element).find("a span").eq(0).text();
      const count = parseInt($(element).find(".IcoList").eq(0).text().split("：")[1], 10);
      LadyPictureInfos.push({
        imgUrl,
        title,
        count,
      });
    });
    return {
      time: new Date().getTime(),
      data: LadyPictureInfos,
    };
  }

  private generateJsonContent(resultInfo: LadyPictureResult, filePath: string) {
    let fileContent: JsonContent = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[resultInfo.time] = resultInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const result = this.getLadyInfo(html);
    const jsonContent = this.generateJsonContent(result, filePath);
    return JSON.stringify(jsonContent, undefined, 2);
  }

  private constructor() {}
}
