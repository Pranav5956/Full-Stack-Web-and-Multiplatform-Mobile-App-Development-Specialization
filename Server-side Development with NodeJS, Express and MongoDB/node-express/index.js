import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import http from "http";

import dishRouter from "./routes/dishRouter.js";

const host = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(path.resolve() + "/public"));
app.use("/dishes", dishRouter);

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
