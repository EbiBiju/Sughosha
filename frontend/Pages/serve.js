const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT       = 8081;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'text/javascript',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.json': 'application/json',
    '.woff': 'font/woff',
    '.woff2':'font/woff2',
};

http.createServer((req, res) => {
    // ✅ Strip query string (?auth=success&...) before mapping to a file
    const urlPath = req.url.split('?')[0];

    let filePath = path.join(PUBLIC_DIR, urlPath === '/' ? 'index.html' : urlPath);

    // If path has no extension, assume it's an HTML page
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    const extname     = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'text/html';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found — return a proper 404
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`404 Not Found: ${urlPath}`);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`500 Server Error: ${error.code}`);
            }
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });

}).listen(PORT, () => {
    console.log(`🌐 Static server running at http://localhost:${PORT}/`);
});
