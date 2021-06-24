import * as fs from "fs";
import * as path from "path";
import * as superagent from "superagent";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowler {
  private filePath = path.resolve(__dirname, "../../data/ladyInfo.json");

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
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

export default Crowler;
