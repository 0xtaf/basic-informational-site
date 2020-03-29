const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  let filename= "." + q.pathname;
  console.log(q.pathname)
  if (q.pathname === '/') {
      filename = './index.html';
  }
  fs.readFile(filename, (err, data) => {
    if (err) {
      fs.readFile('./404.html', (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write("unexpected error");
        } else {
          res.write(data);
          return res.end();
        }
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);