import http from 'http';

const PORT = 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>The server is working!</h1>');
    });

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});