import express from "express";
import http from "http";
import logger from "morgan";
import path from "path";
import ssr from "./ssr";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(logger("short"));

const buildPath = path.join(__dirname, "../../", "build");

app.use("/", express.static(buildPath));

app.get("*", ssr);

http.createServer(app).listen(app.get("port"), () => {
  // eslint-disable-line no-console
  console.log(`Express server started at: http://localhost:${app.get("port")}/`);
});

// module.exports = app;
