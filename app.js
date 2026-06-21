const http = require('http');
http.createServer((req, res) => {
 res.writeHead(200);
 res.end('uff tery dil mai thore khali ke jaga thy\n');
}).listen(3000, () => console.log('Running on port 3000'));
