const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    console.log(q);
    const filename = "." + q.pathname + ".html";
    if (filename === "./.html") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        }
      });
    }
    fs.readFile(filename, (err, data) => {
      if (err) {
        fs.readFile("./404.html", (err404, data404) => {
          if (err404) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
          } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(data404);
          }
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
