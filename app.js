const http = require('http');
http.createServer((req, res) => {
 res.writeHead(200);
 res.end('Auto Trigger Setup on ngrok url1233\n');
}).listen(3000, () => console.log('Running on port 3000'));
