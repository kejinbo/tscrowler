import express from "express";
import cookieSession from "cookie-session";
import "./controller/LoginController";
import "./controller/CrowlerController";
import router from "./router";

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["kbobo"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(router);

app.listen(7001, () => {
  console.log("server is runnint");
});
