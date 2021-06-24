import { data } from "cheerio/lib/api/attributes";

interface Result {
  returnCode: number;
  returnMsg: string;
  returnData: any;
}

export const getResponseData = (code: number, msg: string, data: any): Result => {
  return {
    returnCode: code,
    returnMsg: msg,
    returnData: data,
  };
};
