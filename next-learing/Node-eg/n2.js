const http = require('http');

const hostname = '127.0.0.1';
const port = 8888;

const serve = http.createServer();

serve.on('request', (req, res) => {
    const { url } = req;
    const [ baseurl, ] = url.split('?');

    let content = '<h1>404 not found</h1>';

    if(baseurl === '/' || baseurl === '/index') {
        content = '<h1>index</h1>'
    }

    res.statusCode = 200;
    res.setHeader('content-type', 'text/html;charset=utf-8;');
    res.end(content);
});

serve.listen(port, hostname, () => {
    console.log('serve is running at http://127.0.0.1:8888');
});
