const http = require('http');
http.createServer((req, res) => {
 res.writeHead(200);
 res.end('Build Auto trigger\n');
}).listen(3000, () => console.log('Running on port 3000'));
