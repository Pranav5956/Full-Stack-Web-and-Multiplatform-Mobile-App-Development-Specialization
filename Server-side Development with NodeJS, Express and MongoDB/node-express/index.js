import express from "express";
import morgan from "morgan";
import path from "path";
import http from "http";

const host = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));

app.use(express.static(path.resolve() + "/public"));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
