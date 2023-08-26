const http = require('http');
const path = require('path');
const fs = require('fs');

const host = '127.0.0.1';
const port = 8000;

const server = http.createServer();

server.on('request', (req, res) => {
    const { url } = req;

    const src = path.join(__dirname, url === '/' ? './index.html' : url);

    fs.readFile(src, 'utf8', (err, data) => {
        if(err)
            return res.end('404 Not found.');
        res.end(data);
    });
});

server.listen(port, host, () => {});
