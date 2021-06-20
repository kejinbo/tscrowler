import * as fs from "fs";
import * as path from "path";
import * as superagent from "superagent";
import BoAnalyzer from "./analyzer";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowler {
  private filePath = path.resolve(__dirname, "../data/ladyInfo.json");

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    console.log(content, this.filePath, "xx");
    console.log("xxx");
    fs.writeFileSync(this.filePath, content);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const jsonContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(jsonContent);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}

const url = "https://www.umei.net/bizhitupian/meinvbizhi/yangyanmeinv.htm";

const bAnalyzer = BoAnalyzer.getInstance();
new Crowler(url, bAnalyzer);
